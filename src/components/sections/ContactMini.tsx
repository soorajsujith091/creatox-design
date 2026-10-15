"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { companyInfo } from "@/data/stats";
import { services } from "@/data/services";
import { SectionLabel } from "../SectionLabel";
import "./contact-mini.css";

export function ContactMini() {
  const reduced = useReducedMotion();
  const reveal = { hidden: { opacity: 0, y: reduced ? 0 : 32 }, visible: { opacity: 1, y: 0 } };
  const revealTransition = { duration: reduced ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  const [draftOpened, setDraftOpened] = useState(false);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyInfo.address)}`;
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Project enquiry: ${data.get("service") || "Let's talk"}`;
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone") || "Not provided"}\nService: ${data.get("service") || "Not sure yet"}\n\n${data.get("message")}`;
    window.location.href = `mailto:${companyInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraftOpened(true);
  }
  return <section className="contact-studio site-gutter" aria-labelledby="contact-studio-heading">
    <div className="contact-studio-panel">
      <motion.div className="contact-studio-details" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : .3 } } }}>
        <motion.div variants={reveal} transition={revealTransition}><SectionLabel text="GET IN TOUCH" /></motion.div>
        <motion.h2 variants={reveal} transition={revealTransition} id="contact-studio-heading">Let’s get<br /><span>in touch.</span></motion.h2>
        <motion.h3 variants={reveal} transition={revealTransition}>Have an idea?<br />Say hello to Creatox.</motion.h3>
        <motion.dl variants={reveal} transition={revealTransition} className="contact-studio-directory">
          <div><dt>Phone</dt><dd><a href={`tel:${companyInfo.phone1.replace(/\s/g, "")}`}>{companyInfo.phone1}</a><a href={`tel:${companyInfo.phone2.replace(/\s/g, "")}`}>{companyInfo.phone2}</a></dd></div>
          <div><dt>Email</dt><dd><a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a></dd></div>
          <div><dt>Office</dt><dd><address>{companyInfo.address}</address><a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="contact-studio-map-link">See on Google Maps <ArrowUpRight size={16} aria-hidden="true" /></a></dd></div>
        </motion.dl>
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} transition={{ ...revealTransition, delay: reduced ? 0 : .3 }} className="contact-studio-right">
        <div className="contact-studio-welcome"><ArrowRight size={64} strokeWidth={1} aria-hidden="true" /><p>We’d love to hear from you.<br />Let’s build a brand, website or campaign that connects with people.</p></div>
        <form className="contact-studio-form" onSubmit={handleSubmit} aria-labelledby="contact-form-heading">
          <h3 id="contact-form-heading">Tell us about your project.</h3>
          <div className="contact-studio-fields">
            <label htmlFor="contact-name">Name <span aria-hidden="true">*</span><input id="contact-name" name="name" autoComplete="name" required maxLength={120} /></label>
            <label htmlFor="contact-email">Email <span aria-hidden="true">*</span><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
            <label htmlFor="contact-phone">Phone<input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
            <label htmlFor="contact-service">Service<select id="contact-service" name="service" defaultValue=""><option value="">Not sure yet</option>{services.map(service => <option key={service.id} value={service.title}>{service.title}</option>)}</select></label>
          </div>
          <label htmlFor="contact-message">Tell us what you have in mind <span aria-hidden="true">*</span><textarea id="contact-message" name="message" required rows={3} maxLength={3000} /></label>
          <button type="submit">Create email enquiry <ArrowUpRight size={18} aria-hidden="true" /></button>
          <p className="contact-studio-form-note">Opens your email app with your details. Send the email there to complete your enquiry.</p>
          {draftOpened && <p className="contact-studio-form-status" role="status">Your email draft is ready. If your email app didn’t open, contact us at <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>.</p>}
        </form>
      </motion.div>
    </div>
    <a className="contact-studio-location" href={mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={24} aria-hidden="true" /><span><strong>Visit our studio</strong><span>{companyInfo.addressShort}</span></span><ArrowUpRight size={24} aria-hidden="true" /></a>
  </section>;
}
