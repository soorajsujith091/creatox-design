"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Pause, Play } from "lucide-react";
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
  const mediaRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const reduced = useReducedMotion();
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
    if (!mounted || reduced !== false || !pinRef.current || !mediaRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(mediaRef.current,
        { width: () => window.innerWidth < 768 ? "85%" : "58%", borderRadius: 32 },
        {
          width: "100%", borderRadius: 12, ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top 24px",
            end: () => `+=${window.innerHeight * (window.innerWidth < 768 ? 1 : 1.6)}`,
            pin: true, pinSpacing: true, scrub: 1.2,
            refreshPriority: 10,
            anticipatePin: 1, invalidateOnRefresh: true,
          },
        });
    }, sectionRef);
    const refreshFrame = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
    return () => { cancelAnimationFrame(refreshFrame); context.revert(); };
  }, [mounted, reduced, videoAspectRatio]);

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
    <section ref={sectionRef} className="creatox-film-scroll" aria-labelledby={titleId}>
      <div className="creatox-film-sticky site-gutter">
        <header className="creatox-film-header">
          <span className="creatox-film-eyebrow">{eyebrow}</span>
          <h2 id={titleId}>{title}</h2>
          <p>Branding, websites and digital campaigns. Get to know the creative thinking behind Creatox Designs.</p>
        </header>
        <div ref={pinRef} className="creatox-film-pin" style={{ aspectRatio: videoAspectRatio }}>
        <div ref={mediaRef} className="creatox-film-media" style={{ aspectRatio: videoAspectRatio, ...(prefersReducedMotion ? { width: "100%", borderRadius: 12 } : {}) }}>
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
        </div>
        </div>
        <p className="creatox-film-hint"><ArrowDown size={14} aria-hidden="true" /> Scroll to explore</p>
      </div>
    </section>
    <div className="creatox-film-copy site-gutter">{children}</div>
  </div>;
}
