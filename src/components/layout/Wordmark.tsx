import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * Text wordmark matching the existing Vulpine mark ("Vulpine." with the period).
 * Swap for an SVG logo file when the vector asset is available.
 */
export function Wordmark({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'font-display text-xl font-bold tracking-tightest transition-colors',
        dark ? 'text-warm-50 hover:text-vulpine' : 'text-ink hover:text-vulpine-700',
        className,
      )}
      aria-label="Vulpine — home"
    >
      Vulpine<span className="text-vulpine">.</span>
    </Link>
  );
}
