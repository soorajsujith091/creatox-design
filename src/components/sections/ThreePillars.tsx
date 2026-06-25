"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pillars } from "@/data/services";
import { SectionLabel } from "../SectionLabel";

gsap.registerPlugin(ScrollTrigger);

function PillarIcon({ type }: { type: string }) {
  if (type === "geometric") {
    return (
      <div className="w-12 h-12 relative flex items-center justify-center animate-spin-slow">
        <div className="absolute inset-0 border-2 border-red opacity-30 transform rotate-45" />
        <div className="absolute inset-0 border-2 border-red opacity-70 rounded-sm" />
      </div>
    );
  }

  if (type === "orb") {
    return (
      <div className="w-12 h-12 rounded-full relative overflow-hidden animate-pulse-glow">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/60 to-red/40" />
      </div>
    );
  }

  return (
    <div className="w-12 h-12 flex items-center gap-1 text-red font-mono text-xl font-bold">
      <span className="text-gray/50">&lt;</span>
      <span className="animate-blink">_</span>
      <span className="text-gray/50">&gt;</span>
    </div>
  );
}

export function ThreePillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-[#F7F7F7] px-6" aria-label="What We Do">
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel text="WHAT WE DO" />

        <div className="mb-16">
          <h2 className="font-heading text-fluid-3xl text-[#0A0A0A] font-semibold mb-4 leading-tight">
            Design. Digital. Development.
          </h2>
          <p className="font-body text-gray text-fluid-base">
            Three disciplines. One obsessed team.
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="bg-white border border-[#E8E8E8] p-8 rounded-[4px] card-hover flex flex-col h-full min-h-[420px] opacity-0 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
              style={
                typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? { opacity: 1 }
                  : {}
              }
            >
              <div className="mb-10">
                <PillarIcon type={pillar.iconType} />
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] text-red transition-transform duration-300">
                  {pillar.number}
                </span>
                <h3 className="font-heading text-[28px] text-[#0A0A0A]">
                  {pillar.title}
                </h3>
              </div>

              <p className="font-body text-[15px] text-[#555555] leading-relaxed mb-auto">
                {pillar.description}
              </p>

              <Link
                href={pillar.link}
                className="inline-block mt-8 font-mono text-[12px] text-red hover:text-[#0A0A0A] transition-colors"
              >
                {pillar.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
