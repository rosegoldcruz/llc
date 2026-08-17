import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Media } from '@/components/ui/Media';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { SubmitProjectLink } from '@/components/layout/SubmitProjectLink';
import { capabilities, getCapability } from '@/data/capabilities';
import { pageMeta } from '@/lib/seo';

export function generateStaticParams() {
  return capabilities.map((capability) => ({ slug: capability.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) return pageMeta({ title: 'Capability', description: '', path: '/capabilities' });

  return pageMeta({
    title: capability.name,
    description: capability.summary,
    path: `/capabilities/${capability.slug}`,
  });
}

export default async function CapabilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const capability = getCapability(slug);
  if (!capability) notFound();

  const index = capabilities.findIndex((c) => c.slug === capability.slug);
  const next = capabilities[(index + 1) % capabilities.length];

  const blocks = [
    { title: 'Applications', items: capability.applications },
    { title: 'Project types', items: capability.projectTypes },
    { title: 'Product considerations', items: capability.considerations },
  ];

  return (
    <>
      <section className="border-b border-warm-300 bg-warm-50 py-12 lg:py-16">
        <Container>
          <Breadcrumbs
            trail={[
              { label: 'Capabilities', href: '/capabilities' },
              { label: capability.name, href: `/capabilities/${capability.slug}` },
            ]}
          />

          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow">Capability {String(index + 1).padStart(2, '0')}</p>
              <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tightest text-ink sm:text-5xl">
                {capability.name}
              </h1>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-graphite-600">{capability.overview}</p>
              <div className="mt-8">
                <SubmitProjectLink location={`capability_${capability.slug}`} />
              </div>
            </div>

            <div className="lg:col-span-5">
              <Media
                src={capability.image}
                alt={capability.imageAlt}
                className="aspect-[4/3] border border-warm-300"
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-warm-300 bg-warm-100 py-16 lg:py-24">
        <Container>
          <div className="grid gap-px border border-warm-300 bg-warm-300 md:grid-cols-3">
            {blocks.map((block) => (
              <div key={block.title} className="bg-warm-50 p-7 lg:p-9">
                <h2 className="eyebrow border-b border-warm-200 pb-3">{block.title}</h2>
                <ul className="mt-5 space-y-3">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-graphite-600">
                      <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-vulpine" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-warm-300 pt-8">
            <Link href="/capabilities" className="font-mono text-[0.6875rem] uppercase tracking-label text-graphite-500 hover:text-vulpine-700">
              ← All capabilities
            </Link>
            <Link
              href={`/capabilities/${next.slug}`}
              className="font-mono text-[0.6875rem] uppercase tracking-label text-graphite-500 hover:text-vulpine-700"
            >
              Next: {next.name} →
            </Link>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
