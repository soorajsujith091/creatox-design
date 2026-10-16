"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "./parallax-scroll-feature-section.css";

/** Adapted from the supplied parallax feature section; each row owns its hooks. */
export function ParallaxScrollFeature({ children, media, reverse = false, className = "" }: {
  children: ReactNode;
  media: ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center start"] });
  const opacity = useTransform(scrollYProgress, [0, .7], [0, 1]);
  const clipPath = useTransform(scrollYProgress, [0, .7], [reverse ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", "inset(0 0% 0 0%)"]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  return <article ref={ref} className={`event-feature ${reverse ? "event-feature-reverse" : ""} ${className}`}>
    <motion.div className="event-feature-copy" style={reduced ? undefined : { y }}>{children}</motion.div>
    <motion.div className="event-feature-media" style={reduced ? undefined : { opacity, clipPath }}>{media}</motion.div>
  </article>;
}
