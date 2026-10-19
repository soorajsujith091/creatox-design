"use client";

import BeamWordmarkFooter from "@/components/ui/beam-wordmark-footer";
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn, FaPinterestP, FaBehance } from "react-icons/fa";
import { companyInfo, socialLinks, footerServices, footerCompany } from "@/data/stats";
import "./creatox-footer.css";

const icons = { Instagram: FaInstagram, Facebook: FaFacebookF, Youtube: FaYoutube, Linkedin: FaLinkedinIn, PinIcon: FaPinterestP, Palette: FaBehance };

export function Footer() {
  return <BeamWordmarkFooter
    brand="Creatox Designs"
    wordmark="CREATOX"
    company="Creatox Designs. All rights reserved."
    background="#080808"
    ink="#f5f3f3"
    muted="#aaaaaa"
    accent="#e4002b"
    wordTop="#98132c"
    wordFoot="#26070e"
    fontSans="var(--font-body), sans-serif"
    wordWeight={700}
    className="creatox-beam-footer"
    socials={socialLinks.map(social => {
      const Icon = icons[social.icon as keyof typeof icons];
      return { label: social.name, href: social.url, icon: <Icon /> };
    })}
    credits={[
      { label: "Crafting designs and brands with love since 2019." },
      { label: companyInfo.address },
    ]}
    columns={[
      { title: "Services", links: footerServices.map(item => ({ label: item.name, href: item.link })) },
      { title: "Company", links: footerCompany.map(item => ({ label: item.name, href: item.link })) },
      { title: "Get in touch", links: [
        { label: companyInfo.email, href: "mailto:" + companyInfo.email },
        { label: companyInfo.phone1, href: "tel:" + companyInfo.phone1.replace(/\s/g, "") },
        { label: companyInfo.phone2, href: "tel:" + companyInfo.phone2.replace(/\s/g, "") },
        { label: "Start a project", href: "/contact-us/" },
      ] },
    ]}
  />;
}
