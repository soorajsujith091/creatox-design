"use client";

/* cms-page-fields */
import { PageNativeImage, PageText } from "@/components/cms/PageContent";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { PerspectiveMarquee, type PerspectiveMarqueeProps } from "./remocn-perspective-marquee";

export function BrandPerspectiveMarquee({ items }: Pick<PerspectiveMarqueeProps, "items">) {
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1200);
  const visible = useInView(container);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  // Crop the moving track on phones instead of shrinking every logo to fit.
  const scale = width < 768 ? Math.max(width / 1200, 0.65) : width / 1200;
  useEffect(() => {
    if (!container.current) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={container} className="brand-perspective-marquee">
    {reduced ? <div className="brand-perspective-static">{items.map(item => <PageNativeImage field="1d0cb5273_1" section="brand perspective marquee" key={item.name} src={`/images/${item.file}`} alt={item.name} width={144} height={64} />)}</div> : <>
      <div aria-hidden="true" style={{ position: "relative", height: 280 * scale, overflow: "hidden" }}><div style={{ position: "absolute", left: (width - 1200 * scale) / 2, width: 1200, height: 280, transform: `scale(${scale})`, transformOrigin: "top left" }}><PerspectiveMarquee items={items} paused={paused || !visible} /></div></div>
      <span className="sr-only"><PageText field="1d0cb5273_2" section="brand perspective marquee" label="Text">{"Client brands: "}</PageText>{items.map(item => item.name).join(", ")}</span>
      <button type="button" className="brand-perspective-toggle" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play brand animation" : "Pause brand animation"}>{paused ? <Play size={14} /> : <Pause size={14} />}<PageText field="1d0cb5273_3" section="brand perspective marquee" label="Text">{paused ? "Play" : "Pause"}</PageText></button>
    </>}
  </div>;
}
