"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, X, Plus } from "lucide-react";
import { companyInfo } from "@/data/stats";
import { projects as creatoxProjects } from "@/data/projects";
import { projectCoverImages } from "@/data/project-cover-images";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
import { BrandLogo } from "@/components/BrandLogo";
import { StickyScrollStack } from "@/components/ui/sticky-scroll-stack";
import { AgencyIntro } from "@/components/sections/AgencyIntro";
import "./reference-home.css";
import "./mobile-menu.css";

// Local adaptation of Bundui's 21st.dev Magnetic Button interaction:
// https://21st.dev/community/components/bundui/magnetic-button/default
function MagneticButton({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  return <motion.div className="ref-magnetic" animate={position} transition={{ type: "spring", stiffness: 180, damping: 15 }} onMouseMove={e => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    setPosition({ x: (e.clientX - r.left - r.width / 2) * .2, y: (e.clientY - r.top - r.height / 2) * .2 });
  }} onMouseLeave={() => setPosition({ x: 0, y: 0 })}>{children}</motion.div>;
}

function Mark({ className = "" }: { className?: string }) {
  return <svg className={`ref-mark ${className}`} viewBox="0 0 48 48" fill="currentColor" aria-hidden="true"><path d="M5 4h17v17H5zM26 27h17v17H26zM26 4h17v17H26zM5 27h17v17H5z"/><path d="M5 21 22 4h4v23L9 44H5zM26 4h4l13 13v10H26z"/></svg>;
}

const projects = creatoxProjects.slice(0, 3).map(project => ({
  title: project.title, tag: project.tags[0], headline: project.tags.join(" + "),
  image: projectCoverImages[project.id] ?? project.image, detail: project.description, foot: "View project details",
}));

export function ReferenceHome({ children }: { children?: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!menu) return;
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenu(false); document.querySelector<HTMLButtonElement>('[aria-controls="ref-menu"]')?.focus(); } };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menu]);
  useEffect(() => { if (active !== null) dialog.current?.showModal(); else dialog.current?.close(); }, [active]);
  const reveal = { initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: .75 } };
  return <ParallaxComponent><div className="reference-home" id="home">
    <StickyScrollStack className="ref-frame">
      <section className="ref-hero" data-parallax-layers aria-label="Creatox creative digital agency">
        <div className="ref-hero-photo" data-parallax-layer="1" />
        <nav className="ref-nav" aria-label="Homepage navigation">
          <a className="ref-brand-link" href="#home" aria-label="Creatox Designs home"><BrandLogo className="ref-brand-logo" priority /></a>
          <div className="ref-nav-links"><a href="#services">Services</a><a href="#selected-work">Our work</a><a href="#about">About us</a></div>
          <span className="ref-date">CRAFTED WITH LOVE<br/>Kannur, Kerala · Since 2019</span>
          <a className="ref-nav-cta" href="#contact">Let’s talk<span className="ref-black-dot"><ArrowUpRight size={14}/></span></a>
          <button className="ref-logo" aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu} aria-controls="ref-menu" onClick={() => setMenu(!menu)}>
            <motion.svg width="23" height="23" viewBox="0 0 23 23" initial={false} animate={menu ? "open" : "closed"} aria-hidden="true">
              <motion.path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" variants={{ closed: { d: "M 2 3 L 21 3" }, open: { d: "M 4 4 L 19 19" } }} transition={{ duration: reduced ? 0 : .25 }} />
              <motion.path d="M 2 11.5 L 21 11.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} transition={{ duration: reduced ? 0 : .1 }} />
              <motion.path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" variants={{ closed: { d: "M 2 20 L 21 20" }, open: { d: "M 4 19 L 19 4" } }} transition={{ duration: reduced ? 0 : .25 }} />
            </motion.svg>
          </button>
        </nav>
        <AnimatePresence>{menu && <motion.div id="ref-menu" className="ref-menu" initial="closed" animate="open" exit="closed" variants={{ closed: { clipPath: "circle(0px at calc(100% - 24px) 0px)", transition: { duration: reduced ? 0 : .3, when: "afterChildren" } }, open: { clipPath: "circle(150% at calc(100% - 24px) 0px)", transition: { duration: reduced ? 0 : .5, staggerChildren: reduced ? 0 : .07, delayChildren: reduced ? 0 : .15 } } }}>{[["Services", "services"], ["About Creatox", "about"], ["Our work", "selected-work"], ["Testimonials", "testimonials"], ["Start a project", "contact"]].map(([text, id], index) => <motion.a key={id} href={`#${id}`} onClick={() => setMenu(false)} variants={{ closed: { y: reduced ? 0 : 24, opacity: 0 }, open: { y: 0, opacity: 1 } }} transition={{ duration: reduced ? 0 : .25 }} whileHover={reduced ? {} : { x: 4 }} whileTap={reduced ? {} : { scale: .98 }}><span className="ref-menu-number" aria-hidden="true">0{index + 1}</span><span className="ref-menu-text">{text}</span><ArrowUpRight size={18}/></motion.a>)}</motion.div>}</AnimatePresence>
        <div data-parallax-layer="3"><motion.h1 {...reveal} className="ref-title"><span>CREATIVE</span><span className="ref-title-second">DIGITAL <Mark className="ref-orange"/> AGENCY</span></motion.h1></div>
        <a className="ref-rating" href="#testimonials" aria-label="Read client testimonials"><span>DESIGN. DIGITAL. GROWTH.</span><small>Creative thinking. Purposeful results.</small></a>
        <div className="ref-hero-middle" data-parallax-layer="2"><p>Brand identities, websites and campaigns<br/>that help your business connect and grow.<br/><span>Made with love in Kannur, Kerala.</span></p><div className="ref-actions"><MagneticButton><a className="ref-button ref-dark-button" href="#contact">Start a project <span><ArrowRight size={20}/></span></a></MagneticButton><MagneticButton><a className="ref-button ref-white-button" href="#selected-work">Explore our work</a></MagneticButton></div></div>
        <div className="ref-hero-bottom" data-parallax-layer="4"><a className="ref-stat-card" href="#about"><span className="ref-stat-symbol"><BrandLogo className="w-full px-2 py-2" /></span><span>6+ years of creativity<br/>1k+ successful projects<span className="ref-stat-arrows"><ArrowRight size={15}/></span></span></a><div className="ref-mini-cards"><a className="ref-mini ref-mini-dark" href="#work"><BrandLogo className="w-full px-2 py-2" /><span>Branding. Websites.<br/>Social media.<br/>Built around you.</span></a><button className="ref-mini ref-mini-nature" aria-label="Explore Desham Brings project" onClick={() => setActive(1)}><span>BRAND<br/>STRATEGY</span><ArrowUpRight size={20}/></button><button className="ref-mini ref-mini-yellow" aria-label="Explore Best Western Plus project" onClick={() => setActive(0)}><span>CREATE.<br/>CONNECT.<br/>GROW.</span><Plus size={25}/></button></div></div>
      </section>
      <AgencyIntro />
 {children && <div className="ref-third-section">{children}</div>}
    </StickyScrollStack>
    <dialog data-lenis-prevent ref={dialog} className="ref-dialog" onCancel={() => setActive(null)} onClick={e => { if (e.target === e.currentTarget) setActive(null); }} onClose={() => setActive(null)}>{active !== null && <><button className="ref-dialog-close" aria-label="Close project details" onClick={() => setActive(null)}><X/></button><img src={projects[active].image} alt={projects[active].title} onError={e => { e.currentTarget.style.display = "none"; }}/><div><span>CREATOX / SELECTED WORK</span><h2>{projects[active].title}</h2><p>{projects[active].detail}</p><a href={`mailto:${companyInfo.email}?subject=${encodeURIComponent(`Project enquiry: ${projects[active].title}`)}`} className="ref-button ref-white-button">Discuss a similar project <ArrowUpRight size={18}/></a></div></>}</dialog>
  </div></ParallaxComponent>;
}
