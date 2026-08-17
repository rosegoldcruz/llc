import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { industries } from '@/data/industries';

export function IndustriesGrid({ heading = true, detailed = false }: { heading?: boolean; detailed?: boolean }) {
  return (
    <section className="border-b border-warm-300 bg-warm-100 py-20 lg:py-28" id="industries">
      <Container>
        {heading ? (
          <SectionHeader
            reference="02 / Who We Serve"
            title="Built around the teams responsible for getting projects delivered."
            intro="Every market prices, schedules, and takes delivery differently. The supply package should reflect that, not fight it."
          />
        ) : null}

        <ul className="mt-14 grid gap-px border border-warm-300 bg-warm-300 sm:grid-cols-2">
          {industries.map((industry, index) => (
            <li key={industry.slug} className="bg-warm-50 p-7 lg:p-9">
              <div className="flex items-baseline justify-between gap-4 border-b border-warm-200 pb-4">
                <h3 className="font-display text-xl tracking-tightest text-ink">{industry.name}</h3>
                <span className="font-mono text-[0.625rem] uppercase tracking-label text-warm-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-graphite-600">
                {detailed ? industry.role : industry.summary}
              </p>

              {detailed ? (
                <ul className="mt-6 space-y-2.5">
                  {industry.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-graphite-600">
                      <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-vulpine" />
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
