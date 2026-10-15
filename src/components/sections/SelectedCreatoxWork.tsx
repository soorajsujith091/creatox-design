"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { projectCoverImages } from "@/data/project-cover-images";
import "./selected-work-gallery.css";

export function SelectedCreatoxWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const reveal = { hidden: { opacity: 0, y: reduced ? 0 : 32 }, visible: { opacity: 1, y: 0 } };
  const revealTransition = { duration: reduced ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  const [distance, setDistance] = useState(0);
  const [stage, setStage] = useState({ height: 564, top: 24 });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: [`start ${stage.top}px`, `end ${stage.height + stage.top}px`] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(frame);
  }, [distance, stage.height, stage.top, reduced]);

  useEffect(() => {
    const track = trackRef.current;
    const frame = frameRef.current;
    const sticky = stickyRef.current;
    if (!track || !frame || !sticky) return;
    const measure = () => {
      setDistance(Math.max(0, track.scrollWidth - frame.clientWidth));
      const height = sticky.offsetHeight;
      const top = parseFloat(getComputedStyle(sticky).top) || 0;
      setStage(previous => previous.height === height && previous.top === top ? previous : { height, top });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(frame);
    observer.observe(sticky);
    measure();
    return () => observer.disconnect();
  }, []);

  return <section id="work" className="selected-work-gallery" aria-labelledby="selected-work-heading">
    <motion.header className="selected-work-intro site-gutter" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : .3 } } }}>
      <motion.div variants={reveal} transition={revealTransition} className="selected-work-eyebrow"><span>/ SELECTED CREATOX WORK</span><a href="#services">DESIGN & DIGITAL SERVICES <ArrowUpRight size={14} aria-hidden="true" /></a></motion.div>
      <div className="selected-work-heading"><motion.h2 variants={reveal} transition={revealTransition} id="selected-work-heading">Good design.<br /><span>Real connections.</span></motion.h2><motion.p variants={reveal} transition={revealTransition}>We blend creativity, strategy and technology to build brands that look premium and perform with purpose.</motion.p></div>
      <motion.p variants={reveal} transition={revealTransition} className="selected-work-hint"><ArrowDown size={14} aria-hidden="true" /> Scroll to explore our work</motion.p>
    </motion.header>
    <div ref={containerRef} className="selected-work-scroll" style={reduced ? undefined : { height: stage.height + distance }}>
      <div ref={stickyRef} className="selected-work-sticky">
        <div ref={frameRef} className="selected-work-frame">
          <motion.div ref={trackRef} className="selected-work-track" style={{ x: reduced ? 0 : x }}>
            {projects.map((project, index) => <a className="selected-work-card" key={project.id} href={`https://creatoxdesigns.com${project.link}`} onFocus={event => {
              if (!event.currentTarget.matches(":focus-visible") || reduced || !containerRef.current || !frameRef.current) return;
              const top = containerRef.current.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: top - stage.top + Math.min(index * (event.currentTarget.offsetWidth + (window.innerWidth <= 600 ? 15 : 30)), distance), behavior: "instant" });
            }}>
              <Image src={projectCoverImages[project.id] ?? project.image} alt={`${project.title} project cover`} fill sizes="(max-width: 600px) 280px, 400px" unoptimized={!projectCoverImages[project.id]} />
              <div className="selected-work-card-shade" aria-hidden="true" />
              <span className="selected-work-card-arrow"><ArrowUpRight size={22} aria-hidden="true" /></span>
              <div className="selected-work-card-copy"><span className="selected-work-number">0{index + 1} / {project.tags.join(" + ")}</span><h3>{project.title}</h3><p>{project.description}</p></div>
            </a>)}
          </motion.div>
        </div>
      </div>
    </div>
    <footer className="selected-work-outro site-gutter"><span>YOUR NEXT CHAPTER STARTS HERE.</span><a href="#contact">Let&apos;s create something together <ArrowUpRight size={18} aria-hidden="true" /></a></footer>
  </section>;
}
