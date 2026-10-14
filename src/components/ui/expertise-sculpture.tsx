"use client";

import Image from "next/image";
import { useRef, type PointerEvent } from "react";

export function ExpertiseSculpture({ label }: { variant: number; label: string }) {
  const artwork = useRef<HTMLDivElement>(null);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    if (artwork.current) artwork.current.style.transform = `perspective(700px) rotateX(${-y * 20}deg) rotateY(${x * 24}deg) scale(1.04)`;
  };
  const reset = () => { if (artwork.current) artwork.current.style.transform = ""; };
  return (
    <div className="expertise-sculpture expertise-papillon" onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
      <div ref={artwork} className="expertise-papillon-artwork">
        <Image className="expertise-papillon-animation" src="/images/expertise-papillon.gif" alt={`Animated iridescent metallic butterfly sculpture for ${label}`} fill unoptimized sizes="(max-width: 600px) 100vw, 25vw" />
        <Image className="expertise-papillon-still" src="/images/expertise-papillon-still.png" alt={`Iridescent metallic butterfly sculpture for ${label}`} fill sizes="(max-width: 600px) 100vw, 25vw" />
      </div>
    </div>
  );
}
