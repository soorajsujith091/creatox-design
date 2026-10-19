import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

/** Decorative grid and Creatox red glow; place inside a positioned container. */
export function Component({ className, fixed = false }: { className?: string; fixed?: boolean }) {
  const backgroundStyle: CSSProperties = {
      backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,.045) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,.045) 1px, transparent 1px),
        radial-gradient(circle 800px at 100% 200px, rgba(228,0,43,.28), transparent)
      `,
      backgroundSize: "96px 64px, 96px 64px, 100% 100%",
      maskImage: "none",
      WebkitMaskImage: "none",
  };

  if (fixed) {
    return <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 z-0", className)}>
      <div style={{ ...backgroundStyle, position: "sticky", top: 0, height: "100svh", maxHeight: "100%", width: "100%" }} />
    </div>;
  }

  return <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 z-0", className)} style={backgroundStyle} />;
}
