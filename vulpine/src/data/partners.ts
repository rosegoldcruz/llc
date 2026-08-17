export type PartnerPath = {
  slug: string;
  title: string;
  audience: string;
  summary: string;
  points: string[];
};

export const partnerPaths: PartnerPath[] = [
  {
    slug: 'supply-partnership',
    title: 'Supply Partnership',
    audience: 'Manufacturers, distributors, logistics providers, and service relationships',
    summary:
      'For companies interested in supplying products or services through the Vulpine network. We are consistently reviewing manufacturing, distribution, freight, and category-specialist relationships that strengthen what we can put in front of a project team.',
    points: [
      'Manufacturing relationships across interior finish categories',
      'Distribution and regional supply coverage',
      'Freight and logistics coordination',
      'Category specialists and service relationships',
    ],
  },
  {
    slug: 'project-partnership',
    title: 'Project & Business Partnership',
    audience: 'Builders, developers, general contractors, consultants, and industry professionals',
    summary:
      'For project teams and industry professionals who want a supply relationship rather than a one-off transaction. This includes ongoing bid participation, standing finish packages, and referral relationships.',
    points: [
      'Standing bid invitations across a portfolio',
      'Repeatable finish packages across projects',
      'Referral and consultant relationships',
      'National project opportunities',
    ],
  },
];

export const networkAreas = [
  {
    title: 'Manufacturing Relationships',
    body: 'Direct relationships across interior finish categories, so product selection is driven by what the project needs rather than by what a single line happens to carry.',
  },
  {
    title: 'Distribution Relationships',
    body: 'Distribution coverage that supports projects in more than one region without rebuilding the supply chain for every job.',
  },
  {
    title: 'Logistics Coordination',
    body: 'Freight and delivery coordinated against project schedules, including staged releases where the site cannot take everything at once.',
  },
  {
    title: 'Category Specialists',
    body: 'Specialist relationships for categories that carry their own requirements, so the detail work does not get generalized away.',
  },
];
