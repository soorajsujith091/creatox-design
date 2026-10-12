"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { BrandLogo } from "@/components/BrandLogo";

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
    timeline.fromTo(logoRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .45, ease: "power2.out" });
    timeline.to(containerRef.current, { yPercent: -100, duration: .6, ease: "power3.inOut" }, "+=0.15");
    return () => {
      timeline.kill();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (isComplete) return null;
  return <div ref={containerRef} className="fixed inset-0 z-[10000] bg-black flex items-center justify-center" aria-hidden="true">
    <div ref={logoRef}><BrandLogo className="w-[240px] md:w-[320px] p-5" priority /></div>
  </div>;
}
