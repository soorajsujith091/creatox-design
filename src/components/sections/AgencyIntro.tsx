"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Asterisk } from "lucide-react";
import { MagicText } from "@/components/ui/magic-text";
import dynamic from "next/dynamic";
const BrandRobot = dynamic(() => import("@/components/ui/brand-robot").then(module => module.BrandRobot), { ssr: false });
const BrandPerspectiveMarquee = dynamic(() => import("@/components/ui/brand-perspective-marquee").then(module => module.BrandPerspectiveMarquee), { ssr: false });
import "./agency-intro.css";

const partnerLogos = [
  { file: "Screenshot-2024-12-30-at-9.43.21-1.png", name: "First Vision Electronics Trading" },
  { file: "WhatsApp_Image_2026-04-28_at_3.55.04_PM-removebg-preview-1.png", name: "Bella Pets" },
  { file: "WhatsApp-Image-2026-04-28-at-3.55.06-PM.jpeg", name: "GTH" },
  { file: "logo-2-1-1.png", name: "TIMS Education" },
  { file: "logo-01__1_-removebg-preview-1.png", name: "Fathima Hospital" },
  { file: "KAMATH-2.png", name: "Kamath Ceramics" },
  { file: "Edutech-200px-1.png", name: "Edutech" },
  { file: "DCG-logo-02-1.png", name: "DCG" },
];

export function AgencyIntro() {
  const reduced = useReducedMotion();
  const about = useRef<HTMLElement>(null);
  const backgroundVideo = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = backgroundVideo.current;
    const section = about.current;
    if (!video || !section) return;
    let visible = false;
    const update = () => {
      if (reduced || !visible || document.hidden) video.pause();
      else void video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(section);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); video.pause(); };
  }, [reduced]);
  const { scrollYProgress } = useScroll({ target: about, offset: ["start start", "end end"] });
  const revealProgress = useTransform(scrollYProgress, [0, .75], [0, 1]);
  const videoBlur = useTransform(scrollYProgress, [0, .15, .65], ["blur(6px)", "blur(3px)", "blur(0px)"]);
  return <section ref={about} className={`agency-about-scroll${reduced ? " agency-about-static" : ""}`} aria-labelledby="agency-intro-heading">
  <div className="agency-intro agency-intro-about" onPointerMove={event => {
    if (reduced || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--about-art-x", `${((event.clientX - bounds.left) / bounds.width - .5) * 24}deg`);
    event.currentTarget.style.setProperty("--about-art-y", `${-((event.clientY - bounds.top) / bounds.height - .5) * 18}deg`);
  }} onPointerLeave={event => {
    event.currentTarget.style.removeProperty("--about-art-x");
    event.currentTarget.style.removeProperty("--about-art-y");
  }}>
    <div className="agency-about-art" aria-hidden="true"><motion.video style={{ filter: reduced ? "none" : videoBlur }} ref={backgroundVideo} src="/videos/about-creatox-metallic.mp4" poster="/images/about-chrome-sphere.jpeg" loop muted playsInline preload="metadata" tabIndex={-1} /></div>
    <motion.div className="agency-intro-copy" initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}>
      <span className="agency-intro-label">/ ABOUT CREATOX</span>
      <h2 id="agency-intro-heading"><Asterisk className="agency-intro-star" aria-hidden="true"/> <MagicText progress={revealProgress} text="We partner with ambitious brands and businesses to build meaningful identities, create better digital experiences, and turn ideas into growth."/></h2>
      <a href="#about">Meet Creatox <ArrowUpRight size={15}/></a>
    </motion.div>
  </div>
  </section>;
}

export function BrandsWorkedWith() {
  return <section className="agency-intro agency-intro-brands" aria-label="Brands we've worked with">
    <div className="agency-intro-partners" aria-label="Brands in our portfolio">
      <span className="agency-intro-label">BRANDS WE’VE WORKED WITH</span>
      <BrandPerspectiveMarquee items={partnerLogos} />
      <BrandRobot />
    </div>
  </section>;
}

