export type Industry = {
  slug: string;
  name: string;
  summary: string;
  /** How Vulpine fits into this market's procurement environment. */
  role: string;
  points: string[];
};

export const industries: Industry[] = [
  {
    slug: 'multifamily',
    name: 'Multifamily',
    summary: 'Repeatable finish packages priced by unit type and delivered by building or phase.',
    role:
      'Multifamily procurement is driven by unit mix. Vulpine prices the finish scope against the unit matrix, holds the selections consistent across unit types, and sequences delivery so material lands building by building instead of all at once.',
    points: [
      'Pricing by unit type and unit count',
      'Consistent selections across the community',
      'Delivery staged by building or phase',
      'Coordination with the construction schedule',
    ],
  },
  {
    slug: 'apartment-renovations',
    name: 'Apartment Renovations',
    summary: 'Turn packages sized to occupancy, budget, and how fast units need to come back online.',
    role:
      'Renovation work runs on turn speed. Vulpine builds a standard package around the approved scope so every unit pulls from the same selections, and coordinates release quantities against the turn schedule rather than the whole property at once.',
    points: [
      'Standardized turn packages',
      'Release quantities matched to turn pace',
      'Refacing and replacement scope options',
      'Repeat ordering against an approved spec',
    ],
  },
  {
    slug: 'new-construction',
    name: 'New Construction',
    summary: 'Finish scope coordinated against the schedule from bid through delivery.',
    role:
      'On new construction, lead times decide whether a schedule holds. Vulpine reviews the finish scope at bid, confirms quantities against the plans and schedules, and works lead times backward from the dates the material is actually needed on site.',
    points: [
      'Bid-stage scope review',
      'Quantities confirmed against plans and schedules',
      'Lead times worked against construction dates',
      'Delivery coordination through completion',
    ],
  },
  {
    slug: 'commercial-development',
    name: 'Commercial Development',
    summary: 'Interior finish supply for commercial interiors and mixed-use development.',
    role:
      'Commercial interiors carry specification requirements that have to be matched, not approximated. Vulpine reviews the finish schedule and specifications, sources product that meets what is called for, and documents alternates clearly when they are worth considering.',
    points: [
      'Specification-driven sourcing',
      'Documented alternates where appropriate',
      'Coordination with the project team and design',
      'Delivery around active site conditions',
    ],
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    summary: 'Guest room and public area finish scope supplied to the design intent.',
    role:
      'Hospitality projects repeat a room package many times over and hold the public areas to a different standard. Vulpine prices both, keeps the room package consistent across keys, and coordinates delivery around renovation phasing or opening dates.',
    points: [
      'Guest room packages priced by key count',
      'Public and amenity area scope',
      'Phasing around occupancy or opening dates',
      'Consistency across repeated room types',
    ],
  },
  {
    slug: 'senior-living',
    name: 'Senior Living',
    summary: 'Unit and common area finishes with durability and accessibility requirements in scope.',
    role:
      'Senior living carries requirements that sit outside standard multifamily. Vulpine reviews the accessibility and durability requirements in the specifications, sources against them, and coordinates delivery around communities that are frequently occupied during the work.',
    points: [
      'Accessibility requirements reviewed in scope',
      'Durability-driven product selection',
      'Unit and common area packages',
      'Delivery around occupied communities',
    ],
  },
  {
    slug: 'residential-builders',
    name: 'Residential Builders',
    summary: 'Finish packages by plan and elevation for production and custom home programs.',
    role:
      'Builders work from plans and option programs. Vulpine prices the finish package by plan, keeps the standard and upgrade selections organized, and releases material against the start schedule instead of one house at a time.',
    points: [
      'Pricing by plan and elevation',
      'Standard and upgrade selections',
      'Releases against the start schedule',
      'Consistent supply across a community',
    ],
  },
  {
    slug: 'general-contractors',
    name: 'General Contractors',
    summary: 'Bid-ready supply pricing and documentation that fits into the GC bid package.',
    role:
      'General contractors need pricing they can put straight into a bid and a supplier who answers during the award window. Vulpine responds to bid invitations with clear scope boundaries, itemized categories, and the documentation the bid package requires.',
    points: [
      'Bid invitations reviewed and returned on schedule',
      'Clear scope inclusions and exclusions',
      'Itemized category pricing',
      'Communication maintained through award',
    ],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
