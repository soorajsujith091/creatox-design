"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { SectionLabel } from "../SectionLabel";
import "./expertise-grid.css";

const serviceDetails: Record<string, { tags: string[]; image: string; alt: string }> = {
  "branding-design": { tags: ["Brand strategy", "Visual identity", "Logo design", "Print design"], image: "/images/creatox-our-story.png", alt: "Red sculptural brand artwork illustrating creative design" },
  "social-media": { tags: ["Content strategy", "Social campaigns", "Community management"], image: "/images/project-beverage-concept.png", alt: "Beverage brand concept showcasing visual content and packaging" },
  "web-design": { tags: ["Responsive websites", "UI / UX", "Web development"], image: "/images/project-hotel-concept.png", alt: "Premium hotel brand concept for a digital experience" },
  "ads-campaigns": { tags: ["Google Ads", "Meta Ads", "Campaign strategy"], image: "/images/project-sports-concept.png", alt: "Sports event concept illustrating campaign creative" },
  "productions": { tags: ["Brand films", "Photography", "Video production"], image: "/images/agency-runners.png", alt: "Creative campaign imagery for visual storytelling" },
  "ecommerce": { tags: ["Online stores", "Product pages", "Checkout experiences"], image: "/images/project-beverage-concept.png", alt: "Product brand concept for an online store" },
};

export function ServicesAccordion() {
  const [page, setPage] = useState(0);
  return <section className="expertise-showcase site-gutter" aria-labelledby="expertise-heading">
    <header className="expertise-showcase-header">
      <div><SectionLabel text="OUR EXPERTISE" /><h2 id="expertise-heading">Popular <span>services.</span></h2><p>From brand identity to websites and digital campaigns, we bring the creative and technical skills your business needs to grow.</p></div>
      <div className="expertise-showcase-controls"><button type="button" onClick={() => setPage(0)} disabled={page === 0} aria-label="Previous services" aria-controls="expertise-service-grid"><ArrowLeft size={20} aria-hidden="true" /></button><button type="button" onClick={() => setPage(1)} disabled={page === 1} aria-label="Next services" aria-controls="expertise-service-grid"><ArrowRight size={20} aria-hidden="true" /></button></div>
    </header>
    <div className="expertise-service-grid" id="expertise-service-grid">
      {services.map((service, index) => {
        const detail = serviceDetails[service.id];
        return <article key={service.id} className={`expertise-service-pair ${index % 4 >= 2 ? "expertise-service-pair-reverse" : ""}`} hidden={page === 0 ? index >= 4 : index < 4}>
          <div className="expertise-service-info"><h3>{service.title}</h3><ul aria-label={`${service.title} capabilities`}>{detail.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><p>{service.description}</p><Link href={service.link} aria-label={`Explore ${service.title}`} className="expertise-service-link"><ArrowUpRight size={20} aria-hidden="true" /></Link></div>
          <div className="expertise-service-image"><Image src={detail.image} alt={detail.alt} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw" /></div>
        </article>;
      })}
    </div>
    <div className="expertise-showcase-footer"><span role="status" aria-live="polite">{page === 0 ? "01–04" : "05–06"} / 06 SERVICES</span><a href="#contact">Find the right service for your brand <ArrowUpRight size={16} aria-hidden="true" /></a></div>
  </section>;
}