import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Elevation } from '@/components/ui/Elevation';

export default function NotFound() {
  return (
    <section className="bg-warm-50 py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-5">
          <div className="md:col-span-3">
            <p className="eyebrow">Error 404</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tightest text-ink sm:text-5xl">
              This page is not on the sheet.
            </h1>
            <p className="mt-6 max-w-prose leading-relaxed text-graphite-600">
              The page you asked for does not exist or has moved. Start from capabilities, or send the project
              directly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="inline-flex items-center justify-center rounded-sm bg-ink px-5 py-3 font-mono text-[0.75rem] uppercase tracking-label text-warm-50 transition-colors hover:bg-vulpine-700">
                Back to Home
              </Link>
              <Link href="/capabilities" className="inline-flex items-center justify-center rounded-sm border border-graphite-600/30 px-5 py-3 font-mono text-[0.75rem] uppercase tracking-label text-ink transition-colors hover:border-ink">
                View Capabilities
              </Link>
              <Link href="/submit-project" className="inline-flex items-center justify-center rounded-sm border border-graphite-600/30 px-5 py-3 font-mono text-[0.75rem] uppercase tracking-label text-ink transition-colors hover:border-ink">
                Submit a Project
              </Link>
            </div>
          </div>
          <Elevation variant="door-schedule" className="aspect-[4/3] border border-warm-300 bg-warm-100 p-6 md:col-span-2" />
        </div>
      </Container>
    </section>
  );
}
