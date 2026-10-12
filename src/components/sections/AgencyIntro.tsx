"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Asterisk } from "lucide-react";
import { projects } from "@/data/projects";
import { MagicText } from "@/components/ui/magic-text";
import dynamic from "next/dynamic";
const BrandRobot = dynamic(() => import("@/components/ui/brand-robot").then(module => module.BrandRobot), { ssr: false });
import "./agency-intro.css";

export function AgencyIntro() {
  const reduced = useReducedMotion();
  return <section className="agency-intro" aria-labelledby="agency-intro-heading">
    <motion.div className="agency-intro-copy" initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}>
      <span className="agency-intro-label">/ ABOUT CREATOX</span>
      <h2 id="agency-intro-heading"><Asterisk className="agency-intro-star" aria-hidden="true"/> <MagicText text="We partner with ambitious brands and businesses to build meaningful identities, create better digital experiences, and turn ideas into growth."/></h2>
      <a href="#about">Meet Creatox <ArrowUpRight size={15}/></a>
    </motion.div>
    <div className="agency-intro-partners" aria-label="Brands in our portfolio">
      <span className="agency-intro-label">BRANDS WE’VE WORKED WITH</span>
      <div className="agency-intro-marquee"><div className="agency-intro-track">{[0, 1].map(copy => <div className="agency-intro-brand-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>{projects.map(project => <span className="agency-intro-brand" key={project.id}><span aria-hidden="true">✳</span>{project.title}</span>)}</div>)}</div></div>
      <BrandRobot />
    </div>
  </section>;
}
