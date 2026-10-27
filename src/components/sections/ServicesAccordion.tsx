"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { innerServices } from "@/data/inner-services";
import { SectionLabel } from "../SectionLabel";
import "./expertise-grid.css";

const ExpertiseSculpture = dynamic(() => import("../ui/expertise-sculpture").then(module => module.ExpertiseSculpture), { ssr: false });

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
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const measure = () => section.style.setProperty("--services-height", `${section.offsetHeight}px`);
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    measure();
    return () => observer.disconnect();
  }, []);
  const [page, setPage] = useState(0);
  const pageSize = 4;
  const pageCount = Math.ceil(expertiseServices.length / pageSize);
  const reduceMotion = useReducedMotion();
  const reveal = { hidden: { opacity: 0, y: reduceMotion ? 0 : 32 }, visible: { opacity: 1, y: 0 } };
  const revealTransition = { duration: reduceMotion ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  return <section ref={sectionRef} className="expertise-showcase site-gutter" aria-labelledby="expertise-heading">
    <header className="expertise-showcase-header">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : .3 } } }}>
        <motion.div variants={reveal} transition={revealTransition}><SectionLabel text="OUR EXPERTISE" /></motion.div>
        <motion.h2 variants={reveal} transition={revealTransition} id="expertise-heading">Popular <span>services.</span></motion.h2>
        <motion.p variants={reveal} transition={revealTransition}>Grow your presence with social media, targeted campaigns, SEO and creator partnerships. Bring it all together with branding, websites, creative production and custom software.</motion.p>
      </motion.div>
      <div className="expertise-showcase-controls"><button type="button" onClick={() => setPage(value => Math.max(0, value - 1))} disabled={page === 0} aria-label="Previous services" aria-controls="expertise-service-grid"><ArrowLeft size={20} aria-hidden="true" /></button><button type="button" onClick={() => setPage(value => Math.min(pageCount - 1, value + 1))} disabled={page === pageCount - 1} aria-label="Next services" aria-controls="expertise-service-grid"><ArrowRight size={20} aria-hidden="true" /></button></div>
    </header>
    <div className="expertise-service-grid" id="expertise-service-grid">
      {expertiseServices.map((service, index) => {
        const fullService = innerServices.find(item => service.link === `/service/${item.slug}/`);
        const detail = serviceDetails[service.id] ?? { tags: fullService?.offerings.slice(0, 3).map(item => item.title) ?? [] };
        const image = serviceImages[service.id] ?? (fullService ? { src: fullService.image, alt: service.title, position: "50% 50%" } : undefined);
        const visible = Math.floor(index / pageSize) === page;
        return <article key={service.id} className={`expertise-service-pair ${index % 4 >= 2 ? "expertise-service-pair-reverse" : ""}`} hidden={!visible}>
          <div className="expertise-service-info"><h3>{service.title}</h3><p>{service.description}</p><ul className="expertise-service-tags" aria-label={`${service.title} capabilities`}>{detail.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><Link href={service.link} aria-label={`Explore ${service.title}`} className="expertise-service-link"><ArrowUpRight size={20} aria-hidden="true" /></Link></div>
          <div className="expertise-service-image">{visible && (image ? <Image src={image.src} alt={image.alt} fill style={{ objectPosition: image.position ?? "50% 50%" }} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw" /> : <ExpertiseSculpture variant={index} label={service.title} />)}</div>
        </article>;
      })}
    </div>
    <div className="expertise-showcase-footer"><span role="status" aria-live="polite">{String(page * pageSize + 1).padStart(2, "0")}-{String(Math.min((page + 1) * pageSize, services.length)).padStart(2, "0")} / {String(services.length).padStart(2, "0")} SERVICES</span><a href="#contact">Find the right service for your brand <ArrowUpRight size={16} aria-hidden="true" /></a></div>
  </section>;
}
