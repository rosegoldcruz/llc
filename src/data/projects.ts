export type Project = {
  slug: string;
  name: string;
  city: string;
  state: string;
  /** Must match an Industry name, e.g. "Multifamily". Used for filtering. */
  projectType: string;
  /** Optional. Omit when the count is not confirmed. */
  unitCount?: number;
  scope: string;
  /** Must match Capability names, e.g. ["Cabinets", "Countertops"]. */
  categories: string[];
  /** Optional. Only use terms that are accurate, e.g. "Bid submitted", "Supplied". */
  status?: string;
  description: string;
  heroImage: string | null;
  heroImageAlt: string;
  gallery?: { src: string; alt: string }[];
  /** Optional non-confidential notes. Never include bid values or pricing. */
  notes?: string[];
};

/**
 * PUBLISHED PROJECTS
 *
 * This array is intentionally empty.
 *
 * The project components are built and tested, but nothing is published until
 * verified project information is supplied. Do NOT add a project unless the
 * name, location, scope, and categories are confirmed and the client is
 * comfortable with it being public. Never publish contract values, bid amounts,
 * award dates, or anything else from a bid package.
 *
 * Template:
 *
 * {
 *   slug: 'project-name',
 *   name: 'Project Name',
 *   city: 'City',
 *   state: 'ST',
 *   projectType: 'Multifamily',
 *   unitCount: 000,
 *   scope: 'Cabinet and countertop supply',
 *   categories: ['Cabinets', 'Countertops'],
 *   status: 'Supplied',
 *   description: 'Two to four sentences describing the supply scope.',
 *   heroImage: '/images/projects/project-name/hero.jpg',
 *   heroImageAlt: 'Description of the image',
 * }
 */
export const projects: Project[] = [];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectFilters() {
  const types = Array.from(new Set(projects.map((p) => p.projectType)));
  return types.sort();
}

/** Filters only earn their place once there is enough to filter. */
export const SHOW_PROJECT_FILTERS = projects.length >= 6;
