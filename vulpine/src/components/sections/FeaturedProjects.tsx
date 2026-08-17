import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { projects } from '@/data/projects';

export function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section className="border-b border-warm-300 bg-warm-50 py-20 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            reference="05 / Projects"
            title="Projects and opportunities we support."
            intro="Multifamily communities, renovation programs, commercial interiors, and builder work across the country."
          />
          {projects.length > 0 ? (
            <Link
              href="/projects"
              className="font-mono text-[0.6875rem] uppercase tracking-label text-graphite-500 transition-colors hover:text-vulpine-700"
            >
              All projects →
            </Link>
          ) : null}
        </div>

        <div className="mt-14">
          <ProjectGrid projects={featured} />
        </div>
      </Container>
    </section>
  );
}
