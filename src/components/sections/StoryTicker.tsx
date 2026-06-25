"use client";

import { useRef, useEffect } from "react";

export function StoryTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const textArray = [
    { text: "Crafting", style: "filled" },
    { text: "exceptional", style: "stroke" },
    { text: "designs", style: "filled" },
    { text: "·", style: "separator" },
    { text: "Reimagining", style: "stroke" },
    { text: "your", style: "filled" },
    { text: "brand", style: "stroke" },
    { text: "·", style: "separator" },
    { text: "Shaping", style: "filled" },
    { text: "your", style: "stroke" },
    { text: "vision", style: "filled" },
    { text: "·", style: "separator" },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;
    // CSS animation handles the marquee
  }, []);

  return (
    <section className="bg-[#0A0A0A] py-16 overflow-hidden marquee-container" aria-hidden="true">
      <div className="flex overflow-hidden whitespace-nowrap" ref={containerRef}>
        <div 
          ref={trackRef} 
          className="marquee-track flex items-center animate-marquee-slow hover:[animation-play-state:paused]"
        >
          {/* Repeat the text array enough times to fill ultra-wide screens smoothly */}
          {[...Array(4)].map((_, i) => (
            <div key={`ticker-group-${i}`} className="flex items-center shrink-0">
              {textArray.map((item, j) => {
                let className = "font-heading text-fluid-ticker font-bold uppercase tracking-[-0.02em] leading-none ";
                
                // BUG FIX: Add explicit horizontal margin on each word span for proper spacing
                if (item.style === "separator") {
                  className += "text-red text-[0.5em] -translate-y-[0.1em] mx-8";
                } else if (item.style === "filled") {
                  className += "text-white mx-4";
                } else {
                  // stroke — stays white stroke on dark bg
                  className += "text-stroke-white mx-4";
                }

                return (
                  <span key={`${i}-${j}`} className={className}>
                    {item.text}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
