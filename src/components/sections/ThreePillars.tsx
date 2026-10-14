"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
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
    <div className="expertise-columns-grid">{disciplines.map((discipline, index) => <motion.article key={discipline.title} className={`expertise-column expertise-column-${index}`} initial={reduced ? false : { opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, delay: index * .12 }} onPointerMove={event => {
      if (reduced || event.pointerType === "touch") return;
      const bounds = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--butterfly-x", `${((event.clientX - bounds.left) / bounds.width - .5) * 24}deg`);
      event.currentTarget.style.setProperty("--butterfly-y", `${-((event.clientY - bounds.top) / bounds.height - .5) * 18}deg`);
    }} onPointerLeave={event => {
      event.currentTarget.style.removeProperty("--butterfly-x");
      event.currentTarget.style.removeProperty("--butterfly-y");
    }}>
      <div className="expertise-column-glow" aria-hidden="true"/>
      <div className="expertise-column-butterfly" aria-hidden="true">
        {index === 1 ? <div className="expertise-column-orb"><Image src="/images/build-transform-orb.jpeg" alt="" fill sizes="(max-width: 767px) 220px, 300px" /></div> : index === 2 ? <Image src={reduced ? "/images/market-grow-ring-still.png" : "/images/market-grow-ring.gif"} alt="" fill unoptimized sizes="(max-width: 767px) 220px, 300px" /> : <Image src={reduced ? "/images/expertise-papillon-still.png" : "/images/expertise-papillon.gif"} alt="" fill unoptimized sizes="(max-width: 767px) 80vw, 32vw" />}
      </div>
      <h2>{discipline.heading[0]}<br/>{discipline.heading[1]}</h2>
      <p>{discipline.description}</p>
      <a href={`https://creatoxdesigns.com${discipline.link}`}><span>{discipline.button}</span><span className="expertise-column-arrow" aria-hidden="true">↗</span></a>
    </motion.article>)}</div>
  </section>;
}
