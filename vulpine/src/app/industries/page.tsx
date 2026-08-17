import { PageHeader } from '@/components/ui/PageHeader';
import { IndustriesGrid } from '@/components/sections/IndustriesGrid';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Industries',
  description:
    'Interior finishes supply for multifamily, apartment renovations, new construction, commercial development, hospitality, senior living, residential builders, and general contractors.',
  path: '/industries',
});

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Built around the teams responsible for getting projects delivered."
        intro="Every market prices, schedules, and takes delivery differently. Here is how Vulpine fits into each one."
        trail={[{ label: 'Industries', href: '/industries' }]}
      />
      <IndustriesGrid heading={false} detailed />
      <FinalCTA />
    </>
  );
}
