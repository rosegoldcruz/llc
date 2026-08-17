import { Elevation } from '@/components/ui/Elevation';
import { SubmitProjectLink } from '@/components/layout/SubmitProjectLink';

/**
 * Shown while no projects are published. This is an invitation to act, not an
 * apology — and it is honest, which matters more than a padded portfolio.
 */
export function ProjectsEmptyState() {
  return (
    <div className="border border-warm-300 bg-warm-100">
      <div className="grid items-center gap-8 p-8 md:grid-cols-2 lg:p-12">
        <div>
          <p className="eyebrow">Project profiles</p>
          <h3 className="mt-4 font-display text-2xl tracking-tightest text-ink sm:text-3xl">
            Project profiles are published as they are cleared for release.
          </h3>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-graphite-600">
            Project details stay private until the client is comfortable with them being public. If you want
            references or scope detail for a specific project type, ask directly and we will walk through what
            we can share.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <SubmitProjectLink location="projects_empty_state" />
          </div>
        </div>
        <Elevation variant="panel-grid" className="aspect-[4/3] border border-warm-300 bg-warm-50 p-6" />
      </div>
    </div>
  );
}
