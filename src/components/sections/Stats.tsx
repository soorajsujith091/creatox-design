"use client";

import { useEffect, useRef } from "react";
import { stats, badges } from "@/data/stats";
import { SectionLabel } from "../SectionLabel";

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const hasAnimated = useRef(false);

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

    // Counter animation using IntersectionObserver + requestAnimationFrame
    const animateCounter = (el: HTMLSpanElement, target: number, duration: number = 2000) => {
      const start = performance.now();
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

      const update = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOut(progress);
        const current = Math.round(easedProgress * target);
        el.textContent = String(current);
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = String(target);
        }
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            numbersRef.current.forEach((el, i) => {
              if (!el) return;
              // Stagger: 0, 150, 300, 450ms
              setTimeout(() => {
                animateCounter(el, stats[i].numericValue, 2000);
              }, i * 150);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#F7F7F7] px-6" aria-label="Achievements">
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel text="ACHIEVEMENT" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0 mt-16">
          {stats.map((stat, i) => (
            <div 
              key={stat.label} 
              className={`flex flex-col items-center text-center ${i !== stats.length - 1 ? 'md:border-r border-[#E0E0E0]' : ''}`}
            >
              <div className="flex items-baseline font-heading text-fluid-3xl text-[#0A0A0A] font-bold mb-2">
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
              className="bg-white border border-[#E8E8E8] px-4 py-2 rounded-[2px] font-mono text-[11px] text-[#555555] uppercase tracking-wide text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
