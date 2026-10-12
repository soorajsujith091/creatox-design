"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects as creatoxProjects } from "@/data/projects";
import { projectCoverImages } from "@/data/project-cover-images";
import { NotchedProjectCard } from "@/components/ui/notched-project-card";
import "./reference-home.css";

export function SelectedCreatoxWork() {
  const reduced = useReducedMotion();
  const reveal = { initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: .75 } };
  return <div className="reference-home" style={{ padding: 0 }}>
      <section className="ref-trust" id="work" aria-label="Trusted by teams at scale">
        <div className="ref-eyebrows"><span>/ SELECTED CREATOX WORK</span><a href="#services">DESIGN & DIGITAL SERVICES <ArrowUpRight size={12}/></a></div>
        <div className="ref-trust-heading"><motion.h2 {...reveal}>GOOD DESIGN.<br/><span className="ref-inline-arrow">↗</span> REAL CONNECTIONS.</motion.h2><motion.p {...reveal}>We blend creativity, strategy and technology to build brands that <span>look premium and perform with purpose.</span></motion.p></div>
        <div className="ref-notched-grid">{creatoxProjects.slice(0, 3).map(project => <NotchedProjectCard
          key={project.id}
          href={`https://creatoxdesigns.com${project.link}`}
          title={project.title}
          description={project.description}
          image={projectCoverImages[project.id] ?? project.image}
          imageAlt={`${project.title} — generated illustrative concept cover`}
          badge={project.tags[0]}
          tags={project.tags}
          surface="#000000"
          accent="#e4002b"
          accentForeground="#ffffff"
          className="ref-notched-card"
        />)}</div>
        <div className="ref-trust-footer"><span>YOUR NEXT CHAPTER STARTS HERE.</span><a href="#contact">Let’s create something together <ArrowUpRight size={18}/></a></div>
      </section>
     
  </div>;
}
