"use client";

/* cms-native-links */
import { PageAnchor } from "@/components/cms/PageContent";
/* cms-page-fields */
import { PageText, PageLink } from "@/components/cms/PageContent";
import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { companyInfo } from "@/data/stats";

gsap.registerPlugin(ScrollTrigger);

export function CTABanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordsRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-32 bg-black overflow-hidden flex items-center" aria-label="Call to Action">
      {/* Subtle red gradient — bottom-right, premium feel on dark bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, transparent 60%, rgba(228,0,43,0.12) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 site-content site-gutter w-full" ref={containerRef}>
        <h2 className="font-heading text-[clamp(52px,10vw,140px)] leading-[0.9] tracking-tight font-bold mb-6">
          <div
            ref={(el) => { wordsRef.current[0] = el; }}
            className="text-white"
            style={
              typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? {}
                : { clipPath: "inset(100% 0 0 0)" }
            }
          >
            Let&apos;s Create
          </div>
          <div
            ref={(el) => { wordsRef.current[1] = el; }}
            className="text-white"
            style={
              typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? {}
                : { clipPath: "inset(100% 0 0 0)" }
            }
          >
            Something
          </div>
          <div
            ref={(el) => { wordsRef.current[2] = el; }}
            className="text-stroke"
            style={
              typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? {}
                : { clipPath: "inset(100% 0 0 0)" }
            }
          >
            Great.
          </div>
        </h2>

        <p className="font-body text-[16px] text-[#666] max-w-md mb-10">
          <PageText field="4b794b0ef_1" section="CTABanner" label="Text">{"Have a project in mind? We'd love to hear about it."}</PageText></p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <PageLink field="4b794b0ef_2" section="CTABanner"
            href="/contact-us/"
            className="bg-red text-white px-8 py-4 text-[14px] font-body text-center hover:bg-redDark transition-colors duration-300 w-full sm:w-auto"
          >
            <PageText field="4b794b0ef_3" section="CTABanner" label="Text">{"Start a Project →"}</PageText></PageLink>
          <PageLink field="4b794b0ef_4" section="CTABanner"
            href="/projects/"
            className="border border-white text-white px-8 py-4 text-[14px] font-body text-center hover:bg-[#111111] hover:text-white transition-all duration-300 w-full sm:w-auto"
          >
            <PageText field="4b794b0ef_5" section="CTABanner" label="Text">{"View Our Work ↗"}</PageText></PageLink>
        </div>

        <div className="flex flex-wrap gap-8 items-center border-t border-border pt-8">
          <PageAnchor field="anchor_903b94642_1" section="CTABanner"
            href={`mailto:${companyInfo.email}`}
            className="font-mono text-[13px] text-[#555] hover:text-white transition-colors"
          >
            <PageText field="4b794b0ef_6" section="CTABanner" label="Text">{"📧 "}</PageText><PageText field="4b794b0ef_7" section="CTABanner" label="Text">{companyInfo.email}</PageText>
          </PageAnchor>
          <PageAnchor field="anchor_903b94642_2" section="CTABanner"
            href={`tel:${companyInfo.phone1.replace(/\s/g, "")}`}
            className="font-mono text-[13px] text-[#555] hover:text-white transition-colors"
          >
            <PageText field="4b794b0ef_8" section="CTABanner" label="Text">{"📞 "}</PageText><PageText field="4b794b0ef_9" section="CTABanner" label="Text">{companyInfo.phone1}</PageText>
          </PageAnchor>
          <span className="font-mono text-[13px] text-[#555]">
            <PageText field="4b794b0ef_10" section="CTABanner" label="Text">{"📍 "}</PageText><PageText field="4b794b0ef_11" section="CTABanner" label="Text">{companyInfo.addressShort}</PageText>
          </span>
        </div>
      </div>
    </section>
  );
}
