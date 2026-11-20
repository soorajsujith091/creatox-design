"use client";

/* cms-page-fields */
import { PageText, PageNativeImage, PageLink, PageImage } from "@/components/cms/PageContent";

import { CmsImage } from "@/components/CmsImage";
import { motion, useReducedMotion } from "framer-motion";

import { ArrowUpRight, MapPin } from "lucide-react";
import { SectionLabel } from "../SectionLabel";
import { stats } from "@/data/stats";
import "./our-story.css";

export function OurStory() {
  const reduced = useReducedMotion();
  const reveal = { hidden: { opacity: 0, y: reduced ? 0 : 32 }, visible: { opacity: 1, y: 0 } };
  const transition = { duration: reduced ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  return <section className="our-story site-gutter" aria-labelledby="our-story-heading">
    <motion.header className="our-story-header" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : .3 } } }}>
      <div><motion.div variants={reveal} transition={transition}><SectionLabel text="OUR STORY" /></motion.div><motion.h2 variants={reveal} transition={transition} id="our-story-heading">Creative at heart.<br /><span><PageText field="25ac7948b_1" section="Our Story" label="Text">{"Connected by purpose."}</PageText></span></motion.h2></div>
      <motion.p variants={reveal} transition={transition}>Since 2019, we have brought design, strategy and digital thinking together to help brands find their voice. Built in Kannur. Made to connect.</motion.p>
    </motion.header>
    <div className="our-story-cards">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} transition={transition} className="our-story-experience">
        <CmsImage slot="our_story" src="/images/creatox-our-story.png" alt="Red sculptural ribbon surrounding a glass cube, symbolising creativity and connection" fill sizes="(max-width: 767px) 100vw, 32vw" />
        <dl className="our-story-stats">{stats.slice(0, 2).map(stat => <div key={stat.label}><dt><PageText field="25ac7948b_2" section="Our Story" label="Text">{stat.label}</PageText></dt><dd><PageText field="25ac7948b_3" section="Our Story" label="Text">{stat.value}</PageText></dd></div>)}</dl>
      </motion.div>
      <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} transition={{ ...transition, delay: reduced ? 0 : .3 }} className="our-story-statement">
        <div className="our-story-wordmark"><PageNativeImage field="25ac7948b_4" section="Our Story" src="/images/Logo%20copy-Photoroom.png" alt="Creatox Designs" className="our-story-logo" /></div>
        <p className="our-story-belief"><PageText field="25ac7948b_5" section="Our Story" label="Text">{"Brands deserve more than visibility."}</PageText><br /><PageText field="25ac7948b_6" section="Our Story" label="Text">{"They deserve "}</PageText><span><PageText field="25ac7948b_7" section="Our Story" label="Text">{"a voice."}</PageText></span></p>
        <p className="our-story-signature"><PageText field="25ac7948b_8" section="Our Story" label="Text">{"Our belief, since 2019"}</PageText></p>
        <PageLink field="25ac7948b_9" section="Our Story" href="/about-us/" className="our-story-about"><PageText field="25ac7948b_10" section="Our Story" label="Text">{"Discover our story "}</PageText><ArrowUpRight size={18} aria-hidden="true" /></PageLink>
      </motion.article>
      <motion.figure initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} transition={{ ...transition, delay: reduced ? 0 : .6 }} className="our-story-team">
        <div className="our-story-team-photo"><PageImage field="25ac7948b_11" section="Our Story" src="/images/WhatsApp%20Image%202026-10-12%20at%2012.56.42%20PM.jpeg" alt="Creatox Designs team together at the Kannur office" fill sizes="(max-width: 767px) 100vw, 42vw" /></div>
        <figcaption><MapPin size={17} aria-hidden="true" /><span><PageText field="25ac7948b_12" section="Our Story" label="Text">{"Creative minds. Kannur, Kerala."}</PageText></span><ArrowUpRight size={18} aria-hidden="true" /></figcaption>
      </motion.figure>
    </div>
  </section>;
}
