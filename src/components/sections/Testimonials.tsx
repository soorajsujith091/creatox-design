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
    <section className="py-24 bg-black px-6 relative overflow-hidden" aria-label="Client Testimonials">
      
      {/* Giant Decorative Quote */}
      <div 
        className="absolute top-4 left-8 font-heading text-[280px] text-red opacity-5 leading-none pointer-events-none select-none"
        aria-hidden="true"
      >
        &quot;
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <SectionLabel text="CLIENT LOVE" />
            <h2 className="font-heading text-fluid-2xl text-white font-semibold mt-4">
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
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex ? "bg-red w-4" : "bg-[#333]"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 border border-[#333] flex items-center justify-center text-white hover:border-red hover:bg-red transition-all duration-300"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 border border-[#333] flex items-center justify-center text-white hover:border-red hover:bg-red transition-all duration-300"
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-[0_0_100%] min-w-0"
              >
                <div className="max-w-4xl pr-8">
                  <blockquote className="font-body text-fluid-xl text-white italic font-light leading-[1.6] mb-10">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <div>
                    <div className="font-body text-[16px] text-white font-bold mb-1">
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
