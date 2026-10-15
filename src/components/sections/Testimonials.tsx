"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, X } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import "./testimonials.css";

const covers = ["/images/project-beverage-concept.png", "/images/project-hotel-concept.png", "/images/project-sports-concept.png", "/images/creatox-our-story.png", "/images/agency-runners.png"];
const headlines = ["Friendly, helpful and built around our business.", "Branding and a website that exceeded expectations.", "Professional from proposal to execution.", "A cohesive identity. A stronger online presence.", "Creative ideas and a supportive team."];
const labels = ["E-COMMERCE", "BRANDING", "PARTNERSHIP", "DIGITAL GROWTH", "CREATIVE DIRECTION"];

export function Testimonials() {
  const reduced = useReducedMotion();
  const reveal = { hidden: { opacity: 0, y: reduced ? 0 : 32 }, visible: { opacity: 1, y: 0 } };
  const revealTransition = { duration: reduced ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  const [emblaRef, api] = useEmblaCarousel({ loop: true, align: "center", duration: reduced ? 0 : 35 });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [story, setStory] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const select = useCallback(() => { if (api) setSelected(api.selectedScrollSnap()); }, [api]);

  useEffect(() => {
    if (!api) return;
    select(); api.on("select", select); api.on("reInit", select);
    return () => { api.off("select", select); api.off("reInit", select); };
  }, [api, select]);
  useEffect(() => {
    if (!api || reduced || paused || interacting || story !== null) return;
    const timer = window.setInterval(() => { if (!document.hidden) api.scrollNext(); }, 6000);
    return () => window.clearInterval(timer);
  }, [api, reduced, paused, interacting, story]);
  useEffect(() => { if (story !== null) dialog.current?.showModal(); else dialog.current?.close(); }, [story]);
  const navigate = (direction: number) => { setPaused(true); if (direction < 0) api?.scrollPrev(); else api?.scrollNext(); };

  return <section className="client-stories" aria-labelledby="client-stories-title">
    <motion.header initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : .3 } } }}>
      <motion.span variants={reveal} transition={revealTransition} className="client-stories-eyebrow">/ CLIENT LOVE</motion.span>
      <motion.h2 variants={reveal} transition={revealTransition} id="client-stories-title">Why do ambitious brands<br/>love working with <span>Creatox?</span></motion.h2>
      <motion.p variants={reveal} transition={revealTransition}>Real feedback. Shared ambition. Lasting relationships.</motion.p>
    </motion.header>
    <div className="client-stories-carousel" role="region" aria-roledescription="carousel" aria-label="Client testimonials" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false); }} onKeyDown={e => { if (e.key === "ArrowLeft") { e.preventDefault(); navigate(-1); } if (e.key === "ArrowRight") { e.preventDefault(); navigate(1); } }}>
      <div className="client-stories-viewport" ref={emblaRef}>
        <div className="client-stories-track">{testimonials.map((item, index) => <article key={item.id} className={`client-story-slide ${selected === index ? "is-current" : ""}`} aria-roledescription="slide" aria-label={`${index + 1} of ${testimonials.length}`}>
          <button className="client-story-card" onClick={() => { setPaused(true); setStory(index); }} aria-label={`Read testimonial from ${item.clientName}`}>
            <img src={covers[index]} alt="" loading="lazy" width={600} height={800}/>
            <span className="client-story-shade" aria-hidden="true"/>
            <span className="client-story-top"><span className="client-story-category">{labels[index]}</span><span className="client-story-business">{item.logoUrl ? <img src={item.logoUrl} alt={item.businessName ?? item.clientName}/> : <span>{item.businessName ?? (index === 1 ? "BEST WESTERN" : item.clientName)}</span>}</span></span>
            <span className="client-story-bottom"><span className="client-story-quote">{item.headline ?? headlines[index]}</span><span className="client-story-description">{item.quote}</span><span className="client-story-name">{item.clientName}</span><span className="client-story-role">{item.clientLabel}</span><span className="client-story-action">{item.videoUrl ? <><Play size={14} fill="currentColor"/> Play story {item.isDemoVideo && <span className="client-story-demo">DEMO</span>}</> : <>Read story <ArrowUpRight size={16}/></>}</span></span>
          </button>
        </article>)}</div>
      </div>
      <button className="client-story-arrow is-prev" onClick={() => navigate(-1)} aria-label="Previous testimonial"><ArrowLeft size={20}/></button>
      <button className="client-story-arrow is-next" onClick={() => navigate(1)} aria-label="Next testimonial"><ArrowRight size={20}/></button>
    </div>
    <div className="client-stories-controls"><div className="client-story-dots">{testimonials.map((item, i) => <button key={item.id} aria-label={`Show testimonial ${i + 1}`} aria-current={i === selected ? "true" : undefined} onClick={() => { setPaused(true); api?.scrollTo(i); }}><span className={i === selected ? "is-active" : ""}/></button>)}</div>{!reduced && <button className="client-story-pause" onClick={() => setPaused(!paused)} aria-label={paused ? "Play testimonials" : "Pause testimonials"}>{paused ? <Play size={15}/> : <Pause size={15}/>} {paused ? "Play" : "Pause"}</button>}</div>
    <dialog ref={dialog} className="client-story-dialog" onCancel={() => setStory(null)} onClose={() => { dialog.current?.querySelector("video")?.pause(); setStory(null); }} onClick={e => { if (e.target === e.currentTarget) setStory(null); }} data-lenis-prevent>{story !== null && <><button className="client-story-close" onClick={() => setStory(null)} aria-label="Close testimonial"><X size={22}/></button><span className="client-stories-eyebrow">/ CLIENT STORY</span>{testimonials[story].isDemoVideo && <p className="client-story-demo-note">Demo playback only. This sample video is not a client testimonial; the original recording will be added later.</p>}{testimonials[story].videoUrl && <video key={testimonials[story].videoUrl} src={testimonials[story].videoUrl} controls playsInline preload="metadata" className="client-story-video"/>}<blockquote>“{testimonials[story].quote}”</blockquote><strong>{testimonials[story].clientName}</strong><p>{testimonials[story].clientLabel}</p><a href="#contact" onClick={() => setStory(null)}>Start your project <ArrowUpRight size={18}/></a></>}</dialog>
  </section>;
}
