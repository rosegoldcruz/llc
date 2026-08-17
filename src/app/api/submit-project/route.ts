import { NextResponse } from 'next/server';
import { projectSubmissionSchema, fieldErrors } from '@/lib/schemas';
import { rateLimit, clientKey } from '@/lib/rate-limit';
import { notify, isNotifyConfigured } from '@/lib/notify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request, 'submit-project'), 10);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many submissions from this connection. Try again shortly or email the project directly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'The submission could not be read. Try again.' }, { status: 400 });
  }

  const parsed = projectSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Some fields need attention.', fields: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  // Honeypot: quietly accept and drop, so bots do not learn the trap exists.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (!isNotifyConfigured()) {
    return NextResponse.json(
      { error: 'Project submissions are not accepting messages right now. Please contact Vulpine directly.' },
      { status: 503 },
    );
  }

  const d = parsed.data;
  const result = await notify(
    `Project submission — ${d.projectName} (${d.company})`,
    {
      contact: `${d.firstName} ${d.lastName}`,
      company: d.company,
      email: d.email,
      phone: d.phone,
      smsConsent: d.smsConsent ? 'Yes' : 'No',
      projectName: d.projectName,
      projectAddress: [d.projectAddress, d.city, d.state, d.zip].filter(Boolean).join(', '),
      projectType: d.projectType,
      source: d.intent === 'bid' ? 'Invite to Bid' : 'Submit a Project',
      unitCount: d.unitCount,
      scope: d.scope,
      bidDueDate: d.bidDueDate,
      notes: d.notes,
      files: d.files?.map((f) => `${f.name} — ${f.url}`) ?? [],
    },
    d.email,
  );

  if (!result.ok) {
    return NextResponse.json(
      { error: 'The submission could not be delivered. Try again, or contact Vulpine directly.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
