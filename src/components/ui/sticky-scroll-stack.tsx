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
      const precedingSection = stack?.querySelector<HTMLElement>(".ref-trust");
      if (!stack || !precedingSection) return;
      const measure = () => stack.style.setProperty("--stack-top", `${Math.min(0, window.innerHeight - precedingSection.offsetHeight)}px`);
      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(precedingSection);
      window.addEventListener("resize", measure);
      return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
    }, []);
    return <div ref={stackRef} className={cn("ref-scroll-stack", className)} {...props}>{children}</div>;
  },
);
