"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GlassIconReveal } from "@/components/ui/liquid-glass-logo-reveal";

export function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsComplete(true);
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timeline = gsap.timeline({ onComplete: () => {
      setIsComplete(true);
      document.body.style.overflow = previousOverflow;
    } });
    timeline.to(containerRef.current, { yPercent: -100, duration: .45, ease: "power3.inOut" }, 2.7);
    return () => {
      timeline.kill();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (isComplete) return null;
  return <div ref={containerRef} data-site-preloader className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center isolate" aria-hidden="true">
    <div ref={logoRef} className="h-[360px] w-full max-w-[640px] md:h-[480px]">
      <GlassIconReveal logo="/images/Creatox%20Logo-%20new.png" look="dark" background="transparent" logoColor="#DC0208" plateColor="#100001" originalColors loop={false} iconPlate={false} glassAspect={2.4} tileSize={320} logoScale={.76} finalScale={1} speed={1.6} tuning={{ dispersion: 0, colorBleed: 0, present: 2.4, glide: 2, startZoom: 1, startSize: .8, bulge: 0, cornerPull: 0, edgeSmear: 0, tilt: 0, bevelWidth: .06, focus: 0 }} label="Creatox Designs" className="h-full w-full" />
    </div>
  </div>;
}
