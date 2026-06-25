"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { services } from "@/data/services";
import { SectionLabel } from "../SectionLabel";

export function ServicesAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate height changes for accordion content
    contentRefs.current.forEach((el, i) => {
      if (!el) return;

      if (i === openIndex) {
        gsap.to(el, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    });
  }, [openIndex]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-surface px-6" aria-label="Our Expertise">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left Column */}
        <div className="lg:w-[40%] flex flex-col items-start">
          <SectionLabel text="OUR EXPERTISE" />
          <h2 className="font-heading text-fluid-2xl text-white font-semibold leading-[1.1] mb-10 sticky top-32">
            Everything your brand needs to dominate online.
          </h2>
          <Link
            href="/service/branding-and-design/"
            className="hidden lg:inline-block border border-white text-white px-7 py-3.5 text-[14px] font-body text-center hover:bg-white hover:text-black transition-all duration-300"
          >
            See All Services →
          </Link>
        </div>

        {/* Right Column - Accordion */}
        <div className="lg:w-[60%] flex flex-col">
          <div className="border-t border-border" role="tablist">
            {services.map((service, i) => {
              const isOpen = openIndex === i;

              return (
                <div
                  key={service.id}
                  className="border-b border-border relative group"
                >
                  {/* Left Active Border */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[3px] bg-red transition-opacity duration-300 ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <button
                    className="w-full py-8 px-6 lg:px-8 flex items-center justify-between text-left focus:outline-none"
                    onClick={() => toggleAccordion(i)}
                    aria-expanded={isOpen}
                    aria-controls={`content-${service.id}`}
                    id={`tab-${service.id}`}
                    role="tab"
                  >
                    <div className="flex items-center gap-6">
                      <span
                        className={`font-mono text-[11px] transition-colors duration-300 ${
                          isOpen ? "text-red" : "text-red/60 group-hover:text-red"
                        }`}
                      >
                        {service.number}
                      </span>
                      <span
                        className={`font-body text-[18px] text-white transition-transform duration-250 ${
                          isOpen ? "translate-x-2" : "group-hover:translate-x-2"
                        }`}
                      >
                        {service.title}
                      </span>
                    </div>
                    <span
                      className="text-white text-2xl font-light transition-transform duration-300 origin-center"
                      style={{
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  <div
                    id={`content-${service.id}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${service.id}`}
                    ref={(el) => {
                      contentRefs.current[i] = el;
                    }}
                    className="overflow-hidden opacity-0"
                    style={{ height: i === 0 ? "auto" : 0 }} // Pre-set height for SSR/initial render
                  >
                    <div className="pb-8 px-6 lg:px-8 pl-[60px] lg:pl-[68px]">
                      <p className="font-body text-[15px] text-gray leading-relaxed max-w-xl mb-6">
                        {service.description}
                      </p>
                      <Link
                        href={service.link}
                        className="inline-block font-mono text-[12px] text-red hover:text-white transition-colors"
                      >
                        View Service →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="/service/branding-and-design/"
            className="lg:hidden mt-10 border border-white text-white px-7 py-3.5 text-[14px] font-body text-center hover:bg-white hover:text-black transition-all duration-300 self-start"
          >
            See All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
