'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Logged server-side by the platform. Nothing from the exception is shown
    // to the visitor beyond the digest reference.
    console.error(error);
  }, [error]);

  return (
    <section className="bg-warm-50 py-24 lg:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow">Something went wrong</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tightest text-ink sm:text-5xl">
            This page did not load.
          </h1>
          <p className="mt-6 leading-relaxed text-graphite-600">
            Try again. If it keeps happening, send the project details through the contact page and we will follow up
            directly.
          </p>
          {error.digest ? (
            <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-label text-graphite-500">
              Reference {error.digest}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center rounded-sm bg-ink px-5 py-3 font-mono text-[0.75rem] uppercase tracking-label text-warm-50 transition-colors hover:bg-vulpine-700"
            >
              Try Again
            </button>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-sm border border-graphite-600/30 px-5 py-3 font-mono text-[0.75rem] uppercase tracking-label text-ink transition-colors hover:border-ink">
              Contact Vulpine
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
