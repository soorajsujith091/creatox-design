"use client";

/* cms-page-fields */
import { PageText } from "@/components/cms/PageContent";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionLabelProps {
  text: string;
  className?: string;
}

export function SectionLabel({ text, className = "" }: SectionLabelProps) {
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: labelRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <span
      ref={labelRef}
      className={`section-label font-mono block opacity-0 ${className}`}
    >
      <PageText field="8a1b66a49_1" section="Section Label" label="Text">{"[ "}</PageText><PageText field="8a1b66a49_2" section="Section Label" label="Text">{text}</PageText> <PageText field="8a1b66a49_3" section="Section Label" label="Text">{"]"}</PageText></span>
  );
}
