"use client";
import type { ComponentProps } from "react";
import { useReducedMotion } from "framer-motion";

export function MenuToggleIcon({ open, duration = 300, ...props }: ComponentProps<"svg"> & { open: boolean; duration?: number }) {
  const reduced = useReducedMotion();
  const transition = `transform ${reduced ? 0 : duration}ms ease, opacity ${reduced ? 0 : duration}ms ease`;
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" {...props}>
    <path d="M4 6h16" style={{ transformOrigin: "12px 6px", transform: open ? "translateY(6px) rotate(45deg)" : "none", transition }} />
    <path d="M4 12h16" style={{ opacity: open ? 0 : 1, transition }} />
    <path d="M4 18h16" style={{ transformOrigin: "12px 18px", transform: open ? "translateY(-6px) rotate(-45deg)" : "none", transition }} />
  </svg>;
}
