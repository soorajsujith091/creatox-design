"use client";

/* cms-native-links */
import { PageAnchor } from "@/components/cms/PageContent";
/* cms-page-fields */
import { PageText, PageNativeImage } from "@/components/cms/PageContent";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, X, Plus } from "lucide-react";
import { companyInfo } from "@/data/stats";
import { projects as creatoxProjects } from "@/data/projects";
import { projectCoverImages } from "@/data/project-cover-images";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
import { BrandLogo } from "@/components/BrandLogo";
import { StickyScrollStack } from "@/components/ui/sticky-scroll-stack";
import { AgencyIntro } from "@/components/sections/AgencyIntro";
import { Header as SiteNavigation } from "@/components/ui/header-2";
import { CreativeHeroBackground } from "@/components/ui/creative-hero-background";
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

export function ReferenceHome({ children, showHero = true, heroOnly = false, showNavigation = true }: { children?: ReactNode; showHero?: boolean; heroOnly?: boolean; showNavigation?: boolean }) {

  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => { if (active !== null) dialog.current?.showModal(); else dialog.current?.close(); }, [active]);
  const reveal = { initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: .75 } };
  return <ParallaxComponent><div className="reference-home" id="home">
    <StickyScrollStack className="ref-frame">
      {!showHero && showNavigation && <SiteNavigation />}
      {showHero && <section className="ref-hero" data-parallax-layers aria-label="Creatox creative digital agency">
        <CreativeHeroBackground />
        {showNavigation && <SiteNavigation />}
        <div data-parallax-layer="3"><motion.h1 {...reveal} className="ref-title"><span><PageText field="3d118ed1a_1" section="Reference Home" label="Text">{"CREATIVE"}</PageText></span><span className="ref-title-second"><PageText field="3d118ed1a_2" section="Reference Home" label="Text">{"DIGITAL "}</PageText><Mark className="ref-orange"/> <PageText field="3d118ed1a_3" section="Reference Home" label="Text">{"AGENCY"}</PageText></span></motion.h1></div>
        <PageAnchor field="anchor_185a6d797_1" section="ReferenceHome" className="ref-rating" href={heroOnly ? "/#testimonials" : "#testimonials"} aria-label="Read client testimonials"><span><PageText field="3d118ed1a_4" section="Reference Home" label="Text">{"DESIGN. DIGITAL. GROWTH."}</PageText></span><small><PageText field="3d118ed1a_5" section="Reference Home" label="Text">{"Creative thinking. Purposeful results."}</PageText></small></PageAnchor>
        <div className="ref-hero-middle" data-parallax-layer="2"><p><PageText field="3d118ed1a_6" section="Reference Home" label="Text">{"Brand identities, websites and campaigns"}</PageText><br/><PageText field="3d118ed1a_7" section="Reference Home" label="Text">{"that help your business connect and grow."}</PageText><br/><span><PageText field="3d118ed1a_8" section="Reference Home" label="Text">{"Made with love in Kannur, Kerala."}</PageText></span></p><div className="ref-actions"><MagneticButton><PageAnchor field="anchor_185a6d797_2" section="ReferenceHome" className="ref-button ref-dark-button" href={heroOnly ? "/contact-us/" : "#contact"}><PageText field="3d118ed1a_9" section="Reference Home" label="Text">{"Start a project "}</PageText><span><ArrowRight size={20}/></span></PageAnchor></MagneticButton><MagneticButton><PageAnchor field="anchor_185a6d797_3" section="ReferenceHome" className="ref-button ref-white-button" href="/projects/#selected-work"><PageText field="3d118ed1a_10" section="Reference Home" label="Text">{"Explore our work"}</PageText></PageAnchor></MagneticButton></div></div>
        <div className="ref-hero-bottom" data-parallax-layer="4"><PageAnchor field="anchor_185a6d797_4" section="ReferenceHome" className="ref-stat-card" href={heroOnly ? "#about-story" : "#about"}><span className="ref-stat-symbol"><BrandLogo className="w-full px-2 py-2" /></span><span><PageText field="3d118ed1a_11" section="Reference Home" label="Text">{"6+ years of creativity"}</PageText><br/><PageText field="3d118ed1a_12" section="Reference Home" label="Text">{"1k+ successful projects"}</PageText><span className="ref-stat-arrows"><ArrowRight size={15}/></span></span></PageAnchor><div className="ref-mini-cards"><PageAnchor field="anchor_185a6d797_5" section="ReferenceHome" className="ref-mini ref-mini-dark" href={heroOnly ? "/projects/" : "#work"}><BrandLogo className="w-full px-2 py-2" /><span><PageText field="3d118ed1a_13" section="Reference Home" label="Text">{"Branding. Websites."}</PageText><br/><PageText field="3d118ed1a_14" section="Reference Home" label="Text">{"Social media."}</PageText><br/><PageText field="3d118ed1a_15" section="Reference Home" label="Text">{"Built around you."}</PageText></span></PageAnchor><button className="ref-mini ref-mini-nature" aria-label="Explore Desham Brings project" onClick={() => setActive(1)}><span><PageText field="3d118ed1a_16" section="Reference Home" label="Text">{"BRAND"}</PageText><br/><PageText field="3d118ed1a_17" section="Reference Home" label="Text">{"STRATEGY"}</PageText></span><ArrowUpRight size={20}/></button><button className="ref-mini ref-mini-yellow" aria-label="Explore Best Western Plus project" onClick={() => setActive(0)}><span><PageText field="3d118ed1a_18" section="Reference Home" label="Text">{"CREATE."}</PageText><br/><PageText field="3d118ed1a_19" section="Reference Home" label="Text">{"CONNECT."}</PageText><br/><PageText field="3d118ed1a_20" section="Reference Home" label="Text">{"GROW."}</PageText></span><Plus size={25}/></button></div></div>
      </section>}
      {!heroOnly && <AgencyIntro />}
 {children && <div className="ref-third-section">{children}</div>}
    </StickyScrollStack>
    <dialog data-lenis-prevent ref={dialog} className="ref-dialog" onCancel={() => setActive(null)} onClick={e => { if (e.target === e.currentTarget) setActive(null); }} onClose={() => setActive(null)}>{active !== null && <><button className="ref-dialog-close" aria-label="Close project details" onClick={() => setActive(null)}><X/></button><PageNativeImage field="3d118ed1a_21" section="Reference Home" src={projects[active].image} alt={projects[active].title} onError={e => { e.currentTarget.style.display = "none"; }}/><div><span><PageText field="3d118ed1a_22" section="Reference Home" label="Text">{"CREATOX / SELECTED WORK"}</PageText></span><h2><PageText field="3d118ed1a_23" section="Reference Home" label="Heading">{projects[active].title}</PageText></h2><p><PageText field="3d118ed1a_24" section="Reference Home" label="Text">{projects[active].detail}</PageText></p><PageAnchor field="anchor_185a6d797_6" section="ReferenceHome" href={`mailto:${companyInfo.email}?subject=${encodeURIComponent(`Project enquiry: ${projects[active].title}`)}`} className="ref-button ref-white-button"><PageText field="3d118ed1a_25" section="Reference Home" label="Text">{"Discuss a similar project "}</PageText><ArrowUpRight size={18}/></PageAnchor></div></>}</dialog>
  </div></ParallaxComponent>;
}
