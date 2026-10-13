import { ReferenceHome } from "@/components/sections/ReferenceHome";
import { ThreePillars } from "@/components/sections/ThreePillars";
import { ServicesAccordion } from "@/components/sections/ServicesAccordion";
import { SelectedCreatoxWork } from "@/components/sections/SelectedCreatoxWork";
import { StoryTicker } from "@/components/sections/StoryTicker";
import { OurStory } from "@/components/sections/OurStory";
import { WorksWheelSection } from "@/components/sections/WorksWheelSection";
import { Stats } from "@/components/sections/Stats";
import { GrandMalabarExpo } from "@/components/sections/GrandMalabarExpo";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { ContactMini } from "@/components/sections/ContactMini";
import { Footer } from "@/components/sections/Footer";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import "./home-layout.css";
import { AgencyFilm } from "@/components/sections/AgencyFilm";

export default function Home() {
  return (
    <div className="home-layout">
      <ReferenceHome><ThreePillars /></ReferenceHome>
      <AgencyFilm />
      <div id="services"><ServicesAccordion /></div>
      <SelectedCreatoxWork />
      <StoryTicker />
      <div id="about"><OurStory /></div>
      <CinematicHero aria-label="Creatox branding and digital experience showcase" />
      <WorksWheelSection />
      <Stats />
      <GrandMalabarExpo />
      <div id="testimonials"><Testimonials /></div>
      <BlogGrid />
      <div id="contact"><ContactMini /></div>
      <Footer />
    </div>
  );
}
