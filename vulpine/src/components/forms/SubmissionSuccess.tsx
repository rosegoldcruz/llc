import Link from 'next/link';
import { Elevation } from '@/components/ui/Elevation';

export function SubmissionSuccess({ projectName }: { projectName?: string }) {
  return (
    <div className="border border-warm-300 bg-warm-100">
      <div className="grid items-center gap-8 p-8 md:grid-cols-5 lg:p-12">
        <div className="md:col-span-3">
          <p className="eyebrow">Received</p>
          <h2 className="mt-4 font-display text-3xl leading-tight tracking-tightest text-ink">
            Project received.
          </h2>
          <p className="mt-5 max-w-prose leading-relaxed text-graphite-600">
            Our team will review the information{projectName ? ` for ${projectName}` : ''} and follow up regarding
            scope, pricing, or any additional documentation needed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="inline-flex items-center justify-center rounded-sm bg-ink px-5 py-3 font-mono text-[0.75rem] uppercase tracking-label text-warm-50 transition-colors hover:bg-vulpine-700">
              Back to Home
            </Link>
            <Link href="/capabilities" className="inline-flex items-center justify-center rounded-sm border border-graphite-600/30 px-5 py-3 font-mono text-[0.75rem] uppercase tracking-label text-ink transition-colors hover:border-ink">
              View Capabilities
            </Link>
          </div>
        </div>
        <Elevation variant="door-schedule" className="aspect-[4/3] border border-warm-300 bg-warm-50 p-6 md:col-span-2" />
      </div>
    </div>
  );
}
