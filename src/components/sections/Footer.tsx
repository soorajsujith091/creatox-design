"use client";

/* cms-native-links */
import { PageAnchor } from "@/components/cms/PageContent";
/* cms-page-fields */
import { PageText, PageLink } from "@/components/cms/PageContent";
import { CmsImage } from "@/components/CmsImage";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Component as GradientBackground } from "@/components/ui/bg-gredient";
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn, FaPinterestP, FaBehance } from "react-icons/fa";
import { companyInfo, socialLinks, footerServices, footerCompany } from "@/data/stats";
import "./creatox-footer.css";

const icons = { Instagram: FaInstagram, Facebook: FaFacebookF, Youtube: FaYoutube, Linkedin: FaLinkedinIn, PinIcon: FaPinterestP, Palette: FaBehance };

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = footerRef.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const animations = new Map<Element, gsap.core.Timeline>();
      const context = gsap.context(() => {
        root.querySelectorAll<HTMLElement>(".creatox-footer-banner-copy, .creatox-footer-statement, .creatox-footer-column, .creatox-footer-bottom").forEach(group => {
          const animation = gsap.timeline({ paused: true }).fromTo(group.children,
            { y: 42, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.05, stagger: .12, ease: "power3.out" },
          );
          animations.set(group, animation);
        });
      }, root);
      // Observe actual viewport visibility rather than cached scroll positions,
      // which can shift when the preceding pinned sections finish measuring.
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const animation = animations.get(entry.target);
          if (!animation) return;
          if (entry.isIntersecting) animation.play();
          else animation.pause(0);
        });
      }, { threshold: .08, rootMargin: "0px 0px -24px 0px" });
      animations.forEach((_, group) => observer.observe(group));
      return () => { observer.disconnect(); context.revert(); };
    });
    return () => media.revert();
  }, []);
  return <footer ref={footerRef} className="creatox-editorial-footer">
    <div className="creatox-footer-banner">
      <CmsImage slot="footer_banner" src="/images/creatox-immersive-brand-studio-hero.png" alt="Creatox creative brand studio" fill sizes="100vw" />
      <div className="creatox-footer-banner-shade" />
      <div className="creatox-footer-banner-top"><BrandLogo className="w-[150px]" /><span><PageText field="94cd74bf5_1" section="Footer" label="Text">{"CREATIVE THINKING. REAL IMPACT."}</PageText></span></div>
      <div className="creatox-footer-banner-copy"><p><PageText field="94cd74bf5_2" section="Footer" label="Text">{"YOUR NEXT CHAPTER STARTS HERE"}</PageText></p><h2><PageText field="94cd74bf5_3" section="Footer" label="Heading">{"Ready to make"}</PageText><br /><PageText field="94cd74bf5_4" section="Footer" label="Heading">{"your next big move?"}</PageText></h2><PageLink field="94cd74bf5_5" section="Footer" href="/contact-us/"><PageText field="94cd74bf5_6" section="Footer" label="Text">{"Start a project "}</PageText><ArrowUpRight size={18} aria-hidden="true" /></PageLink></div>
    </div>
    <div className="creatox-footer-panel">
      <GradientBackground gradientFrom="#000000" gradientTo="#490103" gradientSize="120% 140%" gradientPosition="50% 0%" gradientStop="35%" />
      <div className="creatox-footer-statement"><h2><PageText field="94cd74bf5_7" section="Footer" label="Heading">{"We build brands"}</PageText><br /><PageText field="94cd74bf5_8" section="Footer" label="Heading">{"that move"}</PageText><br /><span><PageText field="94cd74bf5_9" section="Footer" label="Text">{"people."}</PageText></span></h2><p><PageText field="94cd74bf5_10" section="Footer" label="Text">{"Design. Digital. Growth."}</PageText><br /><PageText field="94cd74bf5_11" section="Footer" label="Text">{"Made with love in Kannur, Kerala."}</PageText></p><ArrowUpRight className="creatox-footer-mark" aria-hidden="true" /></div>
      <nav className="creatox-footer-column" aria-label="Footer services"><h3><PageText field="94cd74bf5_12" section="Footer" label="Heading">{"What we do"}</PageText></h3>{footerServices.map(item => <PageLink field="94cd74bf5_13" section="Footer" key={item.link} href={item.link}><PageText field="94cd74bf5_14" section="Footer" label="Text">{item.name}</PageText></PageLink>)}</nav>
      <nav className="creatox-footer-column" aria-label="Footer company"><h3><PageText field="94cd74bf5_15" section="Footer" label="Heading">{"Explore"}</PageText></h3>{footerCompany.map(item => <PageLink field="94cd74bf5_16" section="Footer" key={item.link} href={item.link}><PageText field="94cd74bf5_17" section="Footer" label="Text">{item.name}</PageText></PageLink>)}</nav>
      <div className="creatox-footer-column"><h3><PageText field="94cd74bf5_18" section="Footer" label="Heading">{"Let’s talk"}</PageText></h3><PageAnchor field="anchor_d20aacce9_1" section="Footer" href={`mailto:${companyInfo.email}`}><PageText field="94cd74bf5_19" section="Footer" label="Text">{companyInfo.email}</PageText></PageAnchor>{[companyInfo.phone1, companyInfo.phone2].map(phone => <PageAnchor field="anchor_d20aacce9_2" section="Footer" key={phone} href={`tel:${phone.replace(/\s/g, "")}`}><PageText field="94cd74bf5_20" section="Footer" label="Text">{phone}</PageText></PageAnchor>)}<p className="creatox-footer-address"><PageText field="94cd74bf5_21" section="Footer" label="Text">{companyInfo.address}</PageText></p><div className="creatox-footer-socials">{socialLinks.map(social => { const Icon = icons[social.icon as keyof typeof icons]; return <PageAnchor field="anchor_d20aacce9_3" section="Footer" key={social.name} href={social.url} aria-label={social.name}><Icon /></PageAnchor>; })}</div></div>
      <div className="creatox-footer-bottom"><span><PageText field="94cd74bf5_22" section="Footer" label="Text">{"© "}</PageText><PageText field="94cd74bf5_23" section="Footer" label="Text">{new Date().getFullYear()}</PageText> <PageText field="94cd74bf5_24" section="Footer" label="Text">{"Creatox Designs. All rights reserved."}</PageText></span><PageAnchor field="anchor_d20aacce9_4" section="Footer" href="#home"><PageText field="94cd74bf5_25" section="Footer" label="Text">{"Back to top ?"}</PageText></PageAnchor></div>
    </div>
  </footer>;
}
