"use client";

/* cms-page-fields */
import { PageText } from "@/components/cms/PageContent";
import { useState, type ReactNode, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { NotchedProjectCard } from "@/components/ui/notched-project-card";
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
    <div className="ip-list-controls"><div className="ip-filters" aria-label={`Filter ${kind}`}>{categories.map(tag => <button key={tag} type="button" aria-pressed={category === tag} onClick={() => { setCategory(tag); setLimit(9); }}><PageText field="f1220f6e9_1" section="interactions" label="Text">{tag}</PageText></button>)}</div><label className="ip-search"><Search size={18} aria-hidden="true" /><span className="sr-only"><PageText field="f1220f6e9_2" section="interactions" label="Text">{"Search "}</PageText><PageText field="f1220f6e9_3" section="interactions" label="Text">{kind}</PageText></span><input value={query} onChange={e => { setQuery(e.target.value); setLimit(9); }} placeholder={`Search ${kind}`} type="search" /></label></div>
    <p className="ip-results" role="status"><PageText field="f1220f6e9_4" section="interactions" label="Text">{filtered.length}</PageText> <PageText field="f1220f6e9_5" section="interactions" label="Text">{kind}</PageText></p>
    <div className="ip-card-grid">{filtered.slice(0, limit).map(item => <Reveal key={item.slug}><NotchedProjectCard href={item.href} title={item.title} description={item.description} image={item.image} imageAlt={item.title} tags={item.tags} badge={item.date ? new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : undefined} surface="#0a0a0a" accent="#DC0208" accentForeground="#fff" /></Reveal>)}</div>
    {!filtered.length && <p className="ip-empty"><PageText field="f1220f6e9_6" section="interactions" label="Text">{"No matches. Try another search or category."}</PageText></p>}
    {limit < filtered.length && <button className="ip-button ip-load" type="button" onClick={() => setLimit(value => value + 9)}><PageText field="f1220f6e9_7" section="interactions" label="Button text">{"Load more "}</PageText><PageText field="f1220f6e9_8" section="interactions" label="Text">{kind}</PageText></button>}
  </>;
}

export function EnquiryForm({ career = false }: { career?: boolean }) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true);setStatus("");
    try {
      const response = await fetch("/api/leads", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:String(data.get("name")||""),email:String(data.get("email")||""),phone:String(data.get("phone")||""),service:`${career?"Career: ":""}${data.get("service")||"General enquiry"}`,message:String(data.get("message")||""),website:String(data.get("website")||"")})});
      const result=await response.json();if(!response.ok)throw new Error(result.error || result.message || "Please check the form and try again.");
      form.reset();setStatus("Thank you. Your enquiry has reached our team. We will be in touch soon.");
    } catch(error){setStatus((error as Error).message||"Unable to send. Please email hello@creatoxdesigns.com.");}finally{setBusy(false);}
  };
  return <form onSubmit={submit} className="ip-form" aria-label={career ? "Career enquiry" : "Project enquiry"}>
    <div className="ip-form-grid"><label><PageText field="f1220f6e9_9" section="interactions" label="Text">{"Your name *"}</PageText><input name="name" autoComplete="name" required maxLength={120} /></label><label><PageText field="f1220f6e9_10" section="interactions" label="Text">{"Email address *"}</PageText><input name="email" autoComplete="email" type="email" required maxLength={254} /></label><label><PageText field="f1220f6e9_11" section="interactions" label="Text">{"Phone number"}</PageText><input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>{career ? <label><PageText field="f1220f6e9_12" section="interactions" label="Text">{"Role / portfolio link"}</PageText><input name="service" maxLength={480} /></label> : <label><PageText field="f1220f6e9_13" section="interactions" label="Text">{"What can we help with?"}</PageText><select name="service" defaultValue=""><option value=""><PageText field="f1220f6e9_14" section="interactions" label="Text">{"Not sure yet"}</PageText></option>{innerServices.map(service => <option key={service.slug}><PageText field="f1220f6e9_15" section="interactions" label="Text">{service.title}</PageText></option>)}</select></label>}</div>
    <div aria-hidden="true" style={{position:"absolute",left:-10000}}><label><PageText field="f1220f6e9_16" section="interactions" label="Text">{"Website"}</PageText><input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <label><PageText field="f1220f6e9_17" section="interactions" label="Text">{career ? "Tell us about yourself" : "Tell us about your project"}</PageText> <PageText field="f1220f6e9_18" section="interactions" label="Text">{"*"}</PageText><textarea name="message" required rows={5} maxLength={5000} /></label>
    <button className="ip-button" type="submit" disabled={busy}><PageText field="f1220f6e9_19" section="interactions" label="Text">{busy?"Sending…":career?"Send application":"Send enquiry"}</PageText><ArrowUpRight size={18} aria-hidden="true" /></button>
    <p className="ip-form-note"><PageText field="f1220f6e9_20" section="interactions" label="Text">{"Your details are used to respond to your enquiry."}</PageText><PageText field="f1220f6e9_21" section="interactions" label="Text">{career&&" Include a portfolio or CV link in your message."}</PageText></p>
    {status && <p role="status"><PageText field="f1220f6e9_22" section="interactions" label="Text">{status}</PageText></p>}
  </form>;
}
