'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { nav } from '@/data/site';
import { track } from '@/lib/analytics';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex items-center gap-2 border border-graphite-600/25 px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-label text-ink"
      >
        <span className="flex flex-col gap-[3px]" aria-hidden="true">
          <span className="block h-px w-4 bg-ink" />
          <span className="block h-px w-4 bg-ink" />
          <span className="block h-px w-4 bg-ink" />
        </span>
        {open ? 'Close' : 'Menu'}
      </button>

      {open ? (
        <div id="mobile-menu" className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-4rem)] bg-warm-50">
          <nav className="flex h-full flex-col overflow-y-auto px-5 pb-10 pt-4" aria-label="Main">
            <ul className="divide-y divide-warm-300 border-y border-warm-300">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 font-display text-2xl tracking-tightest text-ink"
                  >
                    {item.label}
                    <span aria-hidden="true" className="font-mono text-xs text-warm-400">
                      →
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-display text-2xl tracking-tightest text-ink"
                >
                  Contact
                  <span aria-hidden="true" className="font-mono text-xs text-warm-400">
                    →
                  </span>
                </Link>
              </li>
            </ul>

            <Link
              href="/submit-project"
              onClick={() => {
                setOpen(false);
                track('submit_project_click', { location: 'mobile_nav' });
              }}
              className="mt-8 flex items-center justify-center bg-ink px-5 py-4 font-mono text-xs uppercase tracking-label text-warm-50"
            >
              Submit a Project
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
