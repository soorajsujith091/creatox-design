"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { SectionLabel } from "../SectionLabel";
import "./expertise-grid.css";

const ExpertiseSculpture = dynamic(() => import("../ui/expertise-sculpture").then(module => module.ExpertiseSculpture), { ssr: false });

const serviceDetails: Record<string, { tags: string[] }> = {
  "branding-design": { tags: ["Brand strategy", "Visual identity", "Logo design", "Print design"] },
  "social-media": { tags: ["Content strategy", "Social campaigns", "Community management"] },
  "web-design": { tags: ["Responsive websites", "UI / UX", "Web development"] },
  "ads-campaigns": { tags: ["Google Ads", "Meta Ads", "Campaign strategy"] },
  "productions": { tags: ["Brand films", "Photography", "Video production"] },
  "ecommerce": { tags: ["Online stores", "Product pages", "Checkout experiences"] },
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
          <div className="expertise-service-image">{(page === 0 ? index < 4 : index >= 4) && <ExpertiseSculpture variant={index} label={service.title} />}</div>
        </article>;
      })}
    </div>
    <div className="expertise-showcase-footer"><span role="status" aria-live="polite">{page === 0 ? "01–04" : "05–06"} / 06 SERVICES</span><a href="#contact">Find the right service for your brand <ArrowUpRight size={16} aria-hidden="true" /></a></div>
  </section>;
}
