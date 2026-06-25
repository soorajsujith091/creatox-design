"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { SectionLabel } from "../SectionLabel";

gsap.registerPlugin(ScrollTrigger);

export function SelectedWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-black px-6" aria-label="Selected Work">
      <div className="max-w-[1400px] mx-auto">
        <SectionLabel text="SELECTED WORK" />

        <div className="mb-16">
          <h2 className="font-heading text-fluid-3xl text-white font-semibold leading-[1.1] mb-4">
            <span className="block">Work That</span>
            <span className="block text-stroke">Speaks.</span>
          </h2>
          <p className="font-body text-gray text-[16px]">
            From Kannur to the world — brands we&apos;ve built.
          </p>
        </div>

        <div ref={containerRef} className="flex flex-col gap-10 lg:gap-16">
          {projects.map((project, i) => {
            const isImageRight = project.layout === "image-right";
            const isFullWidth = project.layout === "full-width";

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="group border border-border rounded-[4px] overflow-hidden bg-surface relative card-hover opacity-0 flex flex-col lg:flex-row"
                style={
                  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? { opacity: 1 }
                    : {}
                }
              >
                {/* Full Width Layout Overlay */}
                {isFullWidth && (
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                )}

                {/* Image Container */}
                <div
                  className={`relative overflow-hidden ${
                    isFullWidth
                      ? "w-full h-[500px]"
                      : "w-full lg:w-[60%] h-[300px] lg:h-[500px]"
                  } ${isImageRight ? "lg:order-2" : "lg:order-1"}`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover img-zoom"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  {/* Red hover overlay */}
                  <div className="absolute inset-0 bg-red/0 group-hover:bg-red/10 transition-colors duration-500 z-10 pointer-events-none" />
                </div>

                {/* Info Container */}
                <div
                  className={`p-8 lg:p-12 flex flex-col justify-center border-l-0 lg:border-l-[3px] border-transparent group-hover:border-red transition-colors duration-300 ${
                    isFullWidth
                      ? "absolute inset-0 z-20 justify-end bg-transparent border-none lg:border-none p-8"
                      : "w-full lg:w-[40%] bg-surface"
                  } ${isImageRight ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-red text-white font-mono text-[11px] px-3 py-1 rounded-[2px] uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-heading text-[22px] lg:text-[32px] text-white font-semibold mb-4">
                    {project.title}
                  </h3>

                  <p className={`font-body text-[15px] leading-relaxed mb-10 ${isFullWidth ? "text-gray-200 max-w-lg" : "text-gray"}`}>
                    {project.description}
                  </p>

                  <Link
                    href={project.link}
                    className="inline-flex items-center gap-2 font-mono text-[12px] text-red hover:text-white transition-colors w-fit mt-auto group/link"
                  >
                    View Project
                    <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-16">
          <Link
            href="/projects/"
            className="border border-white text-white px-8 py-4 text-[14px] font-body hover:bg-white hover:text-black transition-all duration-300"
          >
            More Works ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
