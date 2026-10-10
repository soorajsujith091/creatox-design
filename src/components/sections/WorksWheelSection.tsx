"use client";

import { ArrowUpRight } from "lucide-react";
import { WorksWheel } from "@/components/ui/works-wheel";
import { projects } from "@/data/projects";
import "./works-wheel-section.css";

const items = projects.map(project => ({
  title: project.title,
  image: project.image,
  href: `https://creatoxdesigns.com${project.link}`,
}));

export function WorksWheelSection() {
  return <section id="selected-work" className="creatox-works" aria-labelledby="creatox-works-heading">
    <header className="creatox-works-heading">
      <div><span className="creatox-works-eyebrow">/ SELECTED WORK</span><h2 id="creatox-works-heading">Work that <span>speaks.</span></h2></div>
      <p>From Kannur to the world — brands we’ve built.<br/>Branding, websites and digital campaigns with purpose.</p>
    </header>
    <div className="creatox-wheel-desktop">
      <WorksWheel items={items} label="Creatox works" action="View project" className="creatox-wheel-stage" />
      <p className="creatox-wheel-help">Scroll or drag to explore · Use ↑ ↓ keys or select a project from the index</p>
    </div>
    <div className="creatox-wheel-cards">{projects.map((project, index) => <a key={project.id} href={items[index].href} className="creatox-work-card">
      <div className="creatox-work-cover"><img src={project.image} alt={`${project.title} project by Creatox Designs`} loading="lazy" width={370} height={370} onError={e => { e.currentTarget.style.display = "none"; }}/><span>{project.tags.join(" / ")}</span></div>
      <h3>{project.title}<ArrowUpRight size={22}/></h3><p>{project.description}</p><span className="creatox-work-link">View project <ArrowUpRight size={16}/></span>
    </a>)}</div>
    <footer className="creatox-works-footer"><span>Have something in mind?</span><a href="#contact">Let’s build your next chapter <ArrowUpRight size={20}/></a></footer>
  </section>;
}
