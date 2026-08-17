import { Hero } from '@/components/sections/Hero';
import { CapabilitiesGrid } from '@/components/sections/CapabilitiesGrid';
import { IndustriesGrid } from '@/components/sections/IndustriesGrid';
import { WhyVulpine } from '@/components/sections/WhyVulpine';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { PartnerNetwork } from '@/components/sections/PartnerNetwork';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilitiesGrid />
      <IndustriesGrid />
      <WhyVulpine />
      <ProcessTimeline />
      <FeaturedProjects />
      <PartnerNetwork />
      <FinalCTA />
    </>
  );
}
