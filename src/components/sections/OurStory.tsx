"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "../SectionLabel";

gsap.registerPlugin(ScrollTrigger);

export function OurStory() {
  const [videoError, setVideoError] = useState(false);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const visualContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Fade and slide text content
      gsap.fromTo(
        textContainerRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Fade visual container
      gsap.fromTo(
        visualContainerRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: visualContainerRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-[#F7F7F7] px-6 overflow-hidden" aria-label="Our Story">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-16 md:gap-8 items-center">
        {/* Left Content */}
        <div className="w-full md:w-[55%] flex flex-col" ref={textContainerRef}>
          <div className="opacity-0">
             <SectionLabel text="OUR STORY" />
          </div>
         
          <div className="mb-8 opacity-0">
            {/* "Since" with dark stroke on white/light bg */}
            <span className="font-heading text-[clamp(80px,10vw,140px)] leading-[0.8] text-stroke-dark block">
              Since
            </span>
            <span className="font-heading text-[clamp(80px,10vw,140px)] leading-[0.8] text-red font-bold block">
              2019
            </span>
          </div>

          <p className="font-body text-[17px] text-[#555555] leading-[1.9] max-w-md mb-10 opacity-0">
            In a world driven by clicks, conversations, and constant change, we took our first step with a bold belief — that brands deserve more than visibility; they deserve a voice. We began not just as marketers, but as storytellers, strategists, and dreamers, turning ideas into impact and strategies into growth.
          </p>

          <div className="opacity-0">
            <Link
              href="/about-us/"
              className="inline-block border border-[#0A0A0A] text-[#0A0A0A] px-6 py-3 text-[14px] font-body text-center hover:bg-red hover:text-white hover:border-red transition-all duration-300"
            >
              Know More →
            </Link>
          </div>
        </div>

        {/* Right Visual */}
        <div className="w-full md:w-[45%] relative" ref={visualContainerRef}>
          <div className="relative rounded-[4px] border border-[#E8E8E8] overflow-hidden md:sticky md:top-32 w-full aspect-square md:aspect-auto md:h-[600px] bg-[#F7F7F7] shadow-[0_4px_24px_rgba(0,0,0,0.08)]">

            {!videoError ? (
              <video
                src="https://creatoxdesigns.com/wp-content/uploads/2026/02/3d-glass-rotating-transparent-cube-and-circle-2026-01-28-03-20-02-utc.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setVideoError(true)}
              />
            ) : (
              /* Fallback 3D CSS Cube */
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative w-32 h-32 perspective-1000 animate-spin-slow" style={{ transformStyle: 'preserve-3d' }}>
                    <div className="absolute inset-0 border border-red/50 shadow-[0_0_20px_rgba(228,0,43,0.2)] bg-red/5" style={{ transform: 'translateZ(64px)' }} />
                    <div className="absolute inset-0 border border-red/50 shadow-[0_0_20px_rgba(228,0,43,0.2)] bg-red/5" style={{ transform: 'translateZ(-64px) rotateY(180deg)' }} />
                    <div className="absolute inset-0 border border-red/50 shadow-[0_0_20px_rgba(228,0,43,0.2)] bg-red/5" style={{ transform: 'translateX(64px) rotateY(90deg)' }} />
                    <div className="absolute inset-0 border border-red/50 shadow-[0_0_20px_rgba(228,0,43,0.2)] bg-red/5" style={{ transform: 'translateX(-64px) rotateY(-90deg)' }} />
                    <div className="absolute inset-0 border border-red/50 shadow-[0_0_20px_rgba(228,0,43,0.2)] bg-red/5" style={{ transform: 'translateY(64px) rotateX(-90deg)' }} />
                    <div className="absolute inset-0 border border-red/50 shadow-[0_0_20px_rgba(228,0,43,0.2)] bg-red/5" style={{ transform: 'translateY(-64px) rotateX(90deg)' }} />
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
