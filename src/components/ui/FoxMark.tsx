/**
 * Secondary identity element — a simplified geometric fox mark used as a seal
 * or watermark, never as the primary logo.
 *
 * REPLACE with the approved Vulpine fox mark when the vector asset is
 * available. This is a stand-in built from the same angular language, not an
 * approved brand asset.
 */
export function FoxMark({
  className,
  title = 'Vulpine mark',
  decorative = true,
}: {
  className?: string;
  title?: string;
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
    >
      <path d="M12 10 L22 26 L32 20 L42 26 L52 10 L50 34 L32 54 L14 34 Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 26 L32 34 L42 26" stroke="currentColor" strokeWidth="1.5" />
      <path d="M32 34 L32 54" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 10 L18 20" stroke="currentColor" strokeWidth="1.5" />
      <path d="M52 10 L46 20" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
