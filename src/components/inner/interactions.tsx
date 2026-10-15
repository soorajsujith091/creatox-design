"use client";

import { useState, type ReactNode, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { NotchedProjectCard } from "@/components/ui/notched-project-card";
import { companyInfo } from "@/data/stats";
import { innerServices } from "@/data/inner-services";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .8, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

// Adapted from Bundui's Magnetic Button interaction on 21st.dev.
// https://21st.dev/community/components/bundui/magnetic-button/default
export function MagneticLink({ href, children }: { href: string; children: ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  return <motion.a className="ip-button" href={href} animate={position} transition={{ type: "spring", stiffness: 180, damping: 15 }} onPointerMove={event => {
    if (reduced || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition({ x: (event.clientX - bounds.left - bounds.width / 2) * .12, y: (event.clientY - bounds.top - bounds.height / 2) * .12 });
  }} onPointerLeave={() => setPosition({ x: 0, y: 0 })}>{children}<ArrowUpRight size={18} aria-hidden="true" /></motion.a>;
}

export type ListingItem = { slug: string; title: string; description: string; image: string; tags?: string[]; href: string; date?: string };
export function ContentGrid({ items, kind }: { items: ListingItem[]; kind: "projects" | "articles" }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [limit, setLimit] = useState(9);
  const categories = ["All", ...Array.from(new Set(items.flatMap(item => item.tags || [])))];
  const filtered = items.filter(item => `${item.title} ${item.description}`.toLowerCase().includes(query.toLowerCase()) && (category === "All" || item.tags?.includes(category)));
  return <>
    <div className="ip-list-controls"><div className="ip-filters" aria-label={`Filter ${kind}`}>{categories.map(tag => <button key={tag} type="button" aria-pressed={category === tag} onClick={() => { setCategory(tag); setLimit(9); }}>{tag}</button>)}</div><label className="ip-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Search {kind}</span><input value={query} onChange={e => { setQuery(e.target.value); setLimit(9); }} placeholder={`Search ${kind}`} type="search" /></label></div>
    <p className="ip-results" role="status">{filtered.length} {kind}</p>
    <div className="ip-card-grid">{filtered.slice(0, limit).map(item => <Reveal key={item.slug}><NotchedProjectCard href={item.href} title={item.title} description={item.description} image={item.image} imageAlt={item.title} tags={item.tags} badge={item.date ? new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : undefined} surface="#0a0a0a" accent="#e4002b" accentForeground="#fff" /></Reveal>)}</div>
    {!filtered.length && <p className="ip-empty">No matches. Try another search or category.</p>}
    {limit < filtered.length && <button className="ip-button ip-load" type="button" onClick={() => setLimit(value => value + 9)}>Load more {kind}</button>}
  </>;
}

export function EnquiryForm({ career = false }: { career?: boolean }) {
  const [ready, setReady] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `${career ? "Career enquiry" : "Project enquiry"}: ${data.get("service") || data.get("name")}`;
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone") || "Not supplied"}\n${career ? "Role / portfolio" : "Service"}: ${data.get("service") || "Not sure yet"}\n\n${data.get("message")}`;
    window.location.href = `mailto:${companyInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setReady(true);
  };
  return <form onSubmit={submit} className="ip-form" aria-label={career ? "Career enquiry" : "Project enquiry"}>
    <div className="ip-form-grid"><label>Your name *<input name="name" autoComplete="name" required maxLength={120} /></label><label>Email address *<input name="email" autoComplete="email" type="email" required maxLength={254} /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>{career ? <label>Role / portfolio link<input name="service" maxLength={500} /></label> : <label>What can we help with?<select name="service" defaultValue=""><option value="">Not sure yet</option>{innerServices.map(service => <option key={service.slug}>{service.title}</option>)}</select></label>}</div>
    <label>{career ? "Tell us about yourself" : "Tell us about your project"} *<textarea name="message" required rows={5} maxLength={5000} /></label>
    <button className="ip-button" type="submit">{career ? "Create application email" : "Create enquiry email"}<ArrowUpRight size={18} aria-hidden="true" /></button>
    <p className="ip-form-note">Opens your email app. Review and send your message there.{career && " Attach your CV to the email before sending."}</p>
    {ready && <p role="status">Your draft is ready. If your email app did not open, email <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>.</p>}
  </form>;
}
