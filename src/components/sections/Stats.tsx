"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats, badges } from "@/data/stats";
import { SectionLabel } from "../SectionLabel";

gsap.registerPlugin(ScrollTrigger);

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      numbersRef.current.forEach((el, i) => {
        if (el) el.textContent = `${stats[i].numericValue}`;
      });
      return;
    }

    const ctx = gsap.context(() => {
      numbersRef.current.forEach((el, i) => {
        if (!el) return;
        
        const targetValue = stats[i].numericValue;
        
        gsap.to(el, {
          innerHTML: targetValue,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
          onUpdate: function() {
            el.innerHTML = Math.round(this.targets()[0].innerHTML).toString();
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-black px-6" aria-label="Achievements">
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel text="ACHIEVEMENT" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 mt-16">
          {stats.map((stat, i) => (
            <div 
              key={stat.label} 
              className={`flex flex-col items-center text-center ${i !== stats.length - 1 ? 'md:border-r border-border' : ''}`}
            >
              <div className="flex items-baseline font-heading text-fluid-3xl text-white font-bold mb-2">
                <span ref={(el) => { numbersRef.current[i] = el }}>
                  0
                </span>
                <span className="text-red">{stat.suffix}</span>
              </div>
              <p className="font-body text-[14px] text-gray leading-[1.5] max-w-[150px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-20">
          {badges.map((badge) => (
            <div 
              key={badge}
              className="border border-[#333] px-4 py-2 rounded-[2px] font-mono text-[11px] text-gray uppercase tracking-wide text-center"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
