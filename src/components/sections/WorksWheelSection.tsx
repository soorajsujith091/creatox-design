"use client";

import { useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { projects } from "@/data/projects";
import { projectCoverImages } from "@/data/project-cover-images";
import "./works-wheel-section.css";

const featuredProjects = projects.slice(0, 3);
const images = featuredProjects.map(project => ({
  src: projectCoverImages[project.id] ?? project.image,
  alt: `${project.title} illustrative concept cover`,
}));

export function WorksWheelSection() {
  const [paused, setPaused] = useState(false);
  return <section id="selected-work" className="creatox-works" aria-labelledby="creatox-works-heading">
    <header className="creatox-works-heading">
      <div><span className="creatox-works-eyebrow">/ SELECTED WORK</span><h2 id="creatox-works-heading">Work that <span>speaks.</span></h2></div>
      <p>From Kannur to the world — brands we’ve built.<br/>Branding, websites and digital campaigns with purpose.</p>
    </header>
    <TiltedGridHero images={images} speed={6} tileHeight={46} aspectRatio={4 / 3} curve={65} axis={53} fade={10} className={`creatox-tilted-reel ${paused ? "is-paused" : ""}`}>
      <div className="creatox-reel-top"><span>CREATIVITY IN EVERY DIRECTION.</span><button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play project reel" : "Pause project reel"} aria-pressed={paused}>{paused ? <Play size={16}/> : <Pause size={16}/>}<span>{paused ? "Play" : "Pause"}</span></button></div>
      <p className="creatox-reel-caption">Brand stories, brought into focus.</p>
    </TiltedGridHero>
    <div className="creatox-reel-projects">{featuredProjects.map(project => <a key={project.id} href={`https://creatoxdesigns.com${project.link}`} className="creatox-work-card">
      <div className="creatox-work-cover"><img src={projectCoverImages[project.id] ?? project.image} alt={`${project.title} illustrative concept cover`} loading="lazy" width={740} height={555}/><span>{project.tags.join(" / ")}</span></div>
      <h3>{project.title}<ArrowUpRight size={22}/></h3><p>{project.description}</p><span className="creatox-work-link">View project <ArrowUpRight size={16}/></span>
    </a>)}</div>
    <footer className="creatox-works-footer"><span>Have something in mind?</span><a href="#contact">Let’s build your next chapter <ArrowUpRight size={20}/></a></footer>
  </section>;
}
