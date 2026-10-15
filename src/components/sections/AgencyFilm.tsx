"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

export function AgencyFilm() {
  const reduceMotion = useReducedMotion();
  const reveal = { hidden: { opacity: 0, y: reduceMotion ? 0 : 32 }, visible: { opacity: 1, y: 0 } };
  return <ScrollExpandMedia
    mediaSrc="/videos/creatox%20profile%20website%20(2).mp4"
    posterSrc="/images/agency-runners.png"
    title="Creative thinking. Real impact."
    eyebrow="INSIDE CREATOX"
  >
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal} transition={{ duration: reduceMotion ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] }}>
      <h3>A creative digital agency in Kannur, Kerala.</h3>
      <p>We bring brand strategy, design, web development and digital marketing together to help businesses connect with their audience. From your first brand identity to your next campaign, we build experiences around your goals.</p>
    </motion.div>
    <motion.a initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal} transition={{ duration: reduceMotion ? 0 : 1.3, delay: reduceMotion ? 0 : .3, ease: [0.22, 1, 0.36, 1] }} className="creatox-film-link" href="#contact">Start a project <ArrowUpRight size={18} aria-hidden="true" /></motion.a>
  </ScrollExpandMedia>;
}
