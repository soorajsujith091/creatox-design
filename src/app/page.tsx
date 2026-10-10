import { ReferenceHome } from "@/components/sections/ReferenceHome";
import { ThreePillars } from "@/components/sections/ThreePillars";
import { ServicesAccordion } from "@/components/sections/ServicesAccordion";
import { StoryTicker } from "@/components/sections/StoryTicker";
import { OurStory } from "@/components/sections/OurStory";
import { WorksWheelSection } from "@/components/sections/WorksWheelSection";
import { Stats } from "@/components/sections/Stats";
import { GrandMalabarExpo } from "@/components/sections/GrandMalabarExpo";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { ContactMini } from "@/components/sections/ContactMini";
import { CTABanner } from "@/components/sections/CTABanner";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <ReferenceHome />
      <ThreePillars />
      <div id="services"><ServicesAccordion /></div>
      <StoryTicker />
      <div id="about"><OurStory /></div>
      <WorksWheelSection />
      <Stats />
      <GrandMalabarExpo />
      <div id="testimonials"><Testimonials /></div>
      <BlogGrid />
      <div id="contact"><ContactMini /></div>
      <CTABanner />
      <Footer />
    </>
  );
}
