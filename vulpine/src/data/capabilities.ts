import type { ElevationVariant } from '@/components/ui/Elevation';

export type Capability = {
  slug: string;
  name: string;
  /** One-line summary used on cards. */
  summary: string;
  /** Longer overview used on the capability detail page. */
  overview: string;
  applications: string[];
  projectTypes: string[];
  considerations: string[];
  /**
   * Path under /public/images. Leave null until a real, licensed image exists —
   * the Media component renders a drawn architectural placeholder instead.
   */
  image: string | null;
  imageAlt: string;
  /** Line drawing shown until real photography exists for this category. */
  drawing: ElevationVariant;
  /** Note for whoever sources the photography. Not rendered. */
  imageBrief: string;
};

export const capabilities: Capability[] = [
  {
    slug: 'cabinets',
    name: 'Cabinets',
    summary:
      'Kitchen and unit cabinetry supplied to project specifications, quantities, and delivery schedules.',
    overview:
      'Cabinets are the core of most interior finish packages and usually set the schedule for everything around them. Vulpine reviews the cabinet scope against plans and specifications, confirms quantities and configurations by unit type, and builds a supply package that matches the door style, finish, and construction the project calls for.',
    applications: [
      'Kitchens',
      'Unit casework',
      'Common area and amenity spaces',
      'Laundry and utility rooms',
    ],
    projectTypes: ['Multifamily', 'Apartment renovations', 'Senior living', 'Residential builders'],
    considerations: [
      'Framed and frameless construction',
      'Door style, finish, and hardware selections',
      'Quantities by unit type and unit mix',
      'Lead times against the construction schedule',
    ],
    image: null,
    drawing: 'cabinet-run',
    imageAlt: 'Installed cabinetry in a completed unit kitchen',
    imageBrief: 'Wide shot of installed kitchen cabinetry in a delivered multifamily unit.',
  },
  {
    slug: 'vanities',
    name: 'Vanities',
    summary: 'Bath vanities and casework coordinated with countertop and plumbing selections.',
    overview:
      'Vanity scope is quantity-driven and detail-sensitive. Vulpine coordinates vanity sizes, configurations, and finishes against the unit plans, and aligns the package with the countertop and plumbing selections so the pieces arrive as a matched set.',
    applications: ['Primary baths', 'Secondary baths', 'Powder rooms', 'Common area restrooms'],
    projectTypes: ['Multifamily', 'Hospitality', 'Senior living', 'Commercial development'],
    considerations: [
      'Sizes and configurations by unit type',
      'Countertop and sink coordination',
      'Finish continuity with kitchen cabinetry',
      'Accessibility requirements where applicable',
    ],
    image: null,
    drawing: 'vanity',
    imageAlt: 'Bath vanity with countertop installed',
    imageBrief: 'Bath vanity with countertop, straight-on, neutral lighting.',
  },
  {
    slug: 'countertops',
    name: 'Countertops',
    summary: 'Surface materials sourced and coordinated against cabinet and vanity packages.',
    overview:
      'Countertops are sourced to the specified material and coordinated with the cabinet and vanity package so the sequencing works on site. Vulpine works from the plans and schedules to confirm material, edge, and quantity requirements.',
    applications: ['Kitchen surfaces', 'Vanity tops', 'Amenity and common area surfaces'],
    projectTypes: ['Multifamily', 'Commercial development', 'Hospitality', 'New construction'],
    considerations: [
      'Specified material and finish',
      'Edge profile and cutout requirements',
      'Sequencing against cabinet installation',
      'Quantities by unit type',
    ],
    image: null,
    drawing: 'countertop-section',
    imageAlt: 'Countertop surface installed over cabinetry',
    imageBrief: 'Detail of countertop surface and edge over installed cabinetry.',
  },
  {
    slug: 'doors',
    name: 'Doors',
    summary: 'Interior and entry door packages supplied to the door schedule.',
    overview:
      'Door packages are built from the door schedule. Vulpine reviews sizes, swings, cores, and finish requirements, then coordinates the supply package so quantities and hardware preparation match what is on the drawings.',
    applications: ['Unit entry doors', 'Interior passage doors', 'Closet doors', 'Common area doors'],
    projectTypes: ['Multifamily', 'Apartment renovations', 'New construction', 'Senior living'],
    considerations: [
      'Door schedule quantities and sizes',
      'Core, rating, and finish requirements',
      'Hardware preparation',
      'Delivery staging by building or floor',
    ],
    image: null,
    drawing: 'door-schedule',
    imageAlt: 'Interior door package staged for installation',
    imageBrief: 'Interior doors staged on site, or an installed unit entry door.',
  },
  {
    slug: 'windows',
    name: 'Windows',
    summary: 'Window supply coordinated against the window schedule and project timeline.',
    overview:
      'Window scope is reviewed against the window schedule and elevations. Vulpine coordinates sizes, configurations, and quantities, and works the lead times back from the point in the schedule when the openings need to be closed in.',
    applications: ['New construction openings', 'Replacement and renovation scope'],
    projectTypes: ['Multifamily', 'Apartment renovations', 'New construction', 'Residential builders'],
    considerations: [
      'Sizes and configurations per schedule',
      'Performance requirements noted in the specifications',
      'Lead times against close-in dates',
      'Delivery sequencing by building',
    ],
    image: null,
    drawing: 'window-schedule',
    imageAlt: 'Windows installed in a building elevation',
    imageBrief: 'Building elevation showing installed windows, or window units staged on site.',
  },
  {
    slug: 'flooring',
    name: 'Flooring',
    summary: 'Flooring materials supplied by area takeoff and unit type.',
    overview:
      'Flooring is quantity-heavy and takeoff-driven. Vulpine works from the finish schedule and plans to confirm material, area quantities, and transitions, then builds the supply package around the installation sequence.',
    applications: ['Unit interiors', 'Corridors', 'Amenity and common areas', 'Leasing and office space'],
    projectTypes: ['Multifamily', 'Commercial development', 'Hospitality', 'Senior living'],
    considerations: [
      'Specified material and wear layer',
      'Area quantities and attic stock',
      'Transitions and trim',
      'Delivery staging against installation',
    ],
    image: null,
    drawing: 'floor-pattern',
    imageAlt: 'Flooring installed in a finished interior',
    imageBrief: 'Finished corridor or unit interior showing installed flooring.',
  },
  {
    slug: 'wall-panels',
    name: 'Wall Panels',
    summary: 'Panel and surface products for interior wall applications.',
    overview:
      'Wall panel scope is reviewed against the interior elevations and finish schedule. Vulpine confirms product, quantities, and edge or trim requirements, and coordinates the package with the surrounding finish scope.',
    applications: ['Amenity and lobby walls', 'Corridor surfaces', 'Accent and feature walls', 'Wet area panels'],
    projectTypes: ['Hospitality', 'Commercial development', 'Senior living', 'Multifamily'],
    considerations: [
      'Product and finish per specification',
      'Panel sizes and layout',
      'Trim and transition details',
      'Quantities by area',
    ],
    image: null,
    drawing: 'panel-grid',
    imageAlt: 'Interior wall panels installed in a common area',
    imageBrief: 'Amenity or corridor wall showing installed panel product.',
  },
  {
    slug: 'trim-and-molding',
    name: 'Trim & Molding',
    summary: 'Base, casing, and molding profiles supplied by linear takeoff.',
    overview:
      'Trim is supplied by linear takeoff against the finish schedule. Vulpine confirms profiles, material, and quantities, and coordinates the package so it lands with the door and flooring scope it depends on.',
    applications: ['Base', 'Door and window casing', 'Crown and ceiling trim', 'Miscellaneous molding'],
    projectTypes: ['Multifamily', 'Residential builders', 'Apartment renovations', 'New construction'],
    considerations: [
      'Profile and material per specification',
      'Linear quantities by unit type',
      'Finish and paint-grade requirements',
      'Coordination with door and flooring delivery',
    ],
    image: null,
    drawing: 'trim-profile',
    imageAlt: 'Trim and molding installed in a finished room',
    imageBrief: 'Detail of installed base and casing in a finished interior.',
  },
  {
    slug: 'interior-finish-packages',
    name: 'Interior Finish Packages',
    summary:
      'Multiple finish categories sourced, priced, and coordinated through one supply relationship.',
    overview:
      'When a project needs several finish categories, running them through one supplier reduces the number of relationships the project team has to manage. Vulpine prices the categories together, coordinates lead times against a single schedule, and keeps delivery sequencing aligned across the package.',
    applications: [
      'Full unit finish packages',
      'Renovation turn packages',
      'Multi-category bid packages',
      'Phased building deliveries',
    ],
    projectTypes: [
      'Multifamily',
      'Apartment renovations',
      'Senior living',
      'Hospitality',
      'Commercial development',
    ],
    considerations: [
      'Category mix and scope boundaries',
      'Combined pricing and alternates',
      'Lead times across categories',
      'Delivery sequencing by building or phase',
    ],
    image: null,
    drawing: 'countertop-section',
    imageAlt: 'Completed interior showing multiple finish categories',
    imageBrief: 'Completed unit interior where cabinets, counters, flooring, and trim are all visible.',
  },
];

export function getCapability(slug: string) {
  return capabilities.find((c) => c.slug === slug);
}
