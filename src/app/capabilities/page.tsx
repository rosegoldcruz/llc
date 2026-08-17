import { PageHeader } from '@/components/ui/PageHeader';
import { CapabilitiesGrid } from '@/components/sections/CapabilitiesGrid';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Capabilities',
  description:
    'Cabinets, vanities, countertops, doors, windows, flooring, wall panels, trim and molding, and full interior finish packages supplied for construction and renovation projects.',
  path: '/capabilities',
});

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Capabilities"
        title="Interior finishes. One supply relationship."
        intro="Vulpine supplies the finish categories that make up a unit or a building interior. Each category can be sourced on its own or priced together as a package."
        trail={[{ label: 'Capabilities', href: '/capabilities' }]}
      />
      <CapabilitiesGrid heading={false} />
      <FinalCTA title="Send the scope. We will price it." body="Plans, specifications, a finish schedule, or a bid invitation is enough to start." />
    </>
  );
}
