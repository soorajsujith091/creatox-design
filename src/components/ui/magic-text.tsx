"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

export interface MagicTextProps {
  text: string;
}

function Word({ text, progress, range, reduced }: { text: string; progress: MotionValue<number>; range: [number, number]; reduced: boolean }) {
  const opacity = useTransform(progress, range, [0, 1]);
  return <span style={{ position: "relative", display: "inline-block" }}>
    <span aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: .2 }}>{text}</span>
    <motion.span style={{ opacity: reduced ? 1 : opacity }}>{text}</motion.span>
  </span>;
}

/** Uses the existing Framer Motion dependency and inherits section typography. */
export function MagicText({ text }: MagicTextProps) {
  const container = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: container, offset: ["start 0.9", "start 0.25"] });
  const words = text.trim().split(/\s+/);
  return <span ref={container} className="magic-text" style={{ color: "inherit" }}>
    {words.map((word, i) => <span key={i}><Word text={word} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} reduced={!!reduced}/>{i < words.length - 1 ? " " : ""}</span>)}
  </span>;
}
