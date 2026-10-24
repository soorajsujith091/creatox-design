"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Pause, Play } from "lucide-react";
import { Component as BrandGlowBackground } from "@/components/ui/background-components";
import "./scroll-expansion-hero.css";

interface ScrollExpandMediaProps {
  mediaSrc: string;
  posterSrc: string;
  title: string;
  eyebrow?: string;
  children?: ReactNode;
}

// Adapted from the supplied ScrollExpandMedia: progress follows this section
// without intercepting wheel/touch events or resetting the page scroll.
export default function ScrollExpandMedia({ mediaSrc, posterSrc, title, eyebrow, children }: ScrollExpandMediaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 24px", "end end"] });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [.58, 1]);
  const mediaRadius = useTransform(scrollYProgress, [0, 1], [32, 12]);
  const titleId = useId();
  const reduced = useReducedMotion();
  const reveal = { hidden: { opacity: 0, y: reduced ? 0 : 32 }, visible: { opacity: 1, y: 0 } };
  const revealTransition = { duration: reduced ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const prefersReducedMotion = mounted && reduced === true;
  const inView = useInView(pinRef, { margin: "100px" });
  const [paused, setPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [videoAspectRatio, setVideoAspectRatio] = useState(16 / 9);
  const playbackEnabled = mounted && !paused;
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const playWhenReady = () => {
      if (!inView || !playbackEnabled) return;
      video.muted = true;
      video.defaultMuted = true;
      // Source loading and effect cleanup can abort play(); that isn't a user pause.
      void video.play().catch(() => {});
    };
    video.addEventListener("canplay", playWhenReady);
    if (!inView || !playbackEnabled) video.pause();
    else playWhenReady();
    return () => video.removeEventListener("canplay", playWhenReady);
  }, [inView, playbackEnabled]);

  return <div className="creatox-film">
    <BrandGlowBackground className="pointer-events-none absolute inset-0 min-h-0" />
    <section ref={sectionRef} className="creatox-film-scroll" aria-labelledby={titleId}>
      <div className="creatox-film-sticky site-gutter">
        <motion.header className="creatox-film-header" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : .3 } } }}>
          <motion.span variants={reveal} transition={revealTransition} className="creatox-film-eyebrow">{eyebrow}</motion.span>
          <motion.h2 variants={reveal} transition={revealTransition} id={titleId}>{title}</motion.h2>
          <motion.p variants={reveal} transition={revealTransition}>Branding, websites and digital campaigns. Get to know the creative thinking behind Creatox Designs.</motion.p>
        </motion.header>
        <div ref={trackRef} className={`creatox-film-track${prefersReducedMotion ? " is-static" : ""}`}>
        <div ref={pinRef} className="creatox-film-pin">
        <motion.div className="creatox-film-media" style={{ aspectRatio: videoAspectRatio, maxWidth: `calc((100svh - 48px) * ${videoAspectRatio})`, width: "100%", scale: prefersReducedMotion ? 1 : mediaScale, borderRadius: prefersReducedMotion ? 12 : mediaRadius }}>
          <video
            ref={videoRef}
            src={mediaSrc}
            poster={posterSrc}
            autoPlay={inView && playbackEnabled} muted loop playsInline preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            aria-label="Creatox Designs agency profile film"
            onLoadedMetadata={event => {
              const { videoWidth, videoHeight } = event.currentTarget;
              if (videoWidth && videoHeight) setVideoAspectRatio(videoWidth / videoHeight);
            }}
            onError={() => setFailed(true)}
          />
          {!failed && <button className="creatox-film-control" type="button" onClick={() => {
            if (isPlaying) { setPaused(true); videoRef.current?.pause(); }
            else { setPaused(false); if (videoRef.current) { videoRef.current.muted = true; void videoRef.current.play().catch(() => {}); } }
          }} aria-label={isPlaying ? "Pause agency film" : "Play agency film"}>
            {isPlaying ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
            <span>{isPlaying ? "Pause film" : "Play film"}</span>
          </button>}
          {failed && <p className="creatox-film-error">The film is currently unavailable. Explore our services below.</p>}
        </motion.div>
        </div>
        </div>
        <p className="creatox-film-hint"><ArrowDown size={14} aria-hidden="true" /> Scroll to explore</p>
      </div>
    </section>
    <div className="creatox-film-copy site-gutter">{children}</div>
  </div>;
}
