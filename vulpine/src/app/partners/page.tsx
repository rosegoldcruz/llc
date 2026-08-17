import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PartnerForm } from '@/components/forms/PartnerForm';
import { partnerPaths, networkAreas } from '@/data/partners';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Partners',
  description:
    'Supply and project partnership paths for manufacturers, distributors, logistics providers, builders, developers, general contractors, and industry professionals.',
  path: '/partners',
});

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="Strong supply starts with strong relationships."
        intro="Two ways to work with Vulpine: supply products and services into the network, or bring projects through it."
        trail={[{ label: 'Partners', href: '/partners' }]}
      />

      <section className="border-b border-warm-300 bg-warm-50 py-20 lg:py-28">
        <Container>
          <ul className="grid gap-px border border-warm-300 bg-warm-300 lg:grid-cols-2">
            {partnerPaths.map((path, index) => (
              <li key={path.slug} className="bg-warm-50 p-8 lg:p-10">
                <span className="font-mono text-[0.625rem] uppercase tracking-label text-vulpine-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-4 font-display text-2xl tracking-tightest text-ink sm:text-3xl">{path.title}</h2>
                <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-label text-graphite-500">
                  {path.audience}
                </p>
                <p className="mt-6 leading-relaxed text-graphite-600">{path.summary}</p>
                <ul className="mt-7 space-y-3 border-t border-warm-200 pt-6">
                  {path.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-graphite-600">
                      <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-vulpine" />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-warm-300 bg-warm-100 py-20 lg:py-28">
        <Container>
          <SectionHeader
            reference="Network"
            title="Where the relationships sit."
            intro="Vulpine works across manufacturing, distribution, freight, logistics, and project support relationships."
          />
          <ul className="mt-14 grid gap-px border border-warm-300 bg-warm-300 sm:grid-cols-2 lg:grid-cols-4">
            {networkAreas.map((area) => (
              <li key={area.title} className="bg-warm-50 p-7">
                <h3 className="font-display text-lg tracking-tightest text-ink">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite-600">{area.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="contact-partnerships" className="border-b border-warm-300 bg-warm-50 py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader reference="Inquiry" title="Contact Partnerships" />
              <p className="mt-6 text-sm leading-relaxed text-graphite-600">
                Tell us what you supply or what you build, and where. We will follow up on fit and next steps.
              </p>
            </div>
            <div className="lg:col-span-8">
              <PartnerForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
