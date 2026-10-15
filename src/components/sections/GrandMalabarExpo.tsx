"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "../SectionLabel";
import "./grand-malabar-expo.css";

const expoImage = "https://creatoxdesigns.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-24-at-5.15.02-PM.jpeg";

export function GrandMalabarExpo() {
  const reduceMotion = useReducedMotion();
  const reveal = { hidden: { opacity: 0, y: reduceMotion ? 0 : 32 }, visible: { opacity: 1, y: 0 } };
  const [imageFailed, setImageFailed] = useState(false);
  const image = imageFailed ? "/images/project-sports-concept.png" : expoImage;
  const imageAlt = imageFailed ? "Illustrative event campaign concept" : "Grand Malabar Expo 2025 event";
  return <section className="malabar-feature expo-feature site-gutter" aria-labelledby="malabar-heading">
    <motion.div className="malabar-feature-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : .3 } } }}>
      <motion.div className="malabar-main-image malabar-reveal" variants={reveal} transition={{ duration: reduceMotion ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] }}>
        <Image src={image} alt={imageAlt} fill unoptimized={!imageFailed} sizes="(max-width: 767px) 100vw, 42vw" onError={() => setImageFailed(true)} />
        <span className="malabar-image-caption">GRAND MALABAR EXPO / 2025</span>
      </motion.div>
      <div className="malabar-content">
        <motion.div className="malabar-reveal" variants={reveal} transition={{ duration: reduceMotion ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] }}>
          <SectionLabel text="GRAND MALABAR EXPO" />
          <h2 id="malabar-heading">Bringing people<br />and brands<br /><span>together.</span></h2>
          <p className="malabar-description">As the official social media partner for Grand Malabar Expo 2025, Creatox helped the event connect with audiences through creative content, digital campaigns and continuous visitor engagement.</p>
        </motion.div>
        <motion.div className="malabar-highlights malabar-reveal" variants={reveal} transition={{ duration: reduceMotion ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] }}>
          <dl className="malabar-stats"><div><dt>Happy visitors</dt><dd>1L+</dd></div><div><dt>Views</dt><dd>21M+</dd></div></dl>
          <div className="malabar-detail-image"><Image src="/images/Screenshot%202026-10-15%20105038.png" alt="" fill sizes="(max-width: 767px) 40vw, 20vw" /></div>
        </motion.div>
        <Link href="/grand-malabar-expo/" className="malabar-link">Explore the partnership <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </motion.div>
  </section>;
}
