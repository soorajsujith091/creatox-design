"use client";

/* cms-page-fields */
import { PageText, PageLink } from "@/components/cms/PageContent";
import { useEffect, useRef } from "react";

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
    <summary><PageText field="518d84198_1" section="pages menu" label="Text">{"Pages "}</PageText><ChevronDown size={14} aria-hidden="true" /></summary>
    <div className="creatox-pages-panel" data-lenis-prevent>
      {pageGroups.map(group => <div key={group.title}><p><PageText field="518d84198_2" section="pages menu" label="Text">{group.title}</PageText></p>{group.links.map(link => <PageLink field="518d84198_3" section="pages menu" key={link.href} href={link.href} onClick={() => { if (details.current) details.current.open = false; }}><PageText field="518d84198_4" section="pages menu" label="Text">{link.label}</PageText><ArrowUpRight size={13} aria-hidden="true" /></PageLink>)}</div>)}
      <div><p><PageText field="518d84198_5" section="pages menu" label="Text">{"Our expertise"}</PageText></p>{innerServices.map(service => <PageLink field="518d84198_6" section="pages menu" key={service.slug} href={`/service/${service.slug}/`} onClick={() => { if (details.current) details.current.open = false; }}><PageText field="518d84198_7" section="pages menu" label="Text">{service.title}</PageText><ArrowUpRight size={13} aria-hidden="true" /></PageLink>)}</div>
    </div>
  </details>;
}
