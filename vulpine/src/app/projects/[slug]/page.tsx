import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Media } from '@/components/ui/Media';
import { ProjectHero } from '@/components/projects/ProjectHero';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { projects, getProject } from '@/data/projects';
import { pageMeta } from '@/lib/seo';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return pageMeta({ title: 'Project', description: '', path: '/projects' });

  return pageMeta({
    title: project.name,
    description: `${project.scope} — ${project.city}, ${project.state}.`,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <ProjectHero project={project} />

      <section className="border-b border-warm-300 bg-warm-50 py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="eyebrow border-b border-warm-300 pb-3">Scope</h2>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-graphite-600">{project.description}</p>

              {project.notes?.length ? (
                <ul className="mt-8 space-y-3">
                  {project.notes.map((note) => (
                    <li key={note} className="flex gap-3 text-sm leading-relaxed text-graphite-600">
                      <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-vulpine" />
                      {note}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="lg:col-span-5">
              <h2 className="eyebrow border-b border-warm-300 pb-3">Product categories</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.categories.map((category) => (
                  <li
                    key={category}
                    className="border border-warm-300 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-label text-graphite-600"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {project.gallery?.length ? (
            <div className="mt-16 grid gap-px border border-warm-300 bg-warm-300 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((image) => (
                <div key={image.src} className="bg-warm-50 p-4">
                  <Media src={image.src} alt={image.alt} className="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, 100vw" />
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-12 border-t border-warm-300 pt-8">
            <Link href="/projects" className="font-mono text-[0.6875rem] uppercase tracking-label text-graphite-500 hover:text-vulpine-700">
              ← All projects
            </Link>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
