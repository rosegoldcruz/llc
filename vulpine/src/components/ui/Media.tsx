import Image from 'next/image';
import { Elevation, type ElevationVariant } from './Elevation';
import { cn } from '@/lib/cn';

/**
 * Renders real photography when a path is supplied, and a drawn elevation when
 * it is not. Nothing here fakes an image: if `src` is null the drawing is the
 * intended, permanent-looking treatment.
 */
export function Media({
  src,
  alt,
  fallback = 'cabinet-run',
  label,
  className,
  imageClassName,
  priority = false,
  sizes = '(min-width: 1024px) 33vw, 100vw',
  dark = false,
}: {
  src: string | null;
  alt: string;
  fallback?: ElevationVariant;
  label?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  dark?: boolean;
}) {
  if (src) {
    return (
      <div className={cn('relative overflow-hidden bg-warm-200', className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn('object-cover', imageClassName)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        dark ? 'bg-graphite-800 sheet-grid' : 'bg-warm-100 sheet-grid-light',
        className,
      )}
    >
      <Elevation variant={fallback} label={label} dark={dark} className="absolute inset-0 p-6" />
    </div>
  );
}
