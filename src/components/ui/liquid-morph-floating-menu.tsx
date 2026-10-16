"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";
import { useScroll } from "./use-scroll";
import "./liquid-morph-floating-menu.css";

type MenuItem = { label: string; href?: string; children?: { label: string; href: string }[] };
const ease = [0.22, 1, 0.36, 1] as const;

// Adapted from the supplied liquid morph menu, with real navigation links.
export default function FloatingMenu({ items }: { items: MenuItem[] }) {
  const [desktop, setDesktop] = useState(false);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const id = useId();
  const scrolled = useScroll(80);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1101px)");
    const update = () => { setDesktop(query.matches); setOpen(false); };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { if (!scrolled) setOpen(false); }, [scrolled]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  if (!desktop || !scrolled) return null;
  const close = () => setOpen(false);
  const active = (href: string) => pathname.replace(/\/$/, "") === href.replace(/\/$/, "");
  const label = (text: string) => <span className="cx-liquid-label" aria-label={text}><span aria-hidden="true">{Array.from(text).map((char, index) => <span className="cx-liquid-char" key={index}><span style={{ transitionDelay: reduced ? "0ms" : `${index * 20}ms` }}><span>{char === " " ? "\u00a0" : char}</span><span>{char === " " ? "\u00a0" : char}</span></span></span>)}</span></span>;

  return createPortal(<div ref={root} className="cx-liquid-menu" onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
  }}>
    <motion.div className={`cx-liquid-shell${open ? " is-open" : ""}`} initial={false}
      animate={{ width: open ? 310 : 150, borderRadius: open ? 28 : 32 }}
      transition={{ duration: reduced ? 0 : .55, ease }}>
      <motion.div className="cx-liquid-circle" aria-hidden="true" initial={false}
        animate={{ scale: open ? 1 : 0 }} transition={{ duration: reduced ? 0 : .65, ease }} />
      {open && <motion.nav id={id} aria-label="Floating site navigation" className="cx-liquid-links" data-lenis-prevent
        initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .35, delay: reduced ? 0 : .1 }}>
        {items.map(item => item.children ? <details key={item.label}>
          <summary aria-label={item.label}>{label(item.label)}<ChevronDown size={16} aria-hidden="true" /></summary>
          <div className="cx-liquid-submenu">{item.children.map(child => <Link key={child.href} href={child.href} aria-current={active(child.href) ? "page" : undefined} onClick={close}>{child.label}</Link>)}</div>
        </details> : <Link key={item.label} href={item.href!} aria-label={item.label} aria-current={active(item.href!) ? "page" : undefined} onClick={close}>{label(item.label)}</Link>)}
      </motion.nav>}
      <button ref={trigger} type="button" className="cx-liquid-trigger" aria-expanded={open} aria-controls={open ? id : undefined} aria-label={open ? "Close floating navigation" : "Open floating navigation"} onClick={() => setOpen(value => !value)}>
        <span>Menu</span><motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: reduced ? 0 : .3 }}><Plus size={22} aria-hidden="true" /></motion.span>
      </button>
    </motion.div>
  </div>, document.body);
}
