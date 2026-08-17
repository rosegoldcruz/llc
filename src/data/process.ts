export type ProcessStep = {
  number: string;
  title: string;
  summary: string;
  /** Expanded copy used on the /process page. */
  detail: string;
  /** What the project team provides or receives at this stage. */
  exchange: string[];
};

/** The five steps shown on the homepage. */
export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Send the Project',
    summary: 'Plans, specifications, schedules, quantities, scope, or bid package.',
    detail:
      'Send whatever the project has. Plans and specifications are ideal, but a scope narrative, a unit matrix, or a bid invitation is enough to start. If documentation is incomplete, we will tell you what is missing rather than pricing around a gap.',
    exchange: ['Plans and specifications', 'Finish and door schedules', 'Unit matrix or quantities', 'Bid invitation and due date'],
  },
  {
    number: '02',
    title: 'Review the Scope',
    summary: 'Requirements, products, quantities, and applicable specifications are reviewed.',
    detail:
      'The project is reviewed against the documents. We confirm which categories are in scope, what the specifications call for, and where quantities come from, then raise questions before pricing rather than after.',
    exchange: ['Confirmed scope boundaries', 'Product and specification review', 'Quantity basis', 'Open questions returned to the team'],
  },
  {
    number: '03',
    title: 'Build the Supply Package',
    summary: 'Sourcing, pricing, alternates, logistics, and lead times are coordinated.',
    detail:
      'Sourcing is coordinated across the categories in scope. Pricing is assembled by category so it can be read line by line, alternates are documented where they are worth considering, and lead times are checked against the schedule the project is working to.',
    exchange: ['Category pricing', 'Documented alternates', 'Lead times', 'Freight and delivery assumptions'],
  },
  {
    number: '04',
    title: 'Submit and Coordinate',
    summary: 'Pricing is submitted and communication is maintained through review and award.',
    detail:
      'Pricing is submitted in the format the bid package requires. From there we stay available through review, scope questions, value engineering, and award — the window where most supply conversations go quiet.',
    exchange: ['Submitted pricing', 'Scope clarifications', 'Revisions and alternates', 'Communication through award'],
  },
  {
    number: '05',
    title: 'Fulfill',
    summary: 'Procurement and delivery are coordinated around project requirements.',
    detail:
      'After award, procurement is placed and delivery is coordinated against the actual site schedule. Releases are staged by building or phase where the project calls for it, and changes are handled as the schedule moves.',
    exchange: ['Procurement placed', 'Delivery scheduling', 'Staged releases', 'Ongoing schedule coordination'],
  },
];

/** The full operational sequence shown on the /process page. */
export const processStages = [
  { stage: 'Project Intake', note: 'Documents received and logged against the project.' },
  { stage: 'Scope Review', note: 'Categories, specifications, and quantities confirmed.' },
  { stage: 'Product / Supply Coordination', note: 'Sourcing coordinated across the categories in scope.' },
  { stage: 'Pricing', note: 'Category pricing assembled with alternates where applicable.' },
  { stage: 'Submission', note: 'Pricing submitted in the required format and on the required date.' },
  { stage: 'Award', note: 'Scope confirmed, questions resolved, order of operations set.' },
  { stage: 'Procurement', note: 'Material procured against the confirmed scope.' },
  { stage: 'Delivery Coordination', note: 'Delivery staged against the site schedule.' },
];
