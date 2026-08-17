import Link from 'next/link';
import { Media } from '@/components/ui/Media';
import type { Project } from '@/data/projects';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-warm-50">
      <Link href={`/projects/${project.slug}`} className="group flex h-full flex-col p-6 transition-colors hover:bg-warm-100">
        <Media
          src={project.heroImage}
          alt={project.heroImageAlt}
          className="aspect-[4/3] border border-warm-300"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
        />

        <div className="mt-6 flex items-center gap-3">
          <span className="font-mono text-[0.625rem] uppercase tracking-label text-vulpine-700">
            {project.projectType}
          </span>
          {project.status ? (
            <>
              <span aria-hidden="true" className="h-px w-4 bg-warm-300" />
              <span className="font-mono text-[0.625rem] uppercase tracking-label text-graphite-500">
                {project.status}
              </span>
            </>
          ) : null}
        </div>

        <h3 className="mt-3 font-display text-xl tracking-tightest text-ink">{project.name}</h3>

        <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-label text-graphite-500">
          {project.city}, {project.state}
          {project.unitCount ? ` · ${project.unitCount} units` : ''}
        </p>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-graphite-600">{project.scope}</p>

        <span className="mt-5 font-mono text-[0.6875rem] uppercase tracking-label text-graphite-500 transition-colors group-hover:text-vulpine-700">
          View project →
        </span>
      </Link>
    </article>
  );
}
