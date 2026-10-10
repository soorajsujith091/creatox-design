"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

/** Adapted from the supplied 21st.dev / Osmo parallax component.
 * Children retain the site's content; data attributes identify moving layers.
 */
export function ParallaxComponent({ children }: { children: ReactNode }) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    let cleanupScroll: (() => void) | undefined;

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const root = parallaxRef.current;
      if (!root) return;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const hero = root.querySelector<HTMLElement>("[data-parallax-layers]");
      if (hero) {
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: hero, start: "top top", end: "bottom top", scrub: true,
          invalidateOnRefresh: true,
        } });
        [
          { layer: "1", yPercent: mobile ? 12 : 25 },
          { layer: "2", yPercent: mobile ? 5 : 12 },
          { layer: "3", yPercent: mobile ? 8 : 18 },
          { layer: "4", yPercent: mobile ? 3 : 7 },
        ].forEach(({ layer, yPercent }) => {
          timeline.to(hero.querySelectorAll(`[data-parallax-layer="${layer}"]`), { yPercent, ease: "none" }, 0);
        });
      }
      root.querySelectorAll<HTMLElement>("[data-parallax-card]").forEach((card, index) => {
        gsap.fromTo(card, { y: mobile ? 12 : 30 + index * 10 }, {
          y: mobile ? -8 : -20, ease: "none", scrollTrigger: {
            trigger: card.parentElement, start: "top bottom", end: "bottom top", scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });

      const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);

      const navigate = (event: MouseEvent) => {
        if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
        const anchor = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
        if (!anchor || anchor.target || anchor.download || !anchor.hash || anchor.origin !== location.origin || anchor.pathname !== location.pathname) return;
        const target = document.getElementById(decodeURIComponent(anchor.hash.slice(1)));
        if (!target) return;
        event.preventDefault();
        lenis.scrollTo(target, { offset: -24, onComplete: () => {
          const focusable = target.matches("a,button,input,textarea,select,[tabindex]");
          if (!focusable) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        } });
        history.pushState(null, "", anchor.hash);
      };
      document.addEventListener("click", navigate);
      const scrollToTop = (event: Event) => {
        event.preventDefault();
        lenis.scrollTo(0);
      };
      window.addEventListener("creatox:scroll-to-top", scrollToTop);
      cleanupScroll = () => {
        window.removeEventListener("creatox:scroll-to-top", scrollToTop);
        document.removeEventListener("click", navigate);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
      return () => { cleanupScroll?.(); cleanupScroll = undefined; };
    }, parallaxRef);

    return () => { media.revert(); cleanupScroll?.(); };
  }, []);

  return <div ref={parallaxRef} className="creatox-parallax">{children}</div>;
}
