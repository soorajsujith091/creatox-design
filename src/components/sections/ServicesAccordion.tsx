"use client";

/* cms-page-fields */
import { PageText, PageLink } from "@/components/cms/PageContent";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";


import { CmsImage } from "@/components/CmsImage";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { innerServices } from "@/data/inner-services";
import { SectionLabel } from "../SectionLabel";
import "./expertise-grid.css";


const firstViewOrder = ["branding-design", "social-media", "web-design", "ads-campaigns"];
const expertiseServices = [
  ...firstViewOrder.flatMap(id => services.filter(service => service.id === id)),
  ...services.filter(service => !firstViewOrder.includes(service.id)),
];

const serviceDetails: Record<string, { tags: string[] }> = {
  "branding-design": { tags: ["Brand strategy", "Visual identity", "Logo design", "Print design"] },
  "social-media": { tags: ["Content strategy", "Social campaigns", "Community management"] },
  "web-design": { tags: ["Responsive websites", "UI / UX", "Web development"] },
  "ads-campaigns": { tags: ["Google Ads", "Meta Ads", "Campaign strategy"] },
  "productions": { tags: ["Brand films", "Photography", "Video production"] },
  "ecommerce": { tags: ["Online stores", "Product pages", "Checkout experiences"] },
};

const serviceImages: Record<string, { src: string; alt: string; position?: string }> = {
  "ecommerce": { src: "/images/creatox,ecommerce.jpeg", alt: "Person wearing a VR headset surrounded by blue and orange light trails", position: "50% 40%" },
  "productions": { src: "/images/expertise/productions-floating-red.png", alt: "Woman floating above a studio floor against a crimson red backdrop", position: "50% 50%" },
  "branding-design": { src: "/images/download%20(12).jpeg", alt: "Woman in a cream outfit seated among blurred figures in red and grey", position: "50% 52%" },
  "web-design": { src: "/images/expertise/web-immersive.jpeg", alt: "Person exploring an immersive digital world through a VR headset", position: "50% 40%" },
  "social-media": { src: "/images/Creatoxx.jpeg", alt: "Close-up of galloping horses kicking up sand" },
  "ads-campaigns": { src: "/images/expertise/campaign-momentum.jpeg", alt: "Horse bursting through debris, suggesting momentum and breakthrough", position: "60% 47%" },
};

export function ServicesAccordion() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ start: true, end: false });
  const reduced = useReducedMotion();
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const measure = () => {
      section.style.setProperty("--services-height", `${section.offsetHeight}px`);
      setPosition({ start: track.scrollLeft < 4, end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4 });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(section); observer.observe(track);
    track.addEventListener("scroll", measure, { passive: true });
    measure();
    return () => { observer.disconnect(); track.removeEventListener("scroll", measure); };
  }, []);
  const move = (direction: number) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>(".expertise-visual-card");
    if (track && card) track.scrollBy({ left: direction * (card.offsetWidth + 20), behavior: reduced ? "instant" : "smooth" });
  };
  return <section ref={sectionRef} className="expertise-showcase site-gutter" aria-labelledby="expertise-heading">
    <motion.header className="expertise-editorial-header" initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}>
      <div><SectionLabel text="OUR EXPERTISE" /><h2 id="expertise-heading"><PageText field="9e2bafc67_1" section="Services Accordion" label="Heading">{"Big ideas."}</PageText><br /><span><PageText field="9e2bafc67_2" section="Services Accordion" label="Text">{"Made to move you."}</PageText></span></h2></div>
      <div className="expertise-header-note"><span><PageText field="9e2bafc67_3" section="Services Accordion" label="Text">{"FROM STRATEGY TO IMPACT"}</PageText></span><p><PageText field="9e2bafc67_4" section="Services Accordion" label="Text">{"Branding, digital experiences and campaigns. Everything your brand needs to connect, create and grow."}</PageText></p><PageLink field="9e2bafc67_5" section="Services Accordion" href="/services/"><PageText field="9e2bafc67_6" section="Services Accordion" label="Text">{"Explore our services "}</PageText><ArrowUpRight size={16} aria-hidden="true" /></PageLink></div>
    </motion.header>
    <div className="expertise-editorial-body">
      <div className="expertise-editorial-intro"><p className="expertise-values"><PageText field="9e2bafc67_7" section="Services Accordion" label="Text">{"Strategy "}</PageText><span><PageText field="9e2bafc67_10" section="Services Accordion" label="Text">{"·"}</PageText></span> <PageText field="9e2bafc67_8" section="Services Accordion" label="Text">{"Creativity "}</PageText><span><PageText field="9e2bafc67_11" section="Services Accordion" label="Text">{"·"}</PageText></span> <PageText field="9e2bafc67_9" section="Services Accordion" label="Text">{"Connection"}</PageText></p><div className="expertise-intro-bottom"><div className="expertise-intro-pills"><span><PageText field="9e2bafc67_12" section="Services Accordion" label="Text">{"Brand identities"}</PageText></span><span><PageText field="9e2bafc67_13" section="Services Accordion" label="Text">{"Digital experiences"}</PageText></span><span><PageText field="9e2bafc67_14" section="Services Accordion" label="Text">{"Creative campaigns"}</PageText></span></div><h3><PageText field="9e2bafc67_15" section="Services Accordion" label="Heading">{"Your next"}</PageText><br /><span><PageText field="9e2bafc67_17" section="Services Accordion" label="Text">{"big chapter"}</PageText></span><br /><PageText field="9e2bafc67_16" section="Services Accordion" label="Heading">{"starts here."}</PageText></h3><p><PageText field="9e2bafc67_18" section="Services Accordion" label="Text">{"We bring the creative and technical skills to turn your ambitions into meaningful results."}</PageText></p><div className="expertise-showcase-controls"><button onClick={() => move(-1)} disabled={position.start} aria-label="Previous services" aria-controls="expertise-service-grid"><ArrowLeft size={19} /></button><button onClick={() => move(1)} disabled={position.end} aria-label="Next services" aria-controls="expertise-service-grid"><ArrowRight size={19} /></button></div></div></div>
      <div ref={trackRef} className="expertise-card-track" id="expertise-service-grid" tabIndex={0} role="region" aria-label="Explore services; swipe or use the arrow buttons">
        {expertiseServices.map((service, index) => {
          const full = innerServices.find(item => service.link === `/service/${item.slug}/`);
          const image = serviceImages[service.id] ?? { src: full?.image || "/images/creatox-our-story.png", alt: service.title, position: "50% 50%" };
          const tags = serviceDetails[service.id]?.tags ?? full?.offerings.slice(0, 2).map(item => item.title) ?? [];
          return <PageLink field="9e2bafc67_19" section="Services Accordion" href={service.link} key={service.id} className="expertise-visual-card">
            <CmsImage slot={`service_${service.id}`} src={image.src} alt={image.alt} fill style={{ objectPosition: image.position }} sizes="(max-width: 600px) 78vw, 320px" />
            <span className="expertise-card-index"><PageText field="9e2bafc67_20" section="Services Accordion" label="Text">{String(index + 1).padStart(2, "0")}</PageText> <PageText field="9e2bafc67_21" section="Services Accordion" label="Text">{"/ CREATOX"}</PageText></span>
            <div className="expertise-card-caption"><p><PageText field="9e2bafc67_22" section="Services Accordion" label="Text">{tags.slice(0, 2).join(" · ")}</PageText></p><div><h3><PageText field="9e2bafc67_23" section="Services Accordion" label="Heading">{service.title}</PageText></h3><span className="expertise-card-arrow"><ArrowUpRight size={20} aria-hidden="true" /></span></div><span className="expertise-card-description"><PageText field="9e2bafc67_24" section="Services Accordion" label="Text">{service.description}</PageText></span></div>
          </PageLink>;
        })}
      </div>
    </div>
    <div className="expertise-showcase-footer"><span><PageText field="9e2bafc67_25" section="Services Accordion" label="Text">{String(expertiseServices.length).padStart(2, "0")}</PageText> <PageText field="9e2bafc67_26" section="Services Accordion" label="Text">{"SERVICES. ONE CREATIVE PARTNER."}</PageText></span><span><PageText field="9e2bafc67_27" section="Services Accordion" label="Text">{"Swipe to explore "}</PageText><ArrowRight size={15} aria-hidden="true" /></span></div>
  </section>;
}