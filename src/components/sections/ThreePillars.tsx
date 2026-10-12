"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pillars } from "@/data/services";
import { SectionLabel } from "../SectionLabel";
import "./three-pillars.css";

const disciplines = [
  { ...pillars[0], heading: ["Design", "& Experience"], button: "Branding & Design Services" },
  { ...pillars[2], heading: ["Build", "& Transform"], button: "Web Development Services" },
  { ...pillars[1], heading: ["Market", "& Grow"], button: "Digital Marketing Services" },
];

export function ThreePillars() {
  const reduced = useReducedMotion();
  return <section className="expertise-columns" aria-label="What We Do">
    <div className="expertise-columns-label"><SectionLabel text="WHAT WE DO"/></div>
    <div className="expertise-columns-grid">{disciplines.map((discipline, index) => <motion.article key={discipline.title} className={`expertise-column expertise-column-${index}`} initial={reduced ? false : { opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, delay: index * .12 }}>
      <div className="expertise-column-glow" aria-hidden="true"/>
      <h2>{discipline.heading[0]}<br/>{discipline.heading[1]}</h2>
      <p>{discipline.description}</p>
      <a href={`https://creatoxdesigns.com${discipline.link}`}>{discipline.button}</a>
    </motion.article>)}</div>
  </section>;
}
