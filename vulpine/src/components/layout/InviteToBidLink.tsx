'use client';

import Link from 'next/link';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';

export function InviteToBidLink({
  location,
  className,
  dark = false,
}: {
  location: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <Link
      href="/submit-project?intent=bid"
      onClick={() => track('invite_to_bid_click', { location })}
      className={cn(
        'inline-flex items-center justify-center rounded-sm border px-5 py-3 font-mono text-[0.75rem] uppercase tracking-label transition-colors',
        dark
          ? 'border-white/25 text-warm-50 hover:border-vulpine hover:text-vulpine'
          : 'border-graphite-600/30 text-ink hover:border-ink hover:bg-warm-100',
        className,
      )}
    >
      Invite Vulpine to Bid
    </Link>
  );
}
