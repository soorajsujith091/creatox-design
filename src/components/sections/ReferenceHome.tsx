"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Menu, X, Plus } from "lucide-react";
import { companyInfo } from "@/data/stats";
import { projects as creatoxProjects } from "@/data/projects";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
import { BrandLogo } from "@/components/BrandLogo";
import { NotchedProjectCard } from "@/components/ui/notched-project-card";
import { StickyScrollStack } from "@/components/ui/sticky-scroll-stack";
import "./reference-home.css";

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
  image: project.image, detail: project.description, foot: "View project details",
}));

export function ReferenceHome() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!menu) return;
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(false); };
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
          <button className="ref-logo" aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu} aria-controls="ref-menu" onClick={() => setMenu(!menu)}>{menu ? <X size={21}/> : <Menu size={21}/>}</button>
        </nav>
        <AnimatePresence>{menu && <motion.div id="ref-menu" className="ref-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>{[["Services", "services"], ["About Creatox", "about"], ["Our work", "selected-work"], ["Testimonials", "testimonials"], ["Start a project", "contact"]].map(([text, id]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{text}<ArrowUpRight size={18}/></a>)}</motion.div>}</AnimatePresence>
        <div data-parallax-layer="3"><motion.h1 {...reveal} className="ref-title"><span>CREATIVE</span><span className="ref-title-second">DIGITAL <Mark className="ref-orange"/> AGENCY</span></motion.h1></div>
        <a className="ref-rating" href="#testimonials" aria-label="Read client testimonials"><span>DESIGN. DIGITAL. GROWTH.</span><small>Creative thinking. Purposeful results.</small></a>
        <div className="ref-hero-middle" data-parallax-layer="2"><p>Brand identities, websites and campaigns<br/>that help your business connect and grow.<br/><span>Made with love in Kannur, Kerala.</span></p><div className="ref-actions"><MagneticButton><a className="ref-button ref-dark-button" href="#contact">Start a project <span><ArrowRight size={20}/></span></a></MagneticButton><MagneticButton><a className="ref-button ref-white-button" href="#selected-work">Explore our work</a></MagneticButton></div></div>
        <div className="ref-hero-bottom" data-parallax-layer="4"><a className="ref-stat-card" href="#about"><span className="ref-stat-symbol"><BrandLogo className="w-full px-2 py-2" /></span><span>6+ years of creativity<br/>1k+ successful projects<span className="ref-stat-arrows"><ArrowRight size={15}/></span></span></a><div className="ref-mini-cards"><a className="ref-mini ref-mini-dark" href="#work"><BrandLogo className="w-full px-2 py-2" /><span>Branding. Websites.<br/>Social media.<br/>Built around you.</span></a><button className="ref-mini ref-mini-nature" aria-label="Explore Desham Brings project" onClick={() => setActive(1)}><span>BRAND<br/>STRATEGY</span><ArrowUpRight size={20}/></button><button className="ref-mini ref-mini-yellow" aria-label="Explore Best Western Plus project" onClick={() => setActive(0)}><span>CREATE.<br/>CONNECT.<br/>GROW.</span><Plus size={25}/></button></div></div>
      </section>
      <section className="ref-trust" id="work" aria-label="Trusted by teams at scale">
        <div className="ref-eyebrows"><span>/ SELECTED CREATOX WORK</span><a href="#services">DESIGN & DIGITAL SERVICES <ArrowUpRight size={12}/></a></div>
        <div className="ref-trust-heading"><motion.h2 {...reveal}>GOOD DESIGN.<br/><span className="ref-inline-arrow">↗</span> REAL CONNECTIONS.</motion.h2><motion.p {...reveal}>We blend creativity, strategy and technology to build brands that <span>look premium and perform with purpose.</span></motion.p></div>
        <div className="ref-notched-grid">{creatoxProjects.slice(0, 3).map(project => <NotchedProjectCard
          key={project.id}
          href={`https://creatoxdesigns.com${project.link}`}
          title={project.title}
          description={project.description}
          image={project.image}
          imageAlt={`${project.title} project by Creatox Designs`}
          badge={project.tags[0]}
          tags={project.tags}
          surface="#ffffff"
          accent="#e4002b"
          accentForeground="#ffffff"
          className="ref-notched-card"
        />)}</div>
        <div className="ref-trust-footer"><span>YOUR NEXT CHAPTER STARTS HERE.</span><a href="#contact">Let’s create something together <ArrowUpRight size={18}/></a></div>
      </section>
    </StickyScrollStack>
    <dialog data-lenis-prevent ref={dialog} className="ref-dialog" onCancel={() => setActive(null)} onClick={e => { if (e.target === e.currentTarget) setActive(null); }} onClose={() => setActive(null)}>{active !== null && <><button className="ref-dialog-close" aria-label="Close project details" onClick={() => setActive(null)}><X/></button><img src={projects[active].image} alt={projects[active].title} onError={e => { e.currentTarget.style.display = "none"; }}/><div><span>CREATOX / SELECTED WORK</span><h2>{projects[active].title}</h2><p>{projects[active].detail}</p><a href={`mailto:${companyInfo.email}?subject=${encodeURIComponent(`Project enquiry: ${projects[active].title}`)}`} className="ref-button ref-white-button">Discuss a similar project <ArrowUpRight size={18}/></a></div></>}</dialog>
  </div></ParallaxComponent>;
}
