'use client';

import { useMemo, useState } from 'react';
import { ProjectGrid } from './ProjectGrid';
import { cn } from '@/lib/cn';
import type { Project } from '@/data/projects';

const ALL = 'All';

export function ProjectFilters({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(ALL);

  const filters = useMemo(() => [ALL, ...Array.from(new Set(projects.map((p) => p.projectType))).sort()], [projects]);
  const visible = active === ALL ? projects : projects.filter((p) => p.projectType === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-warm-300 pb-6" role="group" aria-label="Filter projects by type">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            aria-pressed={active === filter}
            className={cn(
              'rounded-sm border px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-label transition-colors',
              active === filter
                ? 'border-ink bg-ink text-warm-50'
                : 'border-warm-300 text-graphite-500 hover:border-ink hover:text-ink',
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="mt-6 font-mono text-[0.6875rem] uppercase tracking-label text-graphite-500">
        {visible.length} {visible.length === 1 ? 'project' : 'projects'}
      </p>

      <div className="mt-6">
        <ProjectGrid projects={visible} />
      </div>
    </div>
  );
}
