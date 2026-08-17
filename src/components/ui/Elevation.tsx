import { cn } from '@/lib/cn';

/**
 * SIGNATURE ELEMENT
 *
 * Original line-drawn interior elevations, drawn as SVG rather than sourced as
 * photography. Two reasons this is the right call and not a placeholder
 * aesthetic: the company sells from drawing sets, so the drawing set is the
 * honest visual language; and it means the site ships with zero stock imagery
 * pretending to be Vulpine's own projects.
 *
 * Replace individual instances with real project photography as it becomes
 * available - the Media component below handles that swap.
 */

export type ElevationVariant =
  | 'cabinet-run'
  | 'vanity'
  | 'countertop-section'
  | 'door-schedule'
  | 'window-schedule'
  | 'floor-pattern'
  | 'panel-grid'
  | 'trim-profile';

export function Elevation({
  variant = 'cabinet-run',
  className,
  label,
  dark = false,
}: {
  variant?: ElevationVariant;
  className?: string;
  label?: string;
  dark?: boolean;
}) {
  const stroke = dark ? 'rgba(250,248,245,0.55)' : 'rgba(16,18,20,0.55)';
  const faint = dark ? 'rgba(250,248,245,0.18)' : 'rgba(16,18,20,0.16)';
  const accent = '#F97316';

  return (
    <figure className={cn('relative', className)}>
      <svg
        viewBox="0 0 480 320"
        role="img"
        aria-label={label ?? 'Interior elevation line drawing'}
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {variant === 'cabinet-run' && (
          <g fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke">
            {/* upper cabinets */}
            <rect x="40" y="40" width="90" height="90" stroke={stroke} />
            <rect x="130" y="40" width="90" height="90" stroke={stroke} />
            <rect x="260" y="40" width="70" height="90" stroke={stroke} />
            <rect x="330" y="40" width="70" height="90" stroke={stroke} />
            {/* range hood void */}
            <path d="M220 130 L220 60 L260 60 L260 130" stroke={stroke} />
            {/* counter line */}
            <line x1="40" y1="192" x2="400" y2="192" stroke={accent} strokeWidth="2" />
            {/* base cabinets */}
            <rect x="40" y="192" width="80" height="88" stroke={stroke} />
            <rect x="120" y="192" width="80" height="88" stroke={stroke} />
            <rect x="200" y="192" width="80" height="88" stroke={stroke} />
            <rect x="280" y="192" width="120" height="88" stroke={stroke} />
            {/* drawer lines */}
            <line x1="200" y1="220" x2="280" y2="220" stroke={stroke} />
            <line x1="200" y1="248" x2="280" y2="248" stroke={stroke} />
            {/* pulls */}
            <line x1="112" y1="120" x2="122" y2="120" stroke={stroke} strokeWidth="3" />
            <line x1="138" y1="120" x2="148" y2="120" stroke={stroke} strokeWidth="3" />
            <line x1="108" y1="204" x2="112" y2="216" stroke={stroke} strokeWidth="3" />
            {/* floor + dimension line */}
            <line x1="24" y1="280" x2="416" y2="280" stroke={stroke} />
            <line x1="40" y1="300" x2="400" y2="300" stroke={faint} />
            <line x1="40" y1="294" x2="40" y2="306" stroke={faint} />
            <line x1="400" y1="294" x2="400" y2="306" stroke={faint} />
          </g>
        )}

        {variant === 'vanity' && (
          <g fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke">
            <rect x="150" y="40" width="180" height="86" stroke={stroke} />
            <line x1="240" y1="40" x2="240" y2="126" stroke={faint} />
            <line x1="120" y1="176" x2="360" y2="176" stroke={accent} strokeWidth="2" />
            <rect x="130" y="176" width="220" height="96" stroke={stroke} />
            <line x1="130" y1="206" x2="350" y2="206" stroke={stroke} />
            <line x1="240" y1="206" x2="240" y2="272" stroke={stroke} />
            <ellipse cx="240" cy="166" rx="40" ry="8" stroke={stroke} />
            <line x1="240" y1="140" x2="240" y2="158" stroke={stroke} />
            <line x1="100" y1="272" x2="380" y2="272" stroke={stroke} />
          </g>
        )}

        {variant === 'door-schedule' && (
          <g fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke">
            <rect x="50" y="40" width="100" height="230" stroke={stroke} />
            <rect x="66" y="60" width="68" height="86" stroke={faint} />
            <rect x="66" y="162" width="68" height="86" stroke={faint} />
            <circle cx="140" cy="160" r="4" stroke={accent} strokeWidth="2" />
            <rect x="190" y="40" width="100" height="230" stroke={stroke} />
            <line x1="190" y1="120" x2="290" y2="120" stroke={faint} />
            <line x1="190" y1="190" x2="290" y2="190" stroke={faint} />
            <circle cx="280" cy="160" r="4" stroke={stroke} />
            <path d="M330 270 L330 40 L430 40" stroke={stroke} />
            <path d="M330 270 A 100 100 0 0 0 430 170" stroke={faint} strokeDasharray="4 4" />
            <line x1="30" y1="270" x2="450" y2="270" stroke={stroke} />
          </g>
        )}

        {variant === 'panel-grid' && (
          <g fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke">
            {[0, 1, 2, 3].map((col) =>
              [0, 1, 2].map((row) => (
                <rect
                  key={`${col}-${row}`}
                  x={50 + col * 95}
                  y={45 + row * 72}
                  width="88"
                  height="65"
                  stroke={col === 2 && row === 1 ? accent : stroke}
                  strokeWidth={col === 2 && row === 1 ? 2 : 1}
                />
              )),
            )}
            <line x1="30" y1="278" x2="450" y2="278" stroke={stroke} />
            <line x1="50" y1="296" x2="138" y2="296" stroke={faint} />
            <line x1="50" y1="290" x2="50" y2="302" stroke={faint} />
            <line x1="138" y1="290" x2="138" y2="302" stroke={faint} />
          </g>
        )}

        {variant === 'countertop-section' && (
          <g fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke">
            {/* slab section with edge profile */}
            <path d="M60 120 L420 120 L420 150 L60 150 Z" stroke={accent} strokeWidth="2" />
            <path d="M420 120 L432 126 L432 144 L420 150" stroke={accent} strokeWidth="2" />
            <line x1="60" y1="132" x2="420" y2="132" stroke={faint} />
            {/* base cabinet below */}
            <rect x="80" y="150" width="150" height="110" stroke={stroke} />
            <rect x="230" y="150" width="150" height="110" stroke={stroke} />
            <line x1="230" y1="182" x2="380" y2="182" stroke={stroke} />
            {/* sink cutout indication */}
            <path d="M150 120 L150 100 L260 100 L260 120" stroke={stroke} strokeDasharray="4 4" />
            <line x1="40" y1="260" x2="440" y2="260" stroke={stroke} />
            <line x1="60" y1="284" x2="432" y2="284" stroke={faint} />
            <line x1="60" y1="278" x2="60" y2="290" stroke={faint} />
            <line x1="432" y1="278" x2="432" y2="290" stroke={faint} />
          </g>
        )}

        {variant === 'window-schedule' && (
          <g fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke">
            <rect x="50" y="60" width="110" height="140" stroke={stroke} />
            <line x1="105" y1="60" x2="105" y2="200" stroke={faint} />
            <line x1="50" y1="130" x2="160" y2="130" stroke={faint} />
            <rect x="190" y="60" width="110" height="90" stroke={stroke} />
            <line x1="190" y1="105" x2="300" y2="105" stroke={accent} strokeWidth="2" />
            <rect x="330" y="60" width="100" height="140" stroke={stroke} />
            <line x1="330" y1="105" x2="430" y2="105" stroke={faint} />
            <path d="M330 200 L380 165 L430 200" stroke={faint} strokeDasharray="4 4" />
            <line x1="30" y1="230" x2="450" y2="230" stroke={stroke} />
            <line x1="50" y1="256" x2="160" y2="256" stroke={faint} />
            <line x1="50" y1="250" x2="50" y2="262" stroke={faint} />
            <line x1="160" y1="250" x2="160" y2="262" stroke={faint} />
          </g>
        )}

        {variant === 'floor-pattern' && (
          <g fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke">
            {[0, 1, 2, 3, 4, 5].map((row) => {
              const y = 60 + row * 34;
              const offset = row % 2 === 0 ? 0 : 55;
              return (
                <g key={row}>
                  <line x1="50" y1={y} x2="430" y2={y} stroke={stroke} />
                  {[0, 1, 2, 3].map((col) => {
                    const x = 50 + offset + col * 110;
                    return x < 430 ? (
                      <line key={col} x1={x} y1={y} x2={x} y2={y + 34} stroke={row === 2 && col === 1 ? accent : faint} strokeWidth={row === 2 && col === 1 ? 2 : 1} />
                    ) : null;
                  })}
                </g>
              );
            })}
            <line x1="50" y1="264" x2="430" y2="264" stroke={stroke} />
            <line x1="50" y1="288" x2="430" y2="288" stroke={faint} />
            <line x1="50" y1="282" x2="50" y2="294" stroke={faint} />
            <line x1="430" y1="282" x2="430" y2="294" stroke={faint} />
          </g>
        )}

        {variant === 'trim-profile' && (
          <g fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke">
            {/* base profile section */}
            <path d="M90 240 L90 110 Q90 96 104 96 L118 96 Q132 96 132 110 L132 240 Z" stroke={accent} strokeWidth="2" />
            {/* casing profile */}
            <path d="M200 240 L200 120 L214 106 L228 120 L228 240 Z" stroke={stroke} />
            {/* crown profile */}
            <path d="M300 240 L300 150 Q322 150 322 128 L340 128 L340 240 Z" stroke={stroke} />
            <line x1="50" y1="240" x2="430" y2="240" stroke={stroke} />
            <line x1="90" y1="266" x2="132" y2="266" stroke={faint} />
            <line x1="90" y1="260" x2="90" y2="272" stroke={faint} />
            <line x1="132" y1="260" x2="132" y2="272" stroke={faint} />
          </g>
        )}
      </svg>
      {label ? (
        <figcaption
          className={cn(
            'absolute bottom-3 left-4 font-mono text-[0.625rem] uppercase tracking-label',
            dark ? 'text-warm-400' : 'text-graphite-500',
          )}
        >
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}
