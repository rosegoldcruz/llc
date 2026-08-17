'use client';

import Link from 'next/link';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';

export function SubmitProjectLink({
  location,
  className,
  variant = 'solid',
  children = 'Submit a Project',
}: {
  location: string;
  className?: string;
  variant?: 'solid' | 'accent' | 'outline';
  children?: React.ReactNode;
}) {
  const styles = {
    solid: 'bg-ink text-warm-50 hover:bg-vulpine-700',
    accent: 'bg-vulpine text-ink hover:bg-warm-50',
    outline: 'border border-warm-50/30 text-warm-50 hover:border-vulpine hover:text-vulpine',
  }[variant];

  return (
    <Link
      href="/submit-project"
      onClick={() => track('submit_project_click', { location })}
      className={cn(
        'inline-flex items-center justify-center rounded-sm px-5 py-3 font-mono text-[0.75rem] uppercase tracking-label transition-colors',
        styles,
        className,
      )}
    >
      {children}
    </Link>
  );
}
