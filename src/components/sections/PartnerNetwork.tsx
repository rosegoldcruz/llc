import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { networkAreas } from '@/data/partners';

export function PartnerNetwork() {
  return (
    <section className="border-b border-warm-300 bg-warm-100 py-20 lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeader
              reference="06 / Partner Network"
              title="Strong supply starts with strong relationships."
              intro="Vulpine works across manufacturing, distribution, freight, logistics, and project support relationships. That network is what makes it possible to source against a specification instead of around one."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/partners"
                className="inline-flex items-center justify-center rounded-sm bg-ink px-5 py-3 font-mono text-[0.75rem] uppercase tracking-label text-warm-50 transition-colors hover:bg-vulpine-700"
              >
                Become a Partner
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-sm border border-graphite-600/30 px-5 py-3 font-mono text-[0.75rem] uppercase tracking-label text-ink transition-colors hover:border-ink"
              >
                Work With Vulpine
              </Link>
            </div>
          </div>

          <ul className="grid gap-px self-start border border-warm-300 bg-warm-300 sm:grid-cols-2 lg:col-span-7">
            {networkAreas.map((area) => (
              <li key={area.title} className="bg-warm-50 p-7">
                <h3 className="font-display text-lg tracking-tightest text-ink">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite-600">{area.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
