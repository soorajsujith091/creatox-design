"use client";

/* cms-native-links */
import { PageAnchor } from "@/components/cms/PageContent";
/* cms-page-fields */
import { PageText, PageLink } from "@/components/cms/PageContent";
import { motion, useReducedMotion } from "framer-motion";

import { ArrowUpRight } from "lucide-react";
import { stats, badges } from "@/data/stats";
import { SectionLabel } from "../SectionLabel";
import "./achievements.css";

const descriptions = [
  "Creative thinking, purposeful design and digital experiences. Growing with brands since 2019.",
  "Brand identities, websites and campaigns created to help businesses connect with people.",
  "Designers, strategists and developers bringing different skills to one shared purpose.",
];

export function Stats() {
  const reduced = useReducedMotion();
  const reveal = { hidden: { opacity: 0, y: reduced ? 0 : 32 }, visible: { opacity: 1, y: 0 } };
  const transition = { duration: reduced ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : .3 } } };
  return <section className="achievement-section site-gutter" aria-labelledby="achievement-heading">
    <motion.header className="achievement-header" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={stagger}>
      <div><motion.div variants={reveal} transition={transition}><SectionLabel text="ACHIEVEMENT" /></motion.div><motion.h2 variants={reveal} transition={transition} id="achievement-heading">Creative expertise<br />you can <span><PageText field="f7f3e45a6_1" section="Stats" label="Text">{"count on."}</PageText></span></motion.h2></div>
      <motion.div variants={reveal} transition={transition} className="achievement-intro"><p><PageText field="f7f3e45a6_2" section="Stats" label="Text">{"Behind every project is a team that cares. We combine creativity, strategy and technology to turn brand ambitions into meaningful experiences."}</PageText></p><PageLink field="f7f3e45a6_3" section="Stats" href="/about-us/" className="achievement-about"><PageText field="f7f3e45a6_4" section="Stats" label="Text">{"Meet Creatox "}</PageText><ArrowUpRight size={17} aria-hidden="true" /></PageLink></motion.div>
    </motion.header>
    <div className="achievement-cards">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} transition={transition} className="achievement-photo"><video src="/videos/3d-glass-rotating-transparent-cube-and-circle-2026-01-28-03-20-02-utc.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Rotating glass cube and circle animation" /></motion.div>
      {stats.slice(0, 3).map((stat, index) => <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} transition={{ ...transition, delay: reduced ? 0 : (index + 1) * .15 }} key={stat.label} className={`achievement-card achievement-stat achievement-stat-${index}`} aria-label={`${stat.value} ${stat.label}`}>
        <span className={`achievement-motif achievement-motif-${index}`} aria-hidden="true" />
        <p className="achievement-value"><PageText field="f7f3e45a6_5" section="Stats" label="Text">{stat.value}</PageText></p><h3><PageText field="f7f3e45a6_6" section="Stats" label="Heading">{stat.label}</PageText></h3><p className="achievement-detail"><PageText field="f7f3e45a6_7" section="Stats" label="Text">{descriptions[index]}</PageText></p>
      </motion.article>)}
      <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} transition={transition} className="achievement-card achievement-start">
        <span className="achievement-motif achievement-motif-3" aria-hidden="true" />
        <div className="achievement-partners"><span><PageText field="f7f3e45a6_8" section="Stats" label="Text">{stats[3].value}</PageText></span><span><PageText field="f7f3e45a6_9" section="Stats" label="Text">{"Industry partners"}</PageText></span></div>
        <h3><PageText field="f7f3e45a6_10" section="Stats" label="Heading">{"Let’s build"}</PageText><br /><PageText field="f7f3e45a6_11" section="Stats" label="Heading">{"your next chapter."}</PageText></h3><p className="achievement-detail"><PageText field="f7f3e45a6_12" section="Stats" label="Text">{"Bring your idea. We’ll bring the creative thinking to move it forward."}</PageText></p><PageAnchor field="anchor_31d99d111_1" section="Stats" href="#contact" className="achievement-start-link"><PageText field="f7f3e45a6_13" section="Stats" label="Text">{"Get started with us "}</PageText><ArrowUpRight size={18} aria-hidden="true" /></PageAnchor>
      </motion.article>
    </div>
    <motion.ul initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal} transition={transition} className="achievement-badges" aria-label="Partnerships and affiliations">{badges.map(badge => <li key={badge}><PageText field="f7f3e45a6_14" section="Stats" label="Text">{badge}</PageText></li>)}</motion.ul>
  </section>;
}
