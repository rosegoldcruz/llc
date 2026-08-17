import 'server-only';

/**
 * Where form submissions go.
 *
 * Two supported sinks, both configured with environment variables:
 *   RESEND_API_KEY + SUBMISSION_TO_EMAIL + SUBMISSION_FROM_EMAIL  -> email
 *   SUBMISSION_WEBHOOK_URL                                        -> webhook (CRM, n8n, Zapier)
 *
 * If neither is configured, submissions are REJECTED with a clear error.
 * The form never reports success for a submission that went nowhere.
 */

export type NotifyResult = { ok: true } | { ok: false; reason: 'unconfigured' | 'failed' };

export function isNotifyConfigured(): boolean {
  return Boolean(
    process.env.SUBMISSION_WEBHOOK_URL ||
      (process.env.RESEND_API_KEY && process.env.SUBMISSION_TO_EMAIL && process.env.SUBMISSION_FROM_EMAIL),
  );
}

function toPlainText(subject: string, payload: Record<string, unknown>): string {
  const lines = [subject, '='.repeat(subject.length), ''];
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === null || value === '') continue;
    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      lines.push(`${label}:`);
      for (const item of value) {
        lines.push(
          `  - ${typeof item === 'object' && item !== null ? JSON.stringify(item) : String(item)}`,
        );
      }
    } else {
      lines.push(`${label}: ${String(value)}`);
    }
  }
  return lines.join('\n');
}

export async function notify(
  subject: string,
  payload: Record<string, unknown>,
  replyTo?: string,
): Promise<NotifyResult> {
  if (!isNotifyConfigured()) {
    console.error('[notify] No submission sink configured. See .env.example.');
    return { ok: false, reason: 'unconfigured' };
  }

  const tasks: Promise<Response>[] = [];

  if (process.env.SUBMISSION_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.SUBMISSION_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.SUBMISSION_WEBHOOK_SECRET
            ? { 'X-Webhook-Secret': process.env.SUBMISSION_WEBHOOK_SECRET }
            : {}),
        },
        body: JSON.stringify({ subject, receivedAt: new Date().toISOString(), ...payload }),
      }),
    );
  }

  if (process.env.RESEND_API_KEY && process.env.SUBMISSION_TO_EMAIL && process.env.SUBMISSION_FROM_EMAIL) {
    tasks.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.SUBMISSION_FROM_EMAIL,
          to: process.env.SUBMISSION_TO_EMAIL.split(',').map((s) => s.trim()),
          subject,
          text: toPlainText(subject, payload),
          ...(replyTo ? { reply_to: replyTo } : {}),
        }),
      }),
    );
  }

  try {
    const results = await Promise.allSettled(tasks);
    const anyDelivered = results.some((r) => r.status === 'fulfilled' && r.value.ok);

    if (!anyDelivered) {
      for (const r of results) {
        if (r.status === 'rejected') console.error('[notify] transport error', r.reason);
        else if (!r.value.ok) console.error('[notify] transport rejected', r.value.status, await r.value.text().catch(() => ''));
      }
      return { ok: false, reason: 'failed' };
    }

    return { ok: true };
  } catch (error) {
    console.error('[notify] unexpected error', error);
    return { ok: false, reason: 'failed' };
  }
}
