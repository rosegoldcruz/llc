import { NextResponse } from 'next/server';
import { contactSchema, fieldErrors } from '@/lib/schemas';
import { rateLimit, clientKey } from '@/lib/rate-limit';
import { notify, isNotifyConfigured } from '@/lib/notify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request, 'contact'), 10);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many messages from this connection. Try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'The message could not be read. Try again.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Some fields need attention.', fields: fieldErrors(parsed.error) }, { status: 400 });
  }

  if (parsed.data.website) return NextResponse.json({ ok: true });

  if (!isNotifyConfigured()) {
    return NextResponse.json(
      { error: 'The contact form is not accepting messages right now. Please try again later.' },
      { status: 503 },
    );
  }

  const d = parsed.data;
  const result = await notify(
    `Contact form — ${d.inquiryType} (${d.name})`,
    {
      name: d.name,
      company: d.company,
      email: d.email,
      phone: d.phone,
      inquiryType: d.inquiryType,
      smsConsent: d.smsConsent ? 'Yes' : 'No',
      message: d.message,
    },
    d.email,
  );

  if (!result.ok) {
    return NextResponse.json({ error: 'The message could not be delivered. Try again shortly.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
