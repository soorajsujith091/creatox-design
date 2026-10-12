"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "../SectionLabel";

gsap.registerPlugin(ScrollTrigger);

export function OurStory() {
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

            <Image
              src="/images/creatox-our-story.png"
              alt="Red sculptural ribbon surrounding a glass cube, representing creativity and connection"
              fill
              sizes="(max-width: 767px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
