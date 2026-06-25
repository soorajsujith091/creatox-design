"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { companyInfo } from "@/data/stats";
import { SectionLabel } from "../SectionLabel";

export function ContactMini() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only - show success state
    setIsSubmitted(true);
  };

  return (
    <section className="py-24 bg-[#F7F7F7] px-6" aria-label="Get In Touch">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column - Director Info */}
        <div className="lg:w-[45%] flex flex-col">
          <SectionLabel text="GET IN TOUCH" />
          
          <h2 className="font-heading text-fluid-2xl text-[#0A0A0A] font-semibold leading-[1.2] mb-12">
            Have a project in mind? We&apos;d love to hear from you.
          </h2>

          {/* Director card */}
          <div className="bg-white border border-[#E8E8E8] rounded-[4px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] mb-10">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-[100px] h-[100px] rounded-full border-2 border-red relative overflow-hidden shrink-0">
                <Image
                  src={companyInfo.directorImage}
                  alt={companyInfo.directorName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-mono text-[11px] text-red uppercase tracking-widest mb-1">
                  Director
                </div>
                <div className="font-heading text-[24px] text-[#0A0A0A] font-semibold">
                  {companyInfo.directorName}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 font-body">
              <a
                href={`tel:${companyInfo.phone1.replace(/\s/g, "")}`}
                className="text-[15px] text-[#555555] hover:text-red transition-colors w-fit"
              >
                📞 {companyInfo.phone1}
              </a>
              <a
                href={`tel:${companyInfo.phone2.replace(/\s/g, "")}`}
                className="text-[14px] text-[#555555] hover:text-red transition-colors w-fit"
              >
                📞 {companyInfo.phone2}
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="text-[14px] text-[#555555] hover:text-red transition-colors w-fit"
              >
                📧 {companyInfo.email}
              </a>
              <div className="text-[13px] text-[#555555] leading-relaxed max-w-[280px]">
                📍 {companyInfo.address}
              </div>
            </div>
          </div>

          <Link
            href="/contact-us/"
            className="inline-block bg-red text-white px-6 py-3 text-[14px] font-body text-center hover:bg-redDark transition-colors duration-300 w-fit"
          >
            Let&apos;s Talk →
          </Link>
        </div>

        {/* Right Column - Quick Form */}
        <div className="lg:w-[55%]">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                required
                placeholder="Your Name"
                className="w-full bg-white border border-[#D0D0D0] text-[#0A0A0A] px-4 py-3.5 rounded-[4px] focus:border-red focus:outline-none focus:shadow-[0_0_0_3px_rgba(228,0,43,0.08)] placeholder:text-[#AAAAAA] transition-all"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                className="w-full bg-white border border-[#D0D0D0] text-[#0A0A0A] px-4 py-3.5 rounded-[4px] focus:border-red focus:outline-none focus:shadow-[0_0_0_3px_rgba(228,0,43,0.08)] placeholder:text-[#AAAAAA] transition-all"
              />
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                className="w-full bg-white border border-[#D0D0D0] text-[#0A0A0A] px-4 py-3.5 rounded-[4px] focus:border-red focus:outline-none focus:shadow-[0_0_0_3px_rgba(228,0,43,0.08)] placeholder:text-[#AAAAAA] transition-all"
              />
              <select
                className="w-full bg-white border border-[#D0D0D0] text-[#0A0A0A] px-4 py-3.5 rounded-[4px] focus:border-red focus:outline-none focus:shadow-[0_0_0_3px_rgba(228,0,43,0.08)] transition-all appearance-none cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled className="text-[#AAAAAA]">
                  Select a Service
                </option>
                <option value="Social Media Management">Social Media Management</option>
                <option value="Branding and Design">Branding and Design</option>
                <option value="Creative Web Design">Creative Web Design</option>
                <option value="Ads and Campaigns">Ads and Campaigns</option>
                <option value="E-commerce Development">E-commerce Development</option>
                <option value="Web and Mobile Apps">Web and Mobile Apps</option>
                <option value="Productions | SEO">Productions | SEO</option>
                <option value="Influencer Marketing & PR">Influencer Marketing & PR</option>
                <option value="Advertising">Advertising</option>
              </select>
              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                className="w-full bg-white border border-[#D0D0D0] text-[#0A0A0A] px-4 py-3.5 rounded-[4px] focus:border-red focus:outline-none focus:shadow-[0_0_0_3px_rgba(228,0,43,0.08)] placeholder:text-[#AAAAAA] transition-all resize-none"
              />
              <button
                type="submit"
                className="w-full bg-red text-white py-4 mt-2 rounded-[4px] font-body text-[14px] hover:bg-redDark transition-colors duration-300"
              >
                Send Message →
              </button>
            </form>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white border border-[#E8E8E8] rounded-[4px] p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div className="w-16 h-16 rounded-full bg-red/10 flex items-center justify-center text-red mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>
              <h3 className="font-heading text-[24px] text-[#0A0A0A] font-semibold mb-2">Message Sent</h3>
              <p className="font-body text-gray">We&apos;ll be in touch shortly!</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-8 text-red font-mono text-[12px] hover:text-[#0A0A0A] transition-colors"
              >
                Send another message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
