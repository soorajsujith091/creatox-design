"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Asterisk } from "lucide-react";

const partners = [
  { name: "Best Western Plus", href: "https://creatoxdesigns.com/portfolio/best-western-plus/" },
  { name: "Desham Brings", href: "https://creatoxdesigns.com/portfolio/desham-brings/" },
  { name: "Humble Jo", href: "https://creatoxdesigns.com/portfolio/humble-jo/" },
  { name: "Amana Toyota", href: "https://creatoxdesigns.com/portfolio/amana-toyota-digital-marketing-case-study/" },
];

export function BrandPartners() {
  const reduced = useReducedMotion();
  return <section aria-labelledby="brand-partners-heading" className="bg-[#111111] px-6 py-14 md:px-12 md:py-16 border-y border-white/10">
    <div className="max-w-[1500px] mx-auto grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20 items-start">
      <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65 }}>
        <span className="font-mono text-[10px] text-[#999] tracking-widest uppercase block mb-5">/ Built around your brand</span>
        <h2 id="brand-partners-heading" className="font-heading text-[clamp(24px,2.5vw,38px)] leading-[1.2] tracking-[-.035em] text-white font-normal max-w-[650px]">
          <motion.span className="inline-flex text-red align-middle mr-2" animate={reduced ? undefined : { rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} aria-hidden="true"><Asterisk size={30}/></motion.span>
          We partner with ambitious businesses and teams to <span className="text-[#999]">build memorable brands, create meaningful digital experiences, and turn ideas into growth.</span>
        </h2>
        <a href="#contact" className="inline-flex items-center gap-2 mt-6 text-[12px] text-[#ff5373] min-h-11 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red focus-visible:outline-offset-4">Let’s work together <ArrowUpRight size={15}/></a>
      </motion.div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 lg:pt-9" aria-label="Selected brand collaborations">
        {partners.map((partner, index) => <motion.a key={partner.name} href={partner.href} initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: index * .1 }} className="group flex items-center gap-3 text-[#999] hover:text-white transition-colors min-h-11 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red focus-visible:outline-offset-4">
          <span aria-hidden="true" className="h-7 w-7 flex-shrink-0 border border-white/20 rounded-full grid place-items-center text-[11px] font-heading group-hover:border-red group-hover:text-red transition-colors">{partner.name.split(" ").map(word => word[0]).slice(0, 2).join("")}</span>
          <span className="font-heading text-[13px] sm:text-[16px] font-medium tracking-tight">{partner.name}</span>
        </motion.a>)}
      </div>
    </div>
  </section>;
}
