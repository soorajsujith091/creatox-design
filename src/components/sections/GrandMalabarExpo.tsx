"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "../SectionLabel";

gsap.registerPlugin(ScrollTrigger);

export function GrandMalabarExpo() {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax effect on image
      gsap.to(imageRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-surface px-6 overflow-hidden" aria-label="Grand Malabar Expo Feature">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24" ref={containerRef}>
        
        {/* Left Content */}
        <div className="lg:w-[55%] flex flex-col justify-center">
          <SectionLabel text="GRAND MALABAR EXPO" />
          
          <h2 className="font-heading text-[48px] text-white font-semibold leading-tight mb-2">
            Grand Malabar Expo 2025
          </h2>
          <p className="font-body text-[18px] text-gray mb-12">
            Creatox as Official Social Media Partner
          </p>

          <div className="flex flex-col gap-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-full bg-red/10 flex items-center justify-center text-red mt-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading text-[20px] text-white font-bold mb-2">High Walk-Ins</h3>
                <p className="font-body text-[15px] text-gray leading-relaxed">
                  Strong on-ground footfall with continuous visitor engagement throughout the event.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-full bg-red/10 flex items-center justify-center text-red mt-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m11 17 2 2a1 1 0 1 0 3-3" />
                  <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
                  <path d="m21 3 1 11h-2" />
                  <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
                  <path d="M3 4h8" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading text-[20px] text-white font-bold mb-2">Powerful Business Connections</h3>
                <p className="font-body text-[15px] text-gray leading-relaxed">
                  Meaningful B2B networking, partnerships, and direct client interactions.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-12 mb-12 pb-12 border-b border-border">
            <div>
              <div className="font-heading text-[40px] text-red font-bold leading-none mb-2">1L+</div>
              <div className="font-mono text-[11px] text-gray uppercase tracking-widest">Happy Visitors</div>
            </div>
            <div>
              <div className="font-heading text-[40px] text-red font-bold leading-none mb-2">21M+</div>
              <div className="font-mono text-[11px] text-gray uppercase tracking-widest">Views</div>
            </div>
          </div>

          <Link
            href="/grand-malabar-expo/"
            className="inline-block border border-white text-white px-8 py-4 text-[14px] font-body hover:bg-white hover:text-black transition-all duration-300 w-fit"
          >
            More Details →
          </Link>
        </div>

        {/* Right Image */}
        <div className="lg:w-[45%] h-[500px] lg:h-auto relative rounded-[4px] overflow-hidden border border-[#333]">
          <Image
            ref={imageRef as React.RefObject<HTMLImageElement>}
            src="https://creatoxdesigns.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-24-at-5.15.02-PM.jpeg"
            alt="Grand Malabar Expo 2025"
            fill
            className="object-cover scale-[1.15]" 
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </div>
    </section>
  );
}
