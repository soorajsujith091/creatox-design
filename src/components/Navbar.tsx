"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import {
  Pin,
  Palette,
  Phone,
} from "lucide-react";
import { navLinks } from "@/data/navigation";
import { socialLinks, companyInfo } from "@/data/stats";

const iconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
  PinIcon: Pin,
  Palette,
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerTopRef = useRef<HTMLSpanElement>(null);
  const hamburgerMidRef = useRef<HTMLSpanElement>(null);
  const hamburgerBotRef = useRef<HTMLSpanElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  // Animate hamburger and mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";

      // Hamburger to X
      gsap.to(hamburgerTopRef.current, {
        rotation: 45,
        y: 8,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(hamburgerMidRef.current, {
        opacity: 0,
        duration: 0.15,
      });
      gsap.to(hamburgerBotRef.current, {
        rotation: -45,
        y: -8,
        duration: 0.3,
        ease: "power2.inOut",
      });

      // Mobile menu slide in
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Stagger links
      const links = mobileLinksRef.current?.querySelectorAll(".mobile-link");
      if (links) {
        gsap.fromTo(
          links,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.15,
          }
        );
      }
    } else {
      document.body.style.overflow = "auto";

      // X back to hamburger
      gsap.to(hamburgerTopRef.current, {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(hamburgerMidRef.current, {
        opacity: 1,
        duration: 0.15,
        delay: 0.15,
      });
      gsap.to(hamburgerBotRef.current, {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0A0Aee] backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-0 shrink-0"
            aria-label="Creatox Designs Home"
          >
            <span className="font-heading text-[18px] font-bold text-white tracking-[0.04em]">
              CREATOX
            </span>
            <span className="text-red text-[18px] ml-[2px]">●</span>
          </Link>

          {/* Desktop Center Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-link font-body text-[14px] text-white tracking-[0.04em] hover:text-white transition-colors ${
                  pathname === link.href ? "active" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href={`tel:${companyInfo.phone1.replace(/\s/g, "")}`}
              className="font-mono text-[12px] text-gray hover:text-white transition-colors"
            >
              {companyInfo.phone1}
            </a>
            <Link
              href="/contact-us/"
              className="border border-white text-white text-[14px] px-5 py-2 font-body hover:bg-red hover:border-red transition-all duration-300"
            >
              Start a Project →
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-[6px] relative z-[110]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span
              ref={hamburgerTopRef}
              className="block w-6 h-[2px] bg-white origin-center"
            />
            <span
              ref={hamburgerMidRef}
              className="block w-6 h-[2px] bg-white origin-center"
            />
            <span
              ref={hamburgerBotRef}
              className="block w-6 h-[2px] bg-white origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 bg-black z-[105] flex flex-col justify-center px-8 opacity-0 md:hidden"
        >
          <div ref={mobileLinksRef} className="flex flex-col gap-6 mb-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`mobile-link font-heading text-[36px] text-white opacity-0 ${
                  pathname === link.href
                    ? "border-l-[3px] border-red pl-4"
                    : "pl-4"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Phone numbers */}
          <div className="flex flex-col gap-2 mb-8 mobile-link opacity-0">
            <a
              href={`tel:${companyInfo.phone1.replace(/\s/g, "")}`}
              className="font-mono text-gray text-[14px] flex items-center gap-2"
            >
              <Phone size={14} />
              {companyInfo.phone1}
            </a>
            <a
              href={`tel:${companyInfo.phone2.replace(/\s/g, "")}`}
              className="font-mono text-gray text-[14px] flex items-center gap-2"
            >
              <Phone size={14} />
              {companyInfo.phone2}
            </a>
          </div>

          {/* Social icons */}
          <div className="flex gap-4 mb-8 mobile-link opacity-0">
            {socialLinks.map((social) => {
              const IconComponent = iconMap[social.icon];
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-white hover:text-red transition-colors duration-300"
                >
                  {IconComponent ? <IconComponent size={24} /> : <span className="text-[14px] font-mono">{social.name.substring(0,2)}</span>}
                </a>
              );
            })}
          </div>

          {/* CTA */}
          <Link
            href="/contact-us/"
            className="mobile-link opacity-0 bg-red text-white text-center py-4 px-6 font-mono text-[14px] tracking-wide hover:bg-redDark transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Start a Project →
          </Link>
        </div>
      )}
    </>
  );
}
