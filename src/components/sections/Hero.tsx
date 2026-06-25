"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      [badgeRef, line1Ref, line2Ref, line3Ref, subRef, ctaRef].forEach(
        (ref) => {
          if (ref.current) {
            ref.current.style.opacity = "1";
            ref.current.style.clipPath = "inset(0 0 0 0)";
            ref.current.style.transform = "none";
          }
        }
      );
      return;
    }

    const tl = gsap.timeline({ delay: 1.6 });

    // Badge fade up
    tl.fromTo(
      badgeRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    // Headline lines clip-path reveal
    tl.fromTo(
      line1Ref.current,
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 0.7,
        ease: "power3.inOut",
      },
      "-=0.2"
    );

    tl.fromTo(
      line2Ref.current,
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 0.7,
        ease: "power3.inOut",
      },
      "-=0.5"
    );

    tl.fromTo(
      line3Ref.current,
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 0.7,
        ease: "power3.inOut",
      },
      "-=0.5"
    );

    // Sub text fade
    tl.fromTo(
      subRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    // CTA fade + slide
    tl.fromTo(
      ctaRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] bg-white overflow-hidden flex items-center"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, #F0F0F0 0px, #F0F0F0 1px, transparent 1px, transparent 60px)",
      }}
      aria-label="Hero"
    >
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        {/* Badge */}
        <span
          ref={badgeRef}
          className="inline-block font-mono text-[11px] text-red uppercase tracking-[0.12em] mb-8 opacity-0"
        >
          ✦ FULL-SERVICE DIGITAL AGENCY — KANNUR, KERALA
        </span>

        {/* Headline */}
        <h1 className="font-heading font-bold tracking-[-0.02em] leading-[0.95]">
          <div
            ref={line1Ref}
            className="text-fluid-hero text-[#0A0A0A]"
            style={{ clipPath: "inset(100% 0 0 0)" }}
          >
            Building
          </div>
          <div
            ref={line2Ref}
            className="text-fluid-hero text-[#0A0A0A]"
            style={{ clipPath: "inset(100% 0 0 0)" }}
          >
            Immersive
          </div>
          <div
            ref={line3Ref}
            className="text-fluid-hero text-stroke"
            style={{ clipPath: "inset(100% 0 0 0)" }}
          >
            Experiences.
          </div>
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="font-body text-[16px] text-[#555555] max-w-lg leading-[1.7] mt-8 opacity-0"
        >
          We blend creativity, strategy, and technology to craft brand
          identities, websites, and campaigns that look premium and perform with
          purpose.
        </p>

        {/* CTA Row */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 mt-10 opacity-0"
        >
          <Link
            href="/projects/"
            className="border border-[#0A0A0A] text-[#0A0A0A] px-7 py-3.5 text-[14px] font-body text-center hover:bg-red hover:border-red hover:text-white transition-all duration-300"
          >
            See Our Work ↗
          </Link>
          <Link
            href="/contact-us/"
            className="text-[#888888] px-7 py-3.5 text-[14px] font-body text-center hover:text-[#0A0A0A] transition-colors duration-300"
          >
            Let&apos;s Talk →
          </Link>
        </div>
      </div>

      {/* Bottom strip (desktop only) */}
      <div
        className="absolute bottom-0 left-0 right-0 px-6 pb-8 flex justify-between items-end hidden md:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[11px] text-[#BBBBBB]">
          Kannur, Kerala · Est. 2019
        </span>
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[10px] text-[#BBBBBB] tracking-widest"
            style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
          >
            SCROLL
          </span>
          <div className="w-[1px] h-12 bg-[#CCCCCC] animate-pulse-line" />
        </div>
      </div>
    </section>
  );
}
