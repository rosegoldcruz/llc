/**
 * The section grids use a 1px background gap to draw their rules. That trick
 * leaves any unfilled cells in the last row showing as a solid block of the
 * gap color. These filler cells close the row so the rule work stays clean at
 * every breakpoint.
 */
export function GridFill({ cells, dark = false }: { cells: number; dark?: boolean }) {
  const remainder = cells % 3;
  const needed = remainder === 0 ? 0 : 3 - remainder;
  if (needed === 0) return null;

  const bg = dark ? 'bg-graphite-900' : 'bg-warm-50';

  return (
    <>
      {Array.from({ length: needed }).map((_, index) => (
        <li key={`fill-${index}`} aria-hidden="true" className={`hidden ${bg} lg:block`} />
      ))}
      {cells % 2 === 1 ? <li aria-hidden="true" className={`hidden ${bg} sm:block lg:hidden`} /> : null}
    </>
  );
}
