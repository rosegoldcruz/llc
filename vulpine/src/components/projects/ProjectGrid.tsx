import { ProjectCard } from './ProjectCard';
import { ProjectsEmptyState } from './ProjectsEmptyState';
import type { Project } from '@/data/projects';

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return <ProjectsEmptyState />;

  return (
    <div className="grid gap-px border border-warm-300 bg-warm-300 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
