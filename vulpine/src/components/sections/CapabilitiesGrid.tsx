import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Media } from '@/components/ui/Media';
import { GridFill } from '@/components/ui/GridFill';
import { capabilities } from '@/data/capabilities';

/**
 * Cabinets lead the grid at double width. That is a deliberate weighting: it is
 * the strongest supply program, and the layout should say so without implying
 * the other categories are secondary.
 */
export function CapabilitiesGrid({ heading = true }: { heading?: boolean }) {
  const [lead, ...rest] = capabilities;

  // The lead card occupies two cells, so total cells = rest.length + 2.
  const cells = rest.length + 2;

  return (
    <section className="border-b border-warm-300 bg-warm-50 py-20 lg:py-28" id="capabilities">
      <Container>
        {heading ? (
          <SectionHeader
            reference="01 / What We Supply"
            title="Interior finishes. One supply relationship."
            intro="Vulpine supplies the finish categories that make up a unit or a building interior, priced and coordinated together rather than chased across separate vendors."
          />
        ) : null}

        <ul className="mt-14 grid gap-px border border-warm-300 bg-warm-300 sm:grid-cols-2 lg:grid-cols-3">
          <li className="bg-warm-50 sm:col-span-2">
            <Link
              href={`/capabilities/${lead.slug}`}
              className="group flex h-full flex-col p-6 transition-colors hover:bg-warm-100 lg:flex-row lg:items-center lg:gap-8 lg:p-8"
            >
              <Media
                src={lead.image}
                alt={lead.imageAlt}
                fallback={lead.drawing}
                className="aspect-[3/2] border border-warm-300 lg:w-1/2"
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
              <div className="mt-6 lg:mt-0 lg:flex-1">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl tracking-tightest text-ink lg:text-3xl">{lead.name}</h3>
                  <span className="font-mono text-[0.625rem] uppercase tracking-label text-vulpine-700">
                    Core program
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-graphite-600 lg:text-base">{lead.summary}</p>
                <span className="mt-6 inline-block font-mono text-[0.6875rem] uppercase tracking-label text-graphite-500 transition-colors group-hover:text-vulpine-700">
                  View capability →
                </span>
              </div>
            </Link>
          </li>

          {rest.map((capability, index) => (
            <li key={capability.slug} className="bg-warm-50">
              <Link
                href={`/capabilities/${capability.slug}`}
                className="group flex h-full flex-col p-6 transition-colors hover:bg-warm-100"
              >
                <Media
                  src={capability.image}
                  alt={capability.imageAlt}
                  fallback={capability.drawing}
                  className="aspect-[3/2] border border-warm-300"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                />
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl tracking-tightest text-ink">{capability.name}</h3>
                  <span className="font-mono text-[0.625rem] uppercase tracking-label text-warm-400">
                    {String(index + 2).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-graphite-600">{capability.summary}</p>
                <span className="mt-5 font-mono text-[0.6875rem] uppercase tracking-label text-graphite-500 transition-colors group-hover:text-vulpine-700">
                  View capability →
                </span>
              </Link>
            </li>
          ))}

          <GridFill cells={cells} />
        </ul>
      </Container>
    </section>
  );
}
