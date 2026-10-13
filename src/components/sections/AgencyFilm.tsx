import { ArrowUpRight } from "lucide-react";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

export function AgencyFilm() {
  return <ScrollExpandMedia
    mediaSrc="/videos/creatox%20profile%20website%20(2).mp4"
    posterSrc="/images/agency-runners.png"
    title="Creative thinking. Real impact."
    eyebrow="INSIDE CREATOX"
  >
    <div>
      <h3>A creative digital agency in Kannur, Kerala.</h3>
      <p>We bring brand strategy, design, web development and digital marketing together to help businesses connect with their audience. From your first brand identity to your next campaign, we build experiences around your goals.</p>
    </div>
    <a className="creatox-film-link" href="#contact">Start a project <ArrowUpRight size={18} aria-hidden="true" /></a>
  </ScrollExpandMedia>;
}
