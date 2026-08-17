import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Elevation } from '@/components/ui/Elevation';
import { pageMeta } from '@/lib/seo';
import { site } from '@/data/site';
import { team } from '@/data/team';

export const metadata = pageMeta({
  title: 'About',
  description:
    'Vulpine is an interior finishes supply company working between project demand and product supply for builders, developers, general contractors, and project teams.',
  path: '/about',
});

const operating = [
  { title: 'Relationships', body: 'Supply relationships are maintained before a project needs them, not assembled after an award.' },
  { title: 'Communication', body: 'One point of contact through review, pricing, award, and delivery.' },
  { title: 'Procurement', body: 'Product sourced against the specification and the schedule the project is actually working to.' },
  { title: 'Coordination', body: 'Categories coordinated together so lead times and deliveries line up instead of colliding.' },
  { title: 'Logistics', body: 'Freight and delivery planned around site conditions, phasing, and what a site can receive.' },
  { title: 'Execution', body: 'Follow-through after award, which is where most supply relationships are actually judged.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="An interior finishes supply company."
        intro={site.description}
        trail={[{ label: 'About', href: '/about' }]}
      />

      <section className="border-b border-warm-300 bg-warm-50 py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeader reference="01 / What We Do" title="Between project demand and product supply." />
              <div className="mt-8 max-w-prose space-y-5 text-base leading-relaxed text-graphite-600">
                <p>
                  Every project needs the same categories of interior finish material, and almost every project sources
                  them the same way: separately. Cabinets from one vendor, countertops from another, doors and trim from
                  somewhere else, each with its own quote, its own lead time, and its own delivery date.
                </p>
                <p>
                  Vulpine sits between that demand and the supply that serves it. We take the plans, specifications, and
                  schedules a project is already working from, source the categories in scope, and return pricing the
                  project team can use — then coordinate procurement and delivery against the real schedule.
                </p>
                <p>
                  We are a supplier. We do not perform the construction work, manage the project, or carry the
                  installation scope. What we carry is the material side, and the coordination that makes it dependable.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-warm-300 bg-warm-100">
                <div className="flex items-center justify-between border-b border-warm-300 px-4 py-2.5">
                  <span className="eyebrow">Mission</span>
                  <span className="font-mono text-[0.625rem] uppercase tracking-label text-warm-400">V-001</span>
                </div>
                <p className="p-6 font-display text-xl leading-snug tracking-tightest text-ink sm:text-2xl">
                  {site.mission}
                </p>
                <Elevation variant="panel-grid" className="aspect-[4/3] border-t border-warm-300 bg-warm-50 p-6" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-warm-300 bg-warm-100 py-20 lg:py-28">
        <Container>
          <SectionHeader
            reference="02 / How We Operate"
            title="Six things the work actually runs on."
            intro="None of this is complicated. It is the part that gets skipped when supply is treated as a transaction instead of a relationship."
          />
          <ul className="mt-14 grid gap-px border border-warm-300 bg-warm-300 sm:grid-cols-2 lg:grid-cols-3">
            {operating.map((item, index) => (
              <li key={item.title} className="bg-warm-50 p-7">
                <span className="font-mono text-[0.625rem] uppercase tracking-label text-vulpine-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-lg tracking-tightest text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {team.length > 0 ? (
        <section className="border-b border-warm-300 bg-warm-50 py-20 lg:py-28">
          <Container>
            <SectionHeader reference="03 / Team" title="The people on the project." />
            <ul className="mt-14 grid gap-px border border-warm-300 bg-warm-300 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <li key={member.name} className="bg-warm-50 p-7">
                  <div className="flex h-16 w-16 items-center justify-center border border-warm-300 bg-warm-100 font-display text-lg tracking-tightest text-ink">
                    {member.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <h3 className="mt-5 font-display text-lg tracking-tightest text-ink">{member.name}</h3>
                  <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-label text-vulpine-700">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-graphite-600">{member.bio}</p>
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      className="mt-4 inline-block font-mono text-[0.625rem] uppercase tracking-label text-graphite-500 underline underline-offset-4 hover:text-vulpine-700"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      LinkedIn
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <FinalCTA />
    </>
  );
}
