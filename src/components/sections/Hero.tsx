import { Container } from '@/components/ui/Container';
import { Elevation } from '@/components/ui/Elevation';
import { FoxMark } from '@/components/ui/FoxMark';
import { SubmitProjectLink } from '@/components/layout/SubmitProjectLink';
import { InviteToBidLink } from '@/components/layout/InviteToBidLink';
import Link from 'next/link';

const categories = [
  'Cabinets',
  'Vanities',
  'Countertops',
  'Doors',
  'Windows',
  'Flooring',
  'Wall Panels',
  'Trim & Molding',
];

export function Hero() {
  return (
    <section className="on-dark relative overflow-hidden bg-graphite-900 text-warm-50">
      <div className="sheet-grid absolute inset-0" aria-hidden="true" />
      <FoxMark className="pointer-events-none absolute -right-16 top-8 h-72 w-72 text-white/[0.04] lg:h-96 lg:w-96" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-vulpine/50 to-transparent" aria-hidden="true" />

      <Container className="relative py-20 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow-dark">An Interior Finishes Supply Company</p>

            <h1 className="mt-6 max-w-2xl font-display text-[2.5rem] font-bold leading-[1.02] tracking-tightest text-warm-50 sm:text-5xl lg:text-[3.75rem]">
              Interior finishes supplied for the way projects actually get built.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-warm-300 sm:text-lg">
              Vulpine supplies interior finish products for builders, developers, general contractors, and project
              teams nationwide, with project-focused sourcing, coordination, logistics, and service.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <SubmitProjectLink location="hero" variant="accent" className="sm:px-7 sm:py-4" />
              <Link
                href="/capabilities"
                className="inline-flex items-center justify-center rounded-sm border border-white/25 px-5 py-3 font-mono text-[0.75rem] uppercase tracking-label text-warm-50 transition-colors hover:border-vulpine hover:text-vulpine sm:px-7 sm:py-4"
              >
                View Capabilities
              </Link>
              <InviteToBidLink location="hero" dark className="sm:px-7 sm:py-4" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative border border-white/12 bg-graphite-800/60">
              <div className="flex items-center justify-between border-b border-white/12 px-4 py-2.5">
                <span className="eyebrow-dark">Interior Elevation</span>
                <span className="font-mono text-[0.625rem] uppercase tracking-label text-warm-400">A-501</span>
              </div>
              <Elevation variant="cabinet-run" dark className="aspect-[4/3] p-4" label="Typical unit kitchen" />
            </div>
          </div>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4">
          <span className="font-mono text-[0.625rem] uppercase tracking-label text-vulpine">Supplied</span>
          {categories.map((category) => (
            <span key={category} className="font-mono text-[0.625rem] uppercase tracking-label text-warm-400">
              {category}
            </span>
          ))}
        </Container>
      </div>
    </section>
  );
}
