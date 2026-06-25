"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsComplete(true);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        document.body.style.overflow = "auto";
      },
    });

    // Prevent scroll during preloader
    document.body.style.overflow = "hidden";

    // Get all SVG path elements
    const paths = svgRef.current?.querySelectorAll("path");
    if (paths) {
      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      });

      // Animate each letter stroke
      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 0.15,
        stagger: 0.08,
        ease: "power2.inOut",
      });
    }

    // Red dot appears
    if (dotRef.current) {
      tl.fromTo(
        dotRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)" },
        "-=0.1"
      );
    }

    // Hold for a moment
    tl.to({}, { duration: 0.2 });

    // Curtain wipe up
    if (containerRef.current) {
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.6,
        ease: "power3.inOut",
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-black flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="relative flex items-center">
        <svg
          ref={svgRef}
          viewBox="0 0 480 60"
          className="w-[280px] md:w-[400px] h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* C */}
          <path
            d="M10 50 C10 50 2 50 2 30 C2 10 10 10 25 10 L30 10"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* R */}
          <path
            d="M50 50 L50 10 L65 10 C75 10 75 28 65 28 L50 28 L75 50"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* E */}
          <path
            d="M100 50 L100 10 L120 10 M100 30 L115 30 M100 50 L120 50"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* A */}
          <path
            d="M140 50 L155 10 L170 50 M145 35 L165 35"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* T */}
          <path
            d="M185 10 L215 10 M200 10 L200 50"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* O */}
          <path
            d="M235 30 C235 10 255 10 255 30 C255 50 235 50 235 30 Z"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* X */}
          <path
            d="M275 10 L305 50 M305 10 L275 50"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Red dot after X */}
        <div
          ref={dotRef}
          className="w-3 h-3 rounded-full bg-red ml-2 opacity-0"
          style={{ transform: "scale(0)" }}
        />
      </div>
    </div>
  );
}
