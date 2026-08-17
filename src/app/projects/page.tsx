import { PageHeader } from '@/components/ui/PageHeader';
import { Container } from '@/components/ui/Container';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { projects, SHOW_PROJECT_FILTERS } from '@/data/projects';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Projects',
  description:
    'Multifamily, senior living, commercial, hospitality, and residential projects supported by Vulpine interior finishes supply.',
  path: '/projects',
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Projects and opportunities we support."
        intro="Communities, renovation programs, commercial interiors, and builder work across the country."
        trail={[{ label: 'Projects', href: '/projects' }]}
      />

      <section className="border-b border-warm-300 bg-warm-50 py-16 lg:py-24">
        <Container>
          {SHOW_PROJECT_FILTERS ? <ProjectFilters projects={projects} /> : <ProjectGrid projects={projects} />}
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
