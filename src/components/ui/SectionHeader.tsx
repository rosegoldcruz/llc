import { cn } from '@/lib/cn';

/**
 * Drawing-sheet section header: a mono sheet reference, a rule, then the title.
 * The reference is structural, not decorative - it labels the section the way
 * a drawing set labels a sheet.
 */
export function SectionHeader({
  reference,
  title,
  intro,
  dark = false,
  className,
  as: Heading = 'h2',
}: {
  reference: string;
  title: string;
  intro?: string;
  dark?: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      <div className={cn('flex items-center gap-4 border-b pb-3', dark ? 'border-white/15' : 'border-warm-300')}>
        <span className={dark ? 'eyebrow-dark' : 'eyebrow'}>{reference}</span>
        <span className={cn('h-px flex-1', dark ? 'bg-white/15' : 'bg-warm-300')} aria-hidden="true" />
      </div>
      <Heading
        className={cn(
          'mt-6 text-3xl leading-[1.08] sm:text-4xl lg:text-[2.75rem]',
          dark ? 'text-warm-50' : 'text-ink',
        )}
      >
        {title}
      </Heading>
      {intro ? (
        <p className={cn('mt-5 max-w-prose text-base leading-relaxed sm:text-lg', dark ? 'text-warm-300' : 'text-graphite-600')}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
