import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { processSteps, processStages } from '@/data/process';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Our Process',
  description:
    'How a project moves through Vulpine: intake, scope review, supply coordination, pricing, submission, award, procurement, and delivery coordination.',
  path: '/process',
});

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Process"
        title="From plans to project delivery."
        intro="The same sequence runs on every project, whether it is one building or a portfolio."
        trail={[{ label: 'Our Process', href: '/process' }]}
      />

      <section className="border-b border-warm-300 bg-warm-50 py-20 lg:py-28">
        <Container>
          <ol className="border-t border-warm-300">
            {processSteps.map((step) => (
              <li key={step.number} className="border-b border-warm-300">
                <div className="grid gap-6 py-10 md:grid-cols-12 md:gap-8 lg:py-14">
                  <div className="md:col-span-2">
                    <span className="font-mono text-sm uppercase tracking-label text-vulpine-700">{step.number}</span>
                  </div>

                  <div className="md:col-span-5">
                    <h2 className="font-display text-2xl tracking-tightest text-ink sm:text-3xl">{step.title}</h2>
                    <p className="mt-4 max-w-prose leading-relaxed text-graphite-600">{step.detail}</p>
                  </div>

                  <div className="md:col-span-5 md:pl-8 md:border-l md:border-warm-300">
                    <h3 className="eyebrow">What moves at this stage</h3>
                    <ul className="mt-4 space-y-2.5">
                      {step.exchange.map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-graphite-600">
                          <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-vulpine" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="on-dark border-b border-white/10 bg-graphite-900 py-20 text-warm-50 lg:py-28">
        <Container>
          <SectionHeader
            dark
            reference="Sequence"
            title="The full path a project takes."
            intro="Bid-stage work is the first half. The second half is what happens after award, and it is the half that decides whether the schedule holds."
          />

          <ol className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {processStages.map((stage, index) => (
              <li key={stage.stage} className="bg-graphite-900 p-6">
                <span className="font-mono text-[0.625rem] uppercase tracking-label text-vulpine">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-base leading-snug tracking-tightest text-warm-50">
                  {stage.stage}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-warm-300">{stage.note}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
