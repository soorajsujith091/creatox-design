"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Section stacking with the site's existing smooth scrolling provider. */
export const StickyScrollStack = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function StickyScrollStack({ children, className, ...props }, ref) {
    const stackRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => stackRef.current!, []);
    useEffect(() => {
      const stack = stackRef.current;
      const hero = stack?.querySelector<HTMLElement>(".ref-hero");
      if (!stack || !hero) return;
      const measure = () => stack.style.setProperty("--stack-top", `${Math.min(0, window.innerHeight - hero.offsetHeight)}px`);
      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(hero);
      window.addEventListener("resize", measure);
      return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
    }, []);
    return <div ref={stackRef} className={cn("ref-scroll-stack", className)} {...props}>{children}</div>;
  },
);
