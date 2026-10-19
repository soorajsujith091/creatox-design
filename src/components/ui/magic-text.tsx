"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

export interface MagicTextProps {
  text: string;
  progress?: MotionValue<number>;
  highlightedPhrases?: string[];
}

function Word({ text, progress, range, reduced }: { text: string; progress: MotionValue<number>; range: [number, number]; reduced: boolean }) {
  const opacity = useTransform(progress, range, [.2, 1]);
  return <motion.span style={{ display: "inline-block", opacity: reduced ? 1 : opacity }}>{text}</motion.span>;
}

/** Uses the existing Framer Motion dependency and inherits section typography. */
export function MagicText({ text, progress, highlightedPhrases = [] }: MagicTextProps) {
  const container = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: container, offset: ["start 0.9", "start 0.25"] });
  const words = text.trim().split(/\s+/);
  const highlightedWords = new Set<number>();
  highlightedPhrases.forEach(phrase => {
    const phraseWords = phrase.trim().split(/\s+/);
    words.forEach((_, index) => {
      if (phraseWords.every((word, offset) => words[index + offset] === word)) {
        phraseWords.forEach((_, offset) => highlightedWords.add(index + offset));
      }
    });
  });
  return <span ref={container} className="magic-text" style={{ color: "inherit" }}>
    {words.map((word, i) => <span key={i} className={highlightedWords.has(i) ? "magic-text-highlight" : undefined}><Word text={word} progress={progress ?? scrollYProgress} range={[i / words.length, (i + 1) / words.length]} reduced={!!reduced}/>{i < words.length - 1 ? " " : ""}</span>)}
  </span>;
}
