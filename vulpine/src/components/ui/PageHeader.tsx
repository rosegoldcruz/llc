import { Container } from './Container';
import { Breadcrumbs } from './Breadcrumbs';

export function PageHeader({
  eyebrow,
  title,
  intro,
  trail,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  trail: { label: string; href: string }[];
}) {
  return (
    <section className="border-b border-warm-300 bg-warm-50 py-12 lg:py-16">
      <Container>
        <Breadcrumbs trail={trail} />
        <p className="eyebrow mt-8">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-[1.05] tracking-tightest text-ink sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-prose text-base leading-relaxed text-graphite-600 sm:text-lg">{intro}</p>
        ) : null}
      </Container>
    </section>
  );
}
