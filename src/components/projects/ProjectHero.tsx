import { Container } from '@/components/ui/Container';
import { Media } from '@/components/ui/Media';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { Project } from '@/data/projects';

export function ProjectHero({ project }: { project: Project }) {
  const specs = [
    { label: 'Location', value: `${project.city}, ${project.state}` },
    { label: 'Project type', value: project.projectType },
    ...(project.unitCount ? [{ label: 'Units', value: String(project.unitCount) }] : []),
    ...(project.status ? [{ label: 'Status', value: project.status }] : []),
  ];

  return (
    <section className="border-b border-warm-300 bg-warm-50 py-12 lg:py-16">
      <Container>
        <Breadcrumbs
          trail={[
            { label: 'Projects', href: '/projects' },
            { label: project.name, href: `/projects/${project.slug}` },
          ]}
        />

        <h1 className="mt-8 max-w-3xl font-display text-4xl leading-[1.05] tracking-tightest text-ink sm:text-5xl">
          {project.name}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Media
              src={project.heroImage}
              alt={project.heroImageAlt}
              className="aspect-[16/9] border border-warm-300"
              sizes="(min-width: 1024px) 66vw, 100vw"
              priority
            />
          </div>

          <dl className="divide-y divide-warm-300 border-y border-warm-300 lg:col-span-4">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-baseline justify-between gap-4 py-4">
                <dt className="eyebrow">{spec.label}</dt>
                <dd className="text-right text-sm text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
