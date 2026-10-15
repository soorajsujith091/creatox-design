"use client";

import { useEffect, useRef, useState } from "react";

export interface PerspectiveMarqueeProps {
  items: { name: string; file: string }[];
  rotateY?: number;
  rotateX?: number;
  perspective?: number;
  pixelsPerFrame?: number;
  speed?: number;
  paused?: boolean;
}

export function PerspectiveMarquee({ items, rotateY = -28, rotateX = 8, perspective = 1200, pixelsPerFrame = 2, speed = 1, paused = false }: PerspectiveMarqueeProps) {
  const [frame, setFrame] = useState(0);
  const elapsed = useRef(0);
  useEffect(() => {
    if (paused) return;
    let request = 0;
    let previous: number | undefined;
    const animate = (time: number) => {
      if (previous !== undefined && !document.hidden) elapsed.current += Math.min(time - previous, 64);
      previous = time;
      setFrame(elapsed.current * .03);
      request = requestAnimationFrame(animate);
    };
    request = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(request);
  }, [paused]);
  const itemWidth = 240;
  const totalWidth = items.length * itemWidth;
  const offset = totalWidth ? -((frame * pixelsPerFrame * speed) % totalWidth) : 0;
  return <div style={{ position: "absolute", inset: 0, background: "#000", display: "flex", alignItems: "center", overflow: "hidden", perspective }}>
    <div style={{ width: "100%", transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, transformStyle: "preserve-3d" }}>
      <div style={{ display: "flex", width: "max-content", transform: `translateX(${offset}px)` }}>
        {[...items, ...items, ...items].map((item, index) => {
          const center = index * itemWidth + itemWidth / 2 + offset;
          const distance = Math.min(1, Math.abs((center - 600) / 600));
          return <div key={`${index}-${item.name}`} style={{ width: itemWidth, flexShrink: 0, padding: "0 18px", filter: `blur(${distance * 3}px)`, opacity: 1 - distance * .3 }}>
            <div style={{ height: 112, background: "#fff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", padding: 18 }}>
              <img src={`/images/${item.file}`} alt={item.name} width={168} height={76} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          </div>;
        })}
      </div>
    </div>
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(90deg,#000,transparent 18%,transparent 82%,#000)" }} />
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(180deg,#000,transparent 25%,transparent 75%,#000)" }} />
  </div>;
}

export default PerspectiveMarquee;
