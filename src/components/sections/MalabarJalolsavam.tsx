"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "../SectionLabel";
import "./grand-malabar-expo.css";

const campaignImage = "/images/Creatox%20x%20jalolsavam%20copy.jpg.jpeg";
const reveal = { hidden: { opacity: 0 }, visible: { opacity: 1 } };

export function MalabarJalolsavam() {
  return (
    <section className="malabar-feature jalolsavam-feature site-gutter" aria-labelledby="jalolsavam-heading">
      <motion.div className="malabar-feature-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} transition={{ staggerChildren: .12 }}>
        <motion.div className="malabar-main-image jalolsavam-main-image malabar-reveal" variants={reveal} transition={{ duration: .65 }}>
          <Image src={campaignImage} alt="Creatox campaign for Malabar Jalolsavam 2026, featuring snake boats, social media creatives and 5 million plus views" fill sizes="(max-width: 767px) 100vw, 42vw" />
          <span className="malabar-image-caption">MALABAR JALOLSAVAM / 2026</span>
        </motion.div>
        <div className="malabar-content">
          <motion.div className="malabar-reveal" variants={reveal} transition={{ duration: .65 }}>
            <SectionLabel text="MALABAR JALOLSAVAM" />
            <h2 id="jalolsavam-heading">Making waves.<br />Reaching<br /><span>millions.</span></h2>
            <p className="malabar-description">For Malabar Jalolsavam 2026, Creatox brought the excitement of the boat race to social media. Creative content and digital promotion helped Navodaya Mangalassery reach audiences far beyond the venue.</p>
          </motion.div>
          <motion.div className="malabar-highlights malabar-reveal" variants={reveal} transition={{ duration: .65 }}>
            <dl className="malabar-stats">
              <div><dt>Content views</dt><dd>5M+</dd></div>
              <div><dt>Malabar Jalolsavam</dt><dd>2026</dd></div>
            </dl>
            <div className="malabar-detail-image jalolsavam-detail-image"><Image src="/images/Screenshot%202026-10-14%20111858-Photoroom.png" alt="Malabar Jalolsavam 2026 — Navodaya Mangalassery logo" fill sizes="(max-width: 767px) 40vw, 20vw" /></div>
          </motion.div>
          <a href={campaignImage} target="_blank" rel="noopener noreferrer" className="malabar-link">View the campaign <ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
        </div>
      </motion.div>
    </section>
  );
}
