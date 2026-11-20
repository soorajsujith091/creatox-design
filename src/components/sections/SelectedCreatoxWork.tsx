"use client";

/* cms-native-links */
import { PageAnchor } from "@/components/cms/PageContent";
/* cms-page-fields */
import { PageText, PageImage } from "@/components/cms/PageContent";
import { useEffect, useRef, useState } from "react";

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
    <div ref={containerRef} className="selected-work-scroll" style={reduced ? undefined : { height: stage.height + distance }}>
      <div ref={stickyRef} className="selected-work-sticky">
    <motion.header className="selected-work-intro site-gutter" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : .3 } } }}>
      <motion.div variants={reveal} transition={revealTransition} className="selected-work-eyebrow"><span><PageText field="ddc9870e9_1" section="Selected Creatox Work" label="Text">{"/ SELECTED CREATOX WORK"}</PageText></span><PageAnchor field="anchor_373817ea2_1" section="SelectedCreatoxWork" href="#services"><PageText field="ddc9870e9_2" section="Selected Creatox Work" label="Text">{"DESIGN & DIGITAL SERVICES "}</PageText><ArrowUpRight size={14} aria-hidden="true" /></PageAnchor></motion.div>
      <div className="selected-work-heading"><motion.h2 variants={reveal} transition={revealTransition} id="selected-work-heading">Good design.<br /><span><PageText field="ddc9870e9_3" section="Selected Creatox Work" label="Text">{"Real connections."}</PageText></span></motion.h2><motion.p variants={reveal} transition={revealTransition}>We blend creativity, strategy and technology to build brands that look premium and perform with purpose.</motion.p></div>
      <motion.p variants={reveal} transition={revealTransition} className="selected-work-hint"><ArrowDown size={14} aria-hidden="true" /> Scroll to explore our work</motion.p>
    </motion.header>

        <div ref={frameRef} className="selected-work-frame">
          <motion.div ref={trackRef} className="selected-work-track" style={{ x: reduced ? 0 : x }}>
            {projects.map((project, index) => <PageAnchor field="anchor_373817ea2_2" section="SelectedCreatoxWork" className="selected-work-card" key={project.id} href={`https://creatoxdesigns.com${project.link}`} onFocus={event => {
              if (window.innerWidth <= 767 || !event.currentTarget.matches(":focus-visible") || reduced || !containerRef.current || !frameRef.current) return;
              const top = containerRef.current.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: top - stage.top + Math.min(index * (event.currentTarget.offsetWidth + (window.innerWidth <= 600 ? 15 : 30)), distance), behavior: "instant" });
            }}>
              <PageImage field="ddc9870e9_4" section="Selected Creatox Work" src={projectCoverImages[project.id] ?? project.image} alt={`${project.title} project cover`} fill sizes="(max-width: 600px) 280px, 400px" unoptimized={!projectCoverImages[project.id]} />
              <div className="selected-work-card-shade" aria-hidden="true" />
              <span className="selected-work-card-arrow"><ArrowUpRight size={22} aria-hidden="true" /></span>
              <div className="selected-work-card-copy"><span className="selected-work-number"><PageText field="ddc9870e9_5" section="Selected Creatox Work" label="Text">{"0"}</PageText><PageText field="ddc9870e9_6" section="Selected Creatox Work" label="Text">{index + 1}</PageText> <PageText field="ddc9870e9_7" section="Selected Creatox Work" label="Text">{"/ "}</PageText><PageText field="ddc9870e9_8" section="Selected Creatox Work" label="Text">{project.tags.join(" + ")}</PageText></span><h3><PageText field="ddc9870e9_9" section="Selected Creatox Work" label="Heading">{project.title}</PageText></h3><p><PageText field="ddc9870e9_10" section="Selected Creatox Work" label="Text">{project.description}</PageText></p></div>
            </PageAnchor>)}
          </motion.div>
        </div>
      </div>
    </div>
    <footer className="selected-work-outro site-gutter"><span><PageText field="ddc9870e9_11" section="Selected Creatox Work" label="Text">{"YOUR NEXT CHAPTER STARTS HERE."}</PageText></span><PageAnchor field="anchor_373817ea2_3" section="SelectedCreatoxWork" href="#contact"><PageText field="ddc9870e9_12" section="Selected Creatox Work" label="Text">{"Let's create something together "}</PageText><ArrowUpRight size={18} aria-hidden="true" /></PageAnchor></footer>
  </section>;
}
