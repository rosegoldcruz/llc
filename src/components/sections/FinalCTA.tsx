import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SubmitProjectLink } from '@/components/layout/SubmitProjectLink';
import { InviteToBidLink } from '@/components/layout/InviteToBidLink';

export function FinalCTA({
  title = 'Have a project? Send us the plans.',
  body = 'Send the plans, specifications, or scope and we will come back on the supply side.',
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-graphite-900 py-20 text-warm-50 lg:py-28">
      <div className="sheet-grid absolute inset-0" aria-hidden="true" />
      <Container className="relative">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl leading-[1.05] tracking-tightest text-warm-50 sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-warm-300 sm:text-lg">{body}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <SubmitProjectLink location="final_cta" variant="accent" className="sm:px-7 sm:py-4" />
            <InviteToBidLink location="final_cta" dark className="sm:px-7 sm:py-4" />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-sm border border-white/25 px-5 py-3 font-mono text-[0.75rem] uppercase tracking-label text-warm-50 transition-colors hover:border-vulpine hover:text-vulpine sm:px-7 sm:py-4"
            >
              Contact Vulpine
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
