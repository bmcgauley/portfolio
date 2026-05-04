import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import RecentAchievements from "@/components/RecentAchievements";
import CredentialStrip from "@/components/home/CredentialStrip";
import FeaturedPublications from "@/components/home/FeaturedPublications";
import OtherPropertiesStrip from "@/components/home/OtherPropertiesStrip";
import { SectionDivider } from "@/components/ui/section-divider";

export default function Home() {
  return (
    <>
      <Hero />
      <CredentialStrip />
      <SectionDivider />
      <FeaturedProjects />
      <SectionDivider />
      <RecentAchievements />
      <SectionDivider />
      <FeaturedPublications />
      <OtherPropertiesStrip />
    </>
  );
}
