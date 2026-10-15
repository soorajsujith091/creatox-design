"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { pageGroups } from "@/data/page-navigation";
import { innerServices } from "@/data/inner-services";
import "./pages-menu.css";

export function PagesMenu() {
  const details = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!details.current?.contains(event.target as Node)) details.current?.removeAttribute("open"); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape" && details.current?.open) { details.current.open = false; details.current.querySelector("summary")?.focus(); } };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, []);
  return <details ref={details} className="creatox-pages-menu">
    <summary>Pages <ChevronDown size={14} aria-hidden="true" /></summary>
    <div className="creatox-pages-panel" data-lenis-prevent>
      {pageGroups.map(group => <div key={group.title}><p>{group.title}</p>{group.links.map(link => <Link key={link.href} href={link.href} onClick={() => { if (details.current) details.current.open = false; }}>{link.label}<ArrowUpRight size={13} aria-hidden="true" /></Link>)}</div>)}
      <div><p>Our expertise</p>{innerServices.map(service => <Link key={service.slug} href={`/service/${service.slug}/`} onClick={() => { if (details.current) details.current.open = false; }}>{service.title}<ArrowUpRight size={13} aria-hidden="true" /></Link>)}</div>
    </div>
  </details>;
}
