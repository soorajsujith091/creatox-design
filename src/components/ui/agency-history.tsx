"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { agencyHistory } from "@/data/inner-services";
import "./agency-history.css";

export default function AgencyHistory() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference) and (min-width: 768px) and (min-height: 650px)", () => {
      const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
      section.classList.add("agency-history-animated");
      const setHeight = () => { section.style.height = `${window.innerHeight + distance()}px`; };
      setHeight();
      gsap.to(track, {
        x: () => -distance(), ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true, onRefreshInit: setHeight },
      });
      gsap.fromTo(section.querySelector(".agency-history-progress"), { scaleX: 0 }, {
        scaleX: 1, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: true },
      });
      return () => {
        section.classList.remove("agency-history-animated");
        section.style.removeProperty("height");
      };
    });
    return () => media.revert();
  }, []);

  return <section ref={sectionRef} className="agency-history" aria-labelledby="agency-history-heading">
    <div className="agency-history-sticky">
      <header className="agency-history-header"><span className="ip-eyebrow">[ Our history ]</span><p>2019 — 2026 <span aria-hidden="true">/</span> Made to keep moving.</p></header>
      <div className="agency-history-viewport" role="region" aria-label="Creatox history timeline" tabIndex={0}>
        <div ref={trackRef} className="agency-history-track">
          <div className="agency-history-intro">
            <div className="agency-history-image"><Image src="/images/WhatsApp%20Image%202026-10-12%20at%2012.56.42%20PM.jpeg" alt="The Creatox team together at the Kannur office" fill sizes="(max-width: 767px) 85vw, 360px" /></div>
            <h2 id="agency-history-heading">Small beginnings.<br /><span>Shared ambition.</span></h2>
          </div>
          <ol className="agency-history-milestones">
            <li className="agency-history-rail" aria-hidden="true" role="presentation"><div className="agency-history-progress" /></li>
            {agencyHistory.map((item, index) => <li key={item.year} className={`agency-history-item ${index % 2 ? "is-bottom" : "is-top"}`}>
              <div className="agency-history-copy"><span className="agency-history-year">{item.year}</span><h3>{item.title}</h3><p>{item.description}</p></div>
              <span className="agency-history-stem" aria-hidden="true" /><span className="agency-history-dot" aria-hidden="true" />
            </li>)}
          </ol>
        </div>
      </div>
    </div>
  </section>;
}
