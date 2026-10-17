"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import "./testimonials.css";

export function Testimonials() {
  const reduced = useReducedMotion();
  const reveal = { hidden: { opacity: 0, y: reduced ? 0 : 32 }, visible: { opacity: 1, y: 0 } };
  const revealTransition = { duration: reduced ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  const staticOnDesktop = testimonials.length < 4;
  const [emblaRef, api] = useEmblaCarousel({
    loop: true, align: "center", duration: reduced ? 0 : 35,
    breakpoints: { "(min-width: 1001px)": { active: !staticOnDesktop } },
  });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [story, setStory] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const previews = useRef<(HTMLVideoElement | null)[]>([]);
  const [audible, setAudible] = useState<number | null>(null);
  const toggleSound = (index: number) => {
    const next = audible === index ? null : index;
    previews.current.forEach((video, i) => {
      if (!video) return;
      video.muted = i !== next;
      if (i === next) void video.play().catch(() => {});
    });
    setAudible(next);
    setPaused(true);
  };
  const select = useCallback(() => { if (api) setSelected(api.selectedScrollSnap()); }, [api]);

  useEffect(() => {
    if (!api) return;
    select(); api.on("select", select); api.on("reInit", select);
    return () => { api.off("select", select); api.off("reInit", select); };
  }, [api, select]);
  useEffect(() => {
    if (!api || reduced || paused || interacting || story !== null) return;
    const timer = window.setInterval(() => {
      if (staticOnDesktop && window.matchMedia("(min-width: 1001px)").matches) return;
      if (!document.hidden) api.scrollNext();
    }, 6000);
    return () => window.clearInterval(timer);
  }, [api, reduced, paused, interacting, story, staticOnDesktop]);
  useEffect(() => { if (story !== null) dialog.current?.showModal(); else dialog.current?.close(); }, [story]);
  const navigate = (direction: number) => { setPaused(true); if (direction < 0) api?.scrollPrev(); else api?.scrollNext(); };

  return <section className={`client-stories${staticOnDesktop ? " client-stories-static-desktop" : ""}`} aria-labelledby="client-stories-title">
    <motion.header initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : .3 } } }}>
      <motion.span variants={reveal} transition={revealTransition} className="client-stories-eyebrow">/ CLIENT LOVE</motion.span>
      <motion.h2 variants={reveal} transition={revealTransition} id="client-stories-title">Why do ambitious brands<br/>love working with <span>Creatox?</span></motion.h2>
      <motion.p variants={reveal} transition={revealTransition}>Real feedback. Shared ambition. Lasting relationships.</motion.p>
    </motion.header>
    <div className="client-stories-carousel" role="region" aria-roledescription="carousel" aria-label="Client testimonials" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false); }} onKeyDown={e => { if (e.key === "ArrowLeft") { e.preventDefault(); navigate(-1); } if (e.key === "ArrowRight") { e.preventDefault(); navigate(1); } }}>
      <div className="client-stories-viewport" ref={emblaRef}>
        <div className="client-stories-track">{testimonials.map((item, index) => <article key={item.id} className={`client-story-slide ${selected === index ? "is-current" : ""}`} aria-roledescription="slide" aria-label={`${index + 1} of ${testimonials.length}`}>
          <button className="client-story-card" onClick={() => { setPaused(true); setAudible(null); previews.current.forEach(video => { if (video) video.muted = true; }); setStory(index); }} aria-label={`Watch ${item.title}`}>
            <video ref={element => { previews.current[index] = element; }} src={item.videoUrl} autoPlay muted={audible !== index} loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} className="client-story-preview"/>
            <span className="client-story-shade" aria-hidden="true"/>
            <span className="client-story-top"><span className="client-story-category">CLIENT TESTIMONIAL</span></span>
            <span className="client-story-bottom"><span className="client-story-quote">{item.title}</span><span className="client-story-action"><Play size={14} fill="currentColor"/> Watch testimonial</span></span>
          </button>
          <button type="button" className="client-story-sound" onClick={() => toggleSound(index)} aria-label={`${audible === index ? "Mute" : "Unmute"} ${item.title}`} aria-pressed={audible === index}>{audible === index ? <Volume2 size={18} aria-hidden="true"/> : <VolumeX size={18} aria-hidden="true"/>}</button>
        </article>)}</div>
      </div>
      <button className="client-story-arrow is-prev" onClick={() => navigate(-1)} aria-label="Previous testimonial"><ArrowLeft size={20}/></button>
      <button className="client-story-arrow is-next" onClick={() => navigate(1)} aria-label="Next testimonial"><ArrowRight size={20}/></button>
    </div>
    <div className="client-stories-controls"><div className="client-story-dots">{testimonials.map((item, i) => <button key={item.id} aria-label={`Show testimonial ${i + 1}`} aria-current={i === selected ? "true" : undefined} onClick={() => { setPaused(true); api?.scrollTo(i); }}><span className={i === selected ? "is-active" : ""}/></button>)}</div>{!reduced && <button className="client-story-pause" onClick={() => setPaused(!paused)} aria-label={paused ? "Play testimonials" : "Pause testimonials"}>{paused ? <Play size={15}/> : <Pause size={15}/>} {paused ? "Play" : "Pause"}</button>}</div>
    <dialog ref={dialog} className="client-story-dialog" onCancel={() => setStory(null)} onClose={() => { dialog.current?.querySelector("video")?.pause(); setStory(null); }} onClick={e => { if (e.target === e.currentTarget) setStory(null); }} data-lenis-prevent>{story !== null && <><button className="client-story-close" onClick={() => setStory(null)} aria-label="Close testimonial"><X size={22}/></button><span className="client-stories-eyebrow">/ CLIENT STORY</span><h3>{testimonials[story].title}</h3><video key={testimonials[story].videoUrl} src={testimonials[story].videoUrl} autoPlay controls playsInline preload="metadata" className="client-story-video" aria-label={testimonials[story].title}/><a href="#contact" onClick={() => setStory(null)}>Start your project <ArrowUpRight size={18}/></a></>}</dialog>
  </section>;
}
