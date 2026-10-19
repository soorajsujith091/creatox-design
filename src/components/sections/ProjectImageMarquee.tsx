"use client";

import DiagonalMarqueeCarousel from "@/components/ui/great-ui-diagonal-marquee-carousel";
import { projects } from "@/data/projects";
import { projectCoverImages } from "@/data/project-cover-images";

const cards = projects.map(project => ({
  id: project.id,
  title: project.title,
  url: projectCoverImages[project.id] ?? project.image,
}));

export function ProjectImageMarquee() {
  return (
    <section className="project-image-marquee" aria-labelledby="project-images-heading">
      <header className="project-image-marquee-header site-gutter">
        <div>
          <p className="project-image-marquee-label">/ THE CREATIVE MIX</p>
          <h2 id="project-images-heading">A different angle on our work.</h2>
        </div>
      </header>
      <DiagonalMarqueeCarousel
        cards={cards}
        angle={-18}
        baseSpeed={240}
        className="h-[480px] bg-[#0a0a0a] md:h-[680px]"
        cardClassName="h-[180px] w-[240px] rounded-xl md:h-[260px] md:w-[360px]"
        fadeClassName="from-[#0a0a0a] dark:from-[#0a0a0a]"
      />
    </section>
  );
}
