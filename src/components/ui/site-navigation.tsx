"use client";

/* cms-native-links */
import { PageAnchor } from "@/components/cms/PageContent";
/* cms-page-fields */
import { PageText, PageLink } from "@/components/cms/PageContent";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { innerServices } from "@/data/inner-services";
import { useScroll } from "./use-scroll";
import { MenuToggleIcon } from "./menu-toggle-icon";
import FloatingMenu from "./liquid-morph-floating-menu";
import "./site-navigation.css";

const about = [
  { label: "About us", href: "/about-us/" }, { label: "Our clients", href: "/our-clients/" },
  { label: "Our team", href: "/our-team/" }, { label: "Careers", href: "/career/" },
  { label: "Life at Creatox", href: "/lifecreatox/" },
];
const services = [{ label: "All services", href: "/services/" }, ...innerServices.map(s=>({label:s.title,href:`/service/${s.slug}/`}))];
const links = [{label:"Case studies",href:"/case-studies/"},{label:"Expo",href:"/grand-malabar-expo/"},{label:"Projects",href:"/projects/"},{label:"Contact",href:"/contact-us/"}];

export function SiteNavigation() {
  const pathname=usePathname();
  const root=useRef<HTMLElement>(null);
  const dialog=useRef<HTMLDialogElement>(null);
  const trigger=useRef<HTMLButtonElement>(null);
  const [open,setOpen]=useState(false);
  const scrolled=useScroll(10);
  const [mobile,setMobile]=useState(false);
  const sticky=mobile && scrolled;
  useEffect(() => {
    const header = root.current;
    if (!header) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let visible = false;
      let played = false;
      const context = gsap.context(() => {
        const entrance = gsap.timeline({ paused: true }).fromTo(
          header.querySelectorAll(".cx-brand, .cx-desktop > *, .cx-nav-contact, .cx-nav-toggle"),
          { autoAlpha: 0, y: -16 },
          { autoAlpha: 1, y: 0, duration: .85, stagger: .065, ease: "power3.out", clearProps: "transform,opacity,visibility" },
        );
        const play = () => {
          if (visible && !played && !document.querySelector("[data-site-preloader]")) {
            played = true;
            entrance.play();
            overlayObserver.disconnect();
            observer.disconnect();
          }
        };
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; play(); });
        const overlayObserver = new MutationObserver(play);
        observer.observe(header);
        overlayObserver.observe(document.body, { childList: true, subtree: true });
        return () => { observer.disconnect(); overlayObserver.disconnect(); };
      }, header);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  useEffect(()=>{
    const query=window.matchMedia("(max-width: 1100px)");
    const update=()=>setMobile(query.matches);
    update();
    query.addEventListener("change",update);
    return ()=>query.removeEventListener("change",update);
  },[]);
  const active=(href:string)=>pathname.replace(/\/$/,"")===href.replace(/\/$/,"");
  const close=()=>{setOpen(false);root.current?.querySelectorAll("details[open]").forEach(el=>el.removeAttribute("open"));};
  useEffect(()=>{setOpen(false);},[pathname]);
  useEffect(()=>{
    if(!open){dialog.current?.close();return;}
    dialog.current?.showModal();
    const previous=document.body.style.overflow;
    document.body.style.overflow="hidden";
    return ()=>{document.body.style.overflow=previous;dialog.current?.close();};
  },[open]);
  useEffect(()=>{
    const dismiss=(event:PointerEvent)=>{if(!root.current?.contains(event.target as Node))root.current?.querySelectorAll("details[open]").forEach(el=>el.removeAttribute("open"));};
    const escape=(event:KeyboardEvent)=>{if(event.key==="Escape")root.current?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach(el=>{el.open=false;el.querySelector("summary")?.focus();});};
    const resize=()=>{if(window.innerWidth>1100)setOpen(false);};
    document.addEventListener("pointerdown",dismiss);document.addEventListener("keydown",escape);window.addEventListener("resize",resize);
    return ()=>{document.removeEventListener("pointerdown",dismiss);document.removeEventListener("keydown",escape);window.removeEventListener("resize",resize);};
  },[]);
  const group=(label:string,items:typeof about)=> <details className={`cx-nav-group ${label==="Services"?"cx-nav-services":""}`} onToggle={event=>{if(event.currentTarget.open){const current=event.currentTarget;root.current?.querySelectorAll<HTMLDetailsElement>(".cx-desktop details[open]").forEach(other=>{if(other!==current)other.open=false;});}}}><summary><PageText field="234318f05_1" section="site navigation" label="Text">{label}</PageText><ChevronDown size={13} aria-hidden="true"/></summary><div className="cx-nav-dropdown">{items.map((link,index)=><PageLink field="234318f05_2" section="site navigation" style={{ animationDelay: `${index * .035}s` }} key={link.href} href={link.href} aria-current={active(link.href)?"page":undefined} onClick={close}><PageText field="234318f05_3" section="site navigation" label="Text">{link.label}</PageText><ArrowUpRight size={14} aria-hidden="true"/></PageLink>)}</div></details>;
  const header = <header ref={root} className={`cx-site-header cx-header-2${sticky ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
    <PageLink field="234318f05_4" section="site navigation" href="/" className="cx-brand" aria-label="Creatox Designs home"><BrandLogo className="cx-brand-image" priority/></PageLink>
    <nav className="cx-desktop" aria-label="Main navigation"><PageLink field="234318f05_5" section="site navigation" href="/" aria-current={active("/")?"page":undefined}><PageText field="234318f05_6" section="site navigation" label="Text">{"Home"}</PageText></PageLink>{group("About",about)}{group("Services",services)}{links.map(link=><PageLink field="234318f05_7" section="site navigation" key={link.href} href={link.href} aria-current={active(link.href)?"page":undefined}><PageText field="234318f05_8" section="site navigation" label="Text">{link.label}</PageText></PageLink>)}</nav>
    <PageLink field="234318f05_9" section="site navigation" href="/contact-us/" className="cx-nav-contact"><PageText field="234318f05_10" section="site navigation" label="Text">{"Let’s talk"}</PageText><ArrowUpRight size={16} aria-hidden="true"/></PageLink>
    <button ref={trigger} className="cx-nav-toggle" type="button" aria-label="Open navigation" aria-expanded={open} aria-haspopup="dialog" aria-controls="cx-mobile-navigation" onClick={()=>setOpen(true)}><MenuToggleIcon open={open}/></button>
    <dialog ref={dialog} id="cx-mobile-navigation" className="cx-mobile-dialog" aria-label="Site navigation" onCancel={()=>setOpen(false)} onClose={()=>{setOpen(false);trigger.current?.focus();}} data-lenis-prevent>
      <div className="cx-mobile-top"><PageLink field="234318f05_11" section="site navigation" href="/" onClick={close} aria-label="Creatox home"><BrandLogo className="cx-brand-image"/></PageLink><button type="button" aria-label="Close navigation" onClick={close}><MenuToggleIcon open={open}/></button></div>
      <nav aria-label="Mobile navigation"><PageLink field="234318f05_12" section="site navigation" href="/" onClick={close} aria-current={active("/")?"page":undefined}><PageText field="234318f05_13" section="site navigation" label="Text">{"Home"}</PageText><ArrowUpRight size={19}/></PageLink>{[{label:"About",items:about},{label:"Services",items:services}].map(group=><details key={group.label}><summary><PageText field="234318f05_14" section="site navigation" label="Text">{group.label}</PageText><ChevronDown size={20}/></summary><div>{group.items.map((link,index)=><PageLink field="234318f05_15" section="site navigation" style={{ animationDelay: `${index * .035}s` }} key={link.href} href={link.href} onClick={close} aria-current={active(link.href)?"page":undefined}><PageText field="234318f05_16" section="site navigation" label="Text">{link.label}</PageText><ArrowUpRight size={15}/></PageLink>)}</div></details>)}{links.map(link=><PageLink field="234318f05_17" section="site navigation" key={link.href} href={link.href} onClick={close} aria-current={active(link.href)?"page":undefined}><PageText field="234318f05_18" section="site navigation" label="Text">{link.label}</PageText><ArrowUpRight size={19}/></PageLink>)}<PageLink field="234318f05_19" section="site navigation" href="/blog/" onClick={close}><PageText field="234318f05_20" section="site navigation" label="Text">{"Blog & insights"}</PageText><ArrowUpRight size={19}/></PageLink></nav>
      <PageAnchor field="anchor_917dbafbc_1" section="site-navigation" className="cx-mobile-email" href="mailto:hello@creatoxdesigns.com"><PageText field="234318f05_21" section="site navigation" label="Text">{"hello@creatoxdesigns.com"}</PageText></PageAnchor>
    </dialog>
  </header>;
  // Keep the floating header above the homepage's stacked section contexts.
  return <><div className="cx-header-slot">{sticky ? createPortal(header, document.body) : header}</div><FloatingMenu items={[{label:"Home",href:"/"},{label:"About",children:about},{label:"Services",children:services},...links,{label:"Blog & insights",href:"/blog/"}]} /></>;
}
