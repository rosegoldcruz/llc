'use client';

import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';

export function EmailLink({ email, className }: { email: string; className?: string }) {
  return (
    <a href={`mailto:${email}`} onClick={() => track('email_click')} className={cn('hover:text-vulpine', className)}>
      {email}
    </a>
  );
}

export function PhoneLink({
  phone,
  display,
  className,
}: {
  phone: string;
  display: string;
  className?: string;
}) {
  return (
    <a href={`tel:${phone}`} onClick={() => track('phone_click')} className={cn('hover:text-vulpine', className)}>
      {display}
    </a>
  );
}
