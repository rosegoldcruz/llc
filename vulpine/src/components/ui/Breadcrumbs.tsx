import Link from 'next/link';
import { breadcrumbSchema } from '@/lib/seo';

export function Breadcrumbs({ trail }: { trail: { label: string; href: string }[] }) {
  const full = [{ label: 'Home', href: '/' }, ...trail];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(full)) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-label text-graphite-500">
          {full.map((item, index) => {
            const last = index === full.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link href={item.href} className="hover:text-vulpine-700">
                      {item.label}
                    </Link>
                    <span aria-hidden="true" className="text-warm-400">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
