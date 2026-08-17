import { Suspense } from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProjectSubmissionForm } from '@/components/forms/ProjectSubmissionForm';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Submit a Project',
  description:
    'Send project information, plans, specifications, or scope to Vulpine for interior finishes supply review and pricing.',
  path: '/submit-project',
});

const helps = [
  'Plans and specifications',
  'Finish, door, or window schedules',
  'Unit matrix or quantities',
  'Bid invitation and due date',
];

export default function SubmitProjectPage() {
  return (
    <section className="bg-warm-50 py-12 lg:py-16">
      <Container>
        <Breadcrumbs trail={[{ label: 'Submit a Project', href: '/submit-project' }]} />

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow">Project Intake</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tightest text-ink sm:text-5xl">
              Submit a Project
            </h1>
            <p className="mt-6 leading-relaxed text-graphite-600">
              Send the project information, plans, specifications, or scope and our team will review the opportunity.
            </p>

            <div className="mt-10 border border-warm-300 bg-warm-100 p-6 lg:sticky lg:top-24">
              <h2 className="eyebrow border-b border-warm-300 pb-3">Helpful to include</h2>
              <ul className="mt-5 space-y-3">
                {helps.map((help) => (
                  <li key={help} className="flex gap-3 text-sm text-graphite-600">
                    <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-vulpine" />
                    {help}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-warm-300 pt-5 text-sm leading-relaxed text-graphite-600">
                Partial information is fine. If something is missing that we need to price accurately, we will ask.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Suspense fallback={<p className="text-sm text-graphite-500">Loading form…</p>}>
              <ProjectSubmissionForm />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}
