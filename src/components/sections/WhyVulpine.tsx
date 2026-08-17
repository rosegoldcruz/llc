import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GridFill } from '@/components/ui/GridFill';

const pillars = [
  {
    title: 'Supply Relationships',
    body: 'Access to manufacturing, distribution, product, and category-specific relationships, so product selection is driven by what the project needs.',
  },
  {
    title: 'Project Coordination',
    body: 'Clear communication from project review through pricing and delivery, with one point of contact instead of a different one per category.',
  },
  {
    title: 'Competitive Procurement',
    body: 'Products and supply structures sourced against the actual project requirements, with alternates documented where they are worth considering.',
  },
  {
    title: 'Logistics',
    body: 'Freight and delivery coordinated around the real project schedule, including staged releases when a site cannot take everything at once.',
  },
  {
    title: 'Responsiveness',
    body: 'Project teams need answers inside the bid window, not after it. Questions get answered, revisions get returned, and the line stays open through award.',
  },
];

export function WhyVulpine() {
  return (
    <section className="on-dark border-b border-white/10 bg-graphite-900 py-20 text-warm-50 lg:py-28">
      <Container>
        <SectionHeader
          dark
          reference="03 / Why Vulpine"
          title="Supply is only useful when the project can depend on it."
          intro="Material that shows up late, short, or wrong is a schedule problem, not a purchasing problem. These are the five things that decide whether a supply relationship actually holds."
        />

        <ul className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <li key={pillar.title} className="bg-graphite-900 p-7 lg:p-9">
              <span className="font-mono text-[0.625rem] uppercase tracking-label text-vulpine">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-xl tracking-tightest text-warm-50">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-warm-300">{pillar.body}</p>
            </li>
          ))}

          <GridFill cells={pillars.length} dark />
        </ul>
      </Container>
    </section>
  );
}
