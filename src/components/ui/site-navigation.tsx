"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
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
  const group=(label:string,items:typeof about)=> <details className={`cx-nav-group ${label==="Services"?"cx-nav-services":""}`} onToggle={event=>{if(event.currentTarget.open){const current=event.currentTarget;root.current?.querySelectorAll<HTMLDetailsElement>(".cx-desktop details[open]").forEach(other=>{if(other!==current)other.open=false;});}}}><summary>{label}<ChevronDown size={13} aria-hidden="true"/></summary><div className="cx-nav-dropdown">{items.map(link=><Link key={link.href} href={link.href} aria-current={active(link.href)?"page":undefined} onClick={close}>{link.label}<ArrowUpRight size={14} aria-hidden="true"/></Link>)}</div></details>;
  const header = <header ref={root} className={`cx-site-header cx-header-2${sticky ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
    <Link href="/" className="cx-brand" aria-label="Creatox Designs home"><BrandLogo className="cx-brand-image" priority/></Link>
    <nav className="cx-desktop" aria-label="Main navigation"><Link href="/" aria-current={active("/")?"page":undefined}>Home</Link>{group("About",about)}{group("Services",services)}{links.map(link=><Link key={link.href} href={link.href} aria-current={active(link.href)?"page":undefined}>{link.label}</Link>)}</nav>
    <Link href="/contact-us/" className="cx-nav-contact">Let’s talk<ArrowUpRight size={16} aria-hidden="true"/></Link>
    <button ref={trigger} className="cx-nav-toggle" type="button" aria-label="Open navigation" aria-expanded={open} aria-haspopup="dialog" aria-controls="cx-mobile-navigation" onClick={()=>setOpen(true)}><MenuToggleIcon open={open}/></button>
    <dialog ref={dialog} id="cx-mobile-navigation" className="cx-mobile-dialog" aria-label="Site navigation" onCancel={()=>setOpen(false)} onClose={()=>{setOpen(false);trigger.current?.focus();}} data-lenis-prevent>
      <div className="cx-mobile-top"><Link href="/" onClick={close} aria-label="Creatox home"><BrandLogo className="cx-brand-image"/></Link><button type="button" aria-label="Close navigation" onClick={close}><MenuToggleIcon open={open}/></button></div>
      <nav aria-label="Mobile navigation"><Link href="/" onClick={close} aria-current={active("/")?"page":undefined}>Home<ArrowUpRight size={19}/></Link>{[{label:"About",items:about},{label:"Services",items:services}].map(group=><details key={group.label}><summary>{group.label}<ChevronDown size={20}/></summary><div>{group.items.map(link=><Link key={link.href} href={link.href} onClick={close} aria-current={active(link.href)?"page":undefined}>{link.label}<ArrowUpRight size={15}/></Link>)}</div></details>)}{links.map(link=><Link key={link.href} href={link.href} onClick={close} aria-current={active(link.href)?"page":undefined}>{link.label}<ArrowUpRight size={19}/></Link>)}<Link href="/blog/" onClick={close}>Blog & insights<ArrowUpRight size={19}/></Link></nav>
      <a className="cx-mobile-email" href="mailto:hello@creatoxdesigns.com">hello@creatoxdesigns.com</a>
    </dialog>
  </header>;
  // Keep the floating header above the homepage's stacked section contexts.
  return <><div className="cx-header-slot">{sticky ? createPortal(header, document.body) : header}</div><FloatingMenu items={[{label:"Home",href:"/"},{label:"About",children:about},{label:"Services",children:services},...links,{label:"Blog & insights",href:"/blog/"}]} /></>;
}
