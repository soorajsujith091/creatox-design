"use client";

import Link from "next/link";
import {
  Pin,
  Palette,
} from "lucide-react";
import { companyInfo, socialLinks, footerServices, footerCompany } from "@/data/stats";

const iconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
  PinIcon: Pin,
  Palette,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black pt-[72px] pb-8 border-t border-red" aria-label="Site footer">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Column 1 - Brand */}
          <div className="flex flex-col">
            <Link
              href="/"
              className="flex items-center gap-0 shrink-0 mb-3 w-fit"
              aria-label="Creatox Designs Home"
            >
              <span className="font-heading text-[28px] font-bold text-white tracking-[0.08em]">
                CREATOX
              </span>
              <span className="text-red text-[28px] ml-[2px]">●</span>
            </Link>
            
            <p className="font-body text-[14px] text-[#666] max-w-xs leading-relaxed mb-6">
              {companyInfo.tagline}
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const IconComponent = iconMap[social.icon];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-[#555] hover:text-red transition-colors duration-300 hover:scale-110"
                  >
                    {IconComponent ? <IconComponent size={24} /> : <span className="text-[14px] font-mono">{social.name.substring(0,2)}</span>}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2 - Services */}
          <div className="flex flex-col">
            <h3 className="font-mono text-[11px] text-red uppercase tracking-widest mb-6">
              SERVICES
            </h3>
            <ul className="flex flex-col gap-3">
              {footerServices.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className="font-body text-[14px] text-[#666] hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div className="flex flex-col">
            <h3 className="font-mono text-[11px] text-red uppercase tracking-widest mb-6">
              COMPANY
            </h3>
            <ul className="flex flex-col gap-3">
              {footerCompany.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className="font-body text-[14px] text-[#666] hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact & Newsletter */}
          <div className="flex flex-col">
            <h3 className="font-mono text-[11px] text-red uppercase tracking-widest mb-6">
              GET IN TOUCH
            </h3>
            
            <div className="flex flex-col gap-2 mb-6">
              <a
                href={`mailto:${companyInfo.email}`}
                className="font-body text-[14px] text-white hover:text-red transition-colors w-fit"
              >
                {companyInfo.email}
              </a>
              <a
                href={`tel:${companyInfo.phone1.replace(/\s/g, "")}`}
                className="font-body text-[14px] text-[#888] hover:text-white transition-colors w-fit"
              >
                {companyInfo.phone1}
              </a>
              <a
                href={`tel:${companyInfo.phone2.replace(/\s/g, "")}`}
                className="font-body text-[14px] text-[#888] hover:text-white transition-colors w-fit"
              >
                {companyInfo.phone2}
              </a>
            </div>

            <address className="font-body text-[13px] text-[#555] leading-[1.7] not-italic mb-6 max-w-[240px]">
              {companyInfo.address.split(', ').map((line, i) => (
                <span key={i} className="block">{line}{i < companyInfo.address.split(', ').length - 1 ? ',' : ''}</span>
              ))}
            </address>

            <form className="flex w-full max-w-[300px]" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                required
                className="flex-1 bg-surface border border-[#333] text-white px-4 py-2.5 text-[14px] font-body focus:border-red focus:outline-none placeholder:text-[#555] transition-colors"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="bg-red text-white px-4 flex items-center justify-center hover:bg-redDark transition-colors"
                aria-label="Subscribe"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1a1a1a] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[12px] text-[#444] text-center md:text-left">
            © {currentYear} Creatox Designs. All rights reserved.
          </p>
          <p className="font-mono text-[12px] text-[#444] text-center md:text-right">
            Made with <span className="text-red">❤</span> in Kerala, India
          </p>
        </div>
      </div>
    </footer>
  );
}
