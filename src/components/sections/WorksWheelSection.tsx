"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  const reduced = useReducedMotion();
  const reveal = { hidden: { opacity: 0, y: reduced ? 0 : 32 }, visible: { opacity: 1, y: 0 } };
  const transition = { duration: reduced ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  return <section id="selected-work" className="creatox-works" aria-labelledby="creatox-works-heading">
    <motion.header className="creatox-works-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : .3 } } }}>
      <div><motion.span variants={reveal} transition={transition} className="creatox-works-eyebrow">/ SELECTED WORK</motion.span><motion.h2 variants={reveal} transition={transition} id="creatox-works-heading">Work that <span>speaks.</span></motion.h2></div>
      <motion.p variants={reveal} transition={transition}>From Kannur to the world — brands we’ve built.<br/>Branding, websites and digital campaigns with purpose.</motion.p>
    </motion.header>
    <TiltedGridHero images={images} speed={6} tileHeight={46} aspectRatio={4 / 3} curve={65} axis={53} fade={10} className={`creatox-tilted-reel ${paused ? "is-paused" : ""}`}>
      <div className="creatox-reel-top"><span>CREATIVITY IN EVERY DIRECTION.</span><button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play project reel" : "Pause project reel"} aria-pressed={paused}>{paused ? <Play size={16}/> : <Pause size={16}/>}<span>{paused ? "Play" : "Pause"}</span></button></div>
      <p className="creatox-reel-caption">Brand stories, brought into focus.</p>
    </TiltedGridHero>
    <footer className="creatox-works-footer"><span>Have something in mind?</span><a href="/contact-us/">Let’s build your next chapter <ArrowUpRight size={20}/></a></footer>
  </section>;
}
