"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { SectionLabel } from "../SectionLabel";
import { stats } from "@/data/stats";
import "./our-story.css";

export function OurStory() {
  const reduced = useReducedMotion();
  const reveal = { hidden: { opacity: 0, y: reduced ? 0 : 32 }, visible: { opacity: 1, y: 0 } };
  const transition = { duration: reduced ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  return <section className="our-story site-gutter" aria-labelledby="our-story-heading">
    <motion.header className="our-story-header" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : .3 } } }}>
      <div><motion.div variants={reveal} transition={transition}><SectionLabel text="OUR STORY" /></motion.div><motion.h2 variants={reveal} transition={transition} id="our-story-heading">Creative at heart.<br /><span>Connected by purpose.</span></motion.h2></div>
      <motion.p variants={reveal} transition={transition}>Since 2019, we have brought design, strategy and digital thinking together to help brands find their voice. Built in Kannur. Made to connect.</motion.p>
    </motion.header>
    <div className="our-story-cards">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} transition={transition} className="our-story-experience">
        <Image src="/images/creatox-our-story.png" alt="Red sculptural ribbon surrounding a glass cube, symbolising creativity and connection" fill sizes="(max-width: 767px) 100vw, 32vw" />
        <dl className="our-story-stats">{stats.slice(0, 2).map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}</dl>
      </motion.div>
      <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} transition={{ ...transition, delay: reduced ? 0 : .3 }} className="our-story-statement">
        <div className="our-story-wordmark"><Sparkles size={24} aria-hidden="true" /><span>Creatox<span className="our-story-wordmark-dot">®</span></span></div>
        <p className="our-story-belief">Brands deserve more than visibility.<br />They deserve <span>a voice.</span></p>
        <p className="our-story-signature">Our belief, since 2019</p>
        <Link href="/about-us/" className="our-story-about">Discover our story <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </motion.article>
      <motion.figure initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} transition={{ ...transition, delay: reduced ? 0 : .6 }} className="our-story-team">
        <div className="our-story-team-photo"><Image src="/images/WhatsApp%20Image%202026-10-12%20at%2012.56.42%20PM.jpeg" alt="Creatox Designs team together at the Kannur office" fill sizes="(max-width: 767px) 100vw, 42vw" /></div>
        <figcaption><MapPin size={17} aria-hidden="true" /><span>Creative minds. Kannur, Kerala.</span><ArrowUpRight size={18} aria-hidden="true" /></figcaption>
      </motion.figure>
    </div>
  </section>;
}
