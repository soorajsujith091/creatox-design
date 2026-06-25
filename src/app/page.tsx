import { Hero } from "@/components/sections/Hero";
import { TickerMarquee } from "@/components/sections/TickerMarquee";
import { ThreePillars } from "@/components/sections/ThreePillars";
import { ServicesAccordion } from "@/components/sections/ServicesAccordion";
import { StoryTicker } from "@/components/sections/StoryTicker";
import { OurStory } from "@/components/sections/OurStory";
import { SelectedWorks } from "@/components/sections/SelectedWorks";
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
      <Hero />
      <TickerMarquee />
      <ThreePillars />
      <ServicesAccordion />
      <StoryTicker />
      <OurStory />
      <SelectedWorks />
      <Stats />
      <GrandMalabarExpo />
      <Testimonials />
      <BlogGrid />
      <ContactMini />
      <CTABanner />
      <Footer />
    </>
  );
}
