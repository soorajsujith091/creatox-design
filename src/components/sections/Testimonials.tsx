"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { testimonials } from "@/data/testimonials";
import { SectionLabel } from "../SectionLabel";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 bg-[#F7F7F7] px-6 relative overflow-hidden" aria-label="Client Testimonials">
      
      {/* Giant Decorative Quote */}
      <div 
        className="absolute top-4 left-8 font-heading text-[280px] text-red leading-none pointer-events-none select-none"
        style={{ opacity: 0.06 }}
        aria-hidden="true"
      >
        &quot;
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <SectionLabel text="CLIENT LOVE" />
            <h2 className="font-heading text-fluid-2xl text-[#0A0A0A] font-semibold mt-4">
              See Why Clients Love Working With Us
            </h2>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-6">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex ? "bg-red w-4" : "bg-[#CCCCCC] w-2"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 border border-[#D0D0D0] flex items-center justify-center text-[#0A0A0A] hover:border-red hover:bg-red hover:text-white transition-all duration-300"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 border border-[#D0D0D0] flex items-center justify-center text-[#0A0A0A] hover:border-red hover:bg-red hover:text-white transition-all duration-300"
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Carousel — embla handles single-slide display via overflow-hidden */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-[0_0_100%] min-w-0"
              >
                <div className="max-w-4xl pr-8">
                  <blockquote className="font-body text-fluid-xl text-[#0A0A0A] italic font-light leading-[1.7] mb-10">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <div>
                    <div className="font-body text-[16px] text-[#0A0A0A] font-bold mb-1">
                      {testimonial.clientName}
                    </div>
                    <div className="font-mono text-[13px] text-gray">
                      {testimonial.clientLabel}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
