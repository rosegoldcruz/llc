import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { processSteps } from '@/data/process';

export function ProcessTimeline({ heading = true }: { heading?: boolean }) {
  return (
    <section className="border-b border-warm-300 bg-warm-50 py-20 lg:py-28" id="process">
      <Container>
        {heading ? (
          <SectionHeader
            reference="04 / Our Process"
            title="From plans to project delivery."
            intro="Five steps, in the order they actually happen on a project."
          />
        ) : null}

        <ol className="mt-14 border-t border-warm-300">
          {processSteps.map((step) => (
            <li key={step.number} className="border-b border-warm-300">
              <div className="grid gap-4 py-8 md:grid-cols-12 md:gap-8 lg:py-10">
                <div className="md:col-span-2">
                  <span className="font-mono text-sm uppercase tracking-label text-vulpine-700">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-2xl tracking-tightest text-ink md:col-span-4">
                  {step.title}
                </h3>
                <p className="max-w-prose text-base leading-relaxed text-graphite-600 md:col-span-6">
                  {step.summary}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
