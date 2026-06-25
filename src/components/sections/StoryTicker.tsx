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

    if (trackRef.current) {
      // Calculate width of one set of items for seamless loop
      // GSAP handles the cloning/looping visually better than plain CSS for complex layouts sometimes,
      // but CSS marquee is often smoother for pure text. We'll stick to CSS animation here as defined in globals.css
      // for better performance, but ensure we have enough content to fill wide screens.
    }
  }, []);

  return (
    <section className="bg-black py-16 overflow-hidden marquee-container" aria-hidden="true">
      <div className="flex overflow-hidden whitespace-nowrap" ref={containerRef}>
        <div 
          ref={trackRef} 
          className="marquee-track flex items-center animate-marquee-slow hover:[animation-play-state:paused]"
        >
          {/* Repeat the text array enough times to fill ultra-wide screens smoothly */}
          {[...Array(4)].map((_, i) => (
            <div key={`ticker-group-${i}`} className="flex items-center mx-4 shrink-0">
              {textArray.map((item, j) => {
                let className = "font-heading text-fluid-ticker font-bold mx-4 uppercase tracking-[-0.02em] leading-none ";
                
                if (item.style === "filled") {
                  className += "text-white";
                } else if (item.style === "stroke") {
                  className += "text-stroke-white";
                } else {
                  className += "text-red text-[0.5em] -translate-y-[0.1em]"; // Adjust separator position/size relative to huge text
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
