/**
 * Single source of truth for company-level content.
 *
 * FILL THESE IN BEFORE LAUNCH.
 * Empty strings are intentional: components hide contact details that are not
 * configured rather than displaying invented information.
 */

export const site = {
  name: 'Vulpine',
  legalName: '', // e.g. "Vulpine LLC" - leave blank until confirmed
  tagline: 'Built on supply. Backed by service.',
  url: 'https://vulpine.llc',
  descriptor: 'An Interior Finishes Supply Company',
  description:
    'Vulpine supplies interior finish products for builders, developers, general contractors, and project teams nationwide, including cabinets, countertops, doors, windows, flooring, and more.',
  shortDescription:
    'Vulpine supplies interior finish products for builders, developers, general contractors, and project teams nationwide, with project-focused sourcing, coordination, logistics, and service.',
  mission:
    'Make interior-finish procurement simpler, faster, and more dependable for the teams responsible for getting projects built.',
};

export const contact = {
  /** Public inquiry email. */
  email: '',
  /** Public project / estimating email. Falls back to `email` when blank. */
  projectsEmail: '',
  /** Public partnerships email. Falls back to `email` when blank. */
  partnersEmail: '',
  /** Public phone in E.164 for the tel: link, e.g. "+16025550123". */
  phone: '',
  /** Phone as displayed, e.g. "(602) 555-0123". */
  phoneDisplay: '',
  /** Mailing address lines. Leave empty to hide the address block. */
  address: [] as string[],
  linkedin: '',
};

export const nav = [
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Industries', href: '/industries' },
  { label: 'Projects', href: '/projects' },
  { label: 'Our Process', href: '/process' },
  { label: 'About', href: '/about' },
  { label: 'Partners', href: '/partners' },
];

export const footerNav = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Our Process', href: '/process' },
      { label: 'Partners', href: '/partners' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Supply',
    links: [
      { label: 'Capabilities', href: '/capabilities' },
      { label: 'Industries', href: '/industries' },
      { label: 'Projects', href: '/projects' },
      { label: 'Submit a Project', href: '/submit-project' },
    ],
  },
];
