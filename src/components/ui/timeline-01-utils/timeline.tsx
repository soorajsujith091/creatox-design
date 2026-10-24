"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface TimelineItem {
  title: string;
  heading: string;
  description: string;
  date: string;
  image: string;
  imageAlt: string;
  fallbackImage?: string;
  href: string;
  linkLabel: string;
  stats: { label: string; value: string }[];
}

function EventImage({ item }: { item: TimelineItem }) {
  const [failed, setFailed] = useState(false);
  const image = failed && item.fallbackImage ? item.fallbackImage : item.image;
  return <div className="event-timeline-image"><Image src={image} alt={failed ? "Illustrative event campaign concept" : item.imageAlt} fill sizes="(max-width: 767px) 90vw, 40vw" unoptimized={image.startsWith("https:")} onError={() => setFailed(true)} /></div>;
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
  const reduced = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 0.8", "end 0.6"] });
  const markerTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return <div ref={track} className="event-timeline-track">
    <motion.div aria-hidden="true" className="event-timeline-progress" style={{ scaleY: reduced ? 1 : scrollYProgress }} />
    {!reduced && <motion.div aria-hidden="true" className="event-timeline-marker" style={{ top: markerTop }} />}
    <ol className="event-timeline-list">{items.map(item => <li key={item.title} className="event-timeline-entry">
    <div className="event-timeline-date"><span aria-hidden="true" className="event-timeline-dot" /><span className="event-timeline-year">{item.date}</span></div>
    <motion.article initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .6 }} className="event-timeline-content">
      <div className="event-timeline-copy"><p className="event-timeline-label">[ {item.title} ]</p><h3>{item.heading}</h3><p className="event-timeline-description">{item.description}</p>
        <dl className="event-timeline-stats">{item.stats.map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}</dl>
        <a href={item.href} className="event-timeline-link">{item.linkLabel}<ArrowUpRight size={18} aria-hidden="true" /></a>
      </div>
      <EventImage item={item} />
    </motion.article>
  </li>)}</ol></div>;
}
