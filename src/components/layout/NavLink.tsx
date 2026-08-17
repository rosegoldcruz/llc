'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'font-mono text-[0.6875rem] uppercase tracking-label transition-colors',
        active ? 'text-ink' : 'text-graphite-500 hover:text-ink',
      )}
    >
      {children}
    </Link>
  );
}
