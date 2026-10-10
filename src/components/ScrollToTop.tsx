"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 400);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const scrollToTop = () => {
    const main = document.getElementById("main-content");
    if (main) {
      main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
    const nativeScroll = window.dispatchEvent(new Event("creatox:scroll-to-top", { cancelable: true }));
    if (nativeScroll) {
      window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
  };

  return <button
    type="button"
    aria-label="Scroll to top"
    title="Scroll to top"
    onClick={scrollToTop}
    tabIndex={visible ? 0 : -1}
    aria-hidden={!visible}
    className={`fixed right-5 z-[90] flex h-12 w-12 items-center justify-center rounded-full bg-red text-white shadow-lg transition-[opacity,transform,background-color] duration-300 hover:bg-redDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red motion-reduce:transition-none ${visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"}`}
    style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 80px)" }}
  ><ArrowUp size={22} aria-hidden="true"/></button>;
}
