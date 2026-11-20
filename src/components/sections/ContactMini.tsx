"use client";

/* cms-native-links */
import { PageAnchor } from "@/components/cms/PageContent";
/* cms-page-fields */
import { PageText } from "@/components/cms/PageContent";
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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyInfo.address)}`;
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true); setError(""); setDraftOpened(false);
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(data)) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || result.message || "Unable to send your enquiry.");
      form.reset(); setDraftOpened(true);
    } catch (cause) { setError((cause as Error).message); } finally { setSending(false); }
  }
  return <section className="contact-studio site-gutter" aria-labelledby="contact-studio-heading">
    <div className="contact-studio-panel">
      <motion.div className="contact-studio-details" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : .3 } } }}>
        <motion.div variants={reveal} transition={revealTransition}><SectionLabel text="GET IN TOUCH" /></motion.div>
        <motion.h2 variants={reveal} transition={revealTransition} id="contact-studio-heading">Let’s get<br /><span><PageText field="a65e1756e_1" section="Contact Mini" label="Text">{"in touch."}</PageText></span></motion.h2>
        <motion.h3 variants={reveal} transition={revealTransition}>Have an idea?<br />Say hello to Creatox.</motion.h3>
        <motion.dl variants={reveal} transition={revealTransition} className="contact-studio-directory">
          <div><dt><PageText field="a65e1756e_2" section="Contact Mini" label="Text">{"Phone"}</PageText></dt><dd><PageAnchor field="anchor_d2af5b8f6_1" section="ContactMini" href={`tel:${companyInfo.phone1.replace(/\s/g, "")}`}><PageText field="a65e1756e_3" section="Contact Mini" label="Text">{companyInfo.phone1}</PageText></PageAnchor><PageAnchor field="anchor_d2af5b8f6_2" section="ContactMini" href={`tel:${companyInfo.phone2.replace(/\s/g, "")}`}><PageText field="a65e1756e_4" section="Contact Mini" label="Text">{companyInfo.phone2}</PageText></PageAnchor></dd></div>
          <div><dt><PageText field="a65e1756e_5" section="Contact Mini" label="Text">{"Email"}</PageText></dt><dd><PageAnchor field="anchor_d2af5b8f6_3" section="ContactMini" href={`mailto:${companyInfo.email}`}><PageText field="a65e1756e_6" section="Contact Mini" label="Text">{companyInfo.email}</PageText></PageAnchor></dd></div>
          <div><dt><PageText field="a65e1756e_7" section="Contact Mini" label="Text">{"Office"}</PageText></dt><dd><address><PageText field="a65e1756e_8" section="Contact Mini" label="Text">{companyInfo.address}</PageText></address><PageAnchor field="anchor_d2af5b8f6_4" section="ContactMini" href={mapsUrl} target="_blank" rel="noopener noreferrer" className="contact-studio-map-link"><PageText field="a65e1756e_9" section="Contact Mini" label="Text">{"See on Google Maps "}</PageText><ArrowUpRight size={16} aria-hidden="true" /></PageAnchor></dd></div>
        </motion.dl>
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} transition={{ ...revealTransition, delay: reduced ? 0 : .3 }} className="contact-studio-right">
        <div className="contact-studio-welcome"><ArrowRight size={64} strokeWidth={1} aria-hidden="true" /><p><PageText field="a65e1756e_10" section="Contact Mini" label="Text">{"We’d love to hear from you."}</PageText><br /><PageText field="a65e1756e_11" section="Contact Mini" label="Text">{"Let’s build a brand, website or campaign that connects with people."}</PageText></p></div>
        <form className="contact-studio-form" onSubmit={handleSubmit} aria-labelledby="contact-form-heading">
          <h3 id="contact-form-heading"><PageText field="a65e1756e_12" section="Contact Mini" label="Heading">{"Tell us about your project."}</PageText></h3>
          <div className="contact-studio-fields">
            <label htmlFor="contact-name"><PageText field="a65e1756e_13" section="Contact Mini" label="Text">{"Name "}</PageText><span aria-hidden="true"><PageText field="a65e1756e_14" section="Contact Mini" label="Text">{"*"}</PageText></span><input id="contact-name" name="name" autoComplete="name" required maxLength={120} /></label>
            <label htmlFor="contact-email"><PageText field="a65e1756e_15" section="Contact Mini" label="Text">{"Email "}</PageText><span aria-hidden="true"><PageText field="a65e1756e_16" section="Contact Mini" label="Text">{"*"}</PageText></span><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
            <label htmlFor="contact-phone"><PageText field="a65e1756e_17" section="Contact Mini" label="Text">{"Phone"}</PageText><input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
            <label htmlFor="contact-service"><PageText field="a65e1756e_18" section="Contact Mini" label="Text">{"Service"}</PageText><select id="contact-service" name="service" defaultValue=""><option value=""><PageText field="a65e1756e_19" section="Contact Mini" label="Text">{"Not sure yet"}</PageText></option>{services.map(service => <option key={service.id} value={service.title}><PageText field="a65e1756e_20" section="Contact Mini" label="Text">{service.title}</PageText></option>)}</select></label>
          </div>
          <label htmlFor="contact-message"><PageText field="a65e1756e_21" section="Contact Mini" label="Text">{"Tell us what you have in mind "}</PageText><span aria-hidden="true"><PageText field="a65e1756e_22" section="Contact Mini" label="Text">{"*"}</PageText></span><textarea id="contact-message" name="message" required rows={3} maxLength={3000} /></label>
          <button type="submit" disabled={sending}><PageText field="a65e1756e_23" section="Contact Mini" label="Text">{sending ? "Sending..." : "Send enquiry"}</PageText> <ArrowUpRight size={18} aria-hidden="true" /></button>
          <p className="contact-studio-form-note"><PageText field="a65e1756e_24" section="Contact Mini" label="Text">{"Your enquiry is securely sent to our team."}</PageText></p>
          {draftOpened && <p className="contact-studio-form-status" role="status"><PageText field="a65e1756e_25" section="Contact Mini" label="Text">{"Thank you. Your enquiry has reached our team."}</PageText></p>}{error && <p role="alert"><PageText field="a65e1756e_26" section="Contact Mini" label="Text">{error}</PageText></p>}
        </form>
      </motion.div>
    </div>
    <PageAnchor field="anchor_d2af5b8f6_5" section="ContactMini" className="contact-studio-location" href={mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={24} aria-hidden="true" /><span><strong><PageText field="a65e1756e_27" section="Contact Mini" label="Text">{"Visit our studio"}</PageText></strong><span><PageText field="a65e1756e_28" section="Contact Mini" label="Text">{companyInfo.addressShort}</PageText></span></span><ArrowUpRight size={24} aria-hidden="true" /></PageAnchor>
  </section>;
}
