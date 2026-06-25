"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronRight,
  Play,
  PenLine,
  FileText,
  Check,
  Sparkles,
} from "lucide-react";

// ─── Floating Glass Badge Component ─────────────────────────────────────────
type FloatBadgeProps = {
  icon: React.ReactNode;
  iconBg: string;
  iconShadow: string;
  label: string;
  sublabel: string;
  cardShadow: string;
  className: string;
  floatY: number[];
  floatX: number[];
  duration: number;
  delay?: number;
  hoverRotate: number;
};

function FloatBadge({
  icon,
  iconBg,
  iconShadow,
  label,
  sublabel,
  cardShadow,
  className,
  floatY,
  floatX,
  duration,
  delay = 0,
  hoverRotate,
}: FloatBadgeProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={`absolute ${className} z-20 pointer-events-auto`}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay,
      }}
    >
      <motion.div
        animate={
          shouldReduce
            ? {}
            : {
                y: floatY,
                x: floatX,
              }
        }
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.05,
          rotate: hoverRotate,
          transition: { type: "spring", damping: 12, stiffness: 200 },
        }}
        className="cursor-pointer"
      >
        <div
          className="px-4 py-3 rounded-[20px] flex items-center gap-3 bg-gradient-to-br from-white/80 to-white/50 border border-white/70 ring-1 ring-black/[0.06] backdrop-blur-[24px]"
          style={{
            boxShadow: `${cardShadow}, inset 0 2.5px 4px rgba(255,255,255,0.8)`,
          }}
        >
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
            style={{ boxShadow: iconShadow }}
          >
            {icon}
          </div>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[13px] font-black text-neutral-900 tracking-tight">
              {label}
            </span>
            <span className="text-[10px] font-semibold text-neutral-500 mt-0.5">
              {sublabel}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Subtle Orbital Ring SVG ─────────────────────────────────────────────────
function OrbitalRings() {
  return (
    <svg
      viewBox="0 0 620 620"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] w-[500px] h-[500px] lg:w-[620px] lg:h-[620px] -z-10 opacity-30 pointer-events-none"
    >
      <defs>
        <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E4002B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF4D6D" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="ringGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF4D6D" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#E4002B" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Outer ring */}
      <ellipse
        cx="310"
        cy="310"
        rx="300"
        ry="300"
        stroke="url(#ringGrad1)"
        strokeWidth="0.8"
        strokeDasharray="6 18"
      />
      {/* Mid ring */}
      <ellipse
        cx="310"
        cy="310"
        rx="220"
        ry="220"
        stroke="url(#ringGrad2)"
        strokeWidth="0.6"
        strokeDasharray="4 14"
      />
      {/* Inner ring */}
      <ellipse
        cx="310"
        cy="310"
        rx="140"
        ry="140"
        stroke="url(#ringGrad1)"
        strokeWidth="0.5"
        strokeDasharray="3 10"
      />
      {/* Accent dots on outer ring */}
      <circle cx="310" cy="10" r="3" fill="#E4002B" opacity="0.5" />
      <circle cx="610" cy="310" r="3" fill="#E4002B" opacity="0.5" />
      <circle cx="310" cy="610" r="3" fill="#E4002B" opacity="0.3" />
      <circle cx="10" cy="310" r="3" fill="#E4002B" opacity="0.3" />
    </svg>
  );
}

// ─── Client Avatar Cluster ────────────────────────────────────────────────────
const avatarUrls = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
];

// ─── Main Hero ───────────────────────────────────────────────────────────────
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const ease = "easeOut" as const;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] bg-white overflow-hidden flex items-center"
      aria-label="Hero"
    >
      {/* ── Ambient background aura glows ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        {/* Red top-left warm aura */}
        <div
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(228,0,43,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Soft pink mid-right aura */}
        <div
          className="absolute top-[30%] right-0 w-[420px] h-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(228,0,43,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Bottom center neutral */}
        <div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(228,0,43,0.04) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Subtle diagonal grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #0A0A0A 0px, #0A0A0A 1px, transparent 1px, transparent 72px)",
          }}
        />
      </div>

      {/* ── Main Content Grid ── */}
      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-20 pt-[80px] pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-[calc(100svh-80px)]">

          {/* ────── LEFT COLUMN ────── */}
          <div className="lg:col-span-5 flex flex-col justify-center items-start text-left max-w-[620px] lg:pr-6 py-12 lg:py-0">

            {/* Social proof badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="px-3 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.06] flex items-center gap-3 w-fit shadow-xs mb-6"
            >
              {/* Avatar stack */}
              <div className="flex -space-x-2 select-none">
                {avatarUrls.map((url, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: -4, zIndex: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative"
                  >
                    <Image
                      src={url}
                      alt={`Client ${i + 1}`}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full border-[1.5px] border-white object-cover"
                      unoptimized
                    />
                  </motion.div>
                ))}
              </div>
              <span className="text-[12px] text-black/70 font-body">
                Trusted by{" "}
                <strong className="text-[#171717] font-bold">
                  1,000+ brands
                </strong>{" "}
                across Kerala
              </span>
            </motion.div>

            {/* Main Display Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
              className="font-display font-black text-[40px] sm:text-[52px] lg:text-[62px] leading-[1.06] tracking-[-3px] select-none text-black"
            >
              Design That
              <br />
              <span className="relative inline-block">
                Demands
                {/* Underline accent */}
                <motion.svg
                  viewBox="0 0 320 14"
                  className="absolute -bottom-1 left-0 w-full h-3 overflow-visible"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                >
                  <motion.path
                    d="M4 10 Q80 2 160 8 Q240 14 316 6"
                    stroke="#E4002B"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
              <br />
              <span className="text-red-600" style={{ color: "#E4002B" }}>
                Attention.
              </span>
            </motion.h1>

            {/* Body paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.35 }}
              className="text-[17px] text-black/55 tracking-[-0.3px] leading-relaxed mt-5 max-w-[460px] font-body"
            >
              We blend creativity, strategy, and technology to craft brand
              identities, websites, and campaigns that look{" "}
              <em className="not-italic text-black/80 font-medium">
                premium
              </em>{" "}
              and perform with purpose — from Kannur to the world.
            </motion.p>

            {/* Quick stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.45 }}
              className="flex gap-6 mt-7 pt-6 border-t border-black/[0.06] w-full"
            >
              {[
                { n: "6+", l: "Years" },
                { n: "1k+", l: "Projects" },
                { n: "22+", l: "Team" },
              ].map((stat) => (
                <div key={stat.l} className="flex flex-col">
                  <span className="font-display font-black text-[26px] leading-none tracking-tight text-black">
                    {stat.n}
                  </span>
                  <span className="font-body text-[11px] text-black/40 mt-0.5 uppercase tracking-widest">
                    {stat.l}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.55 }}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              {/* Primary CTA */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Link
                  href="/projects/"
                  className="group pl-6 pr-2 py-2 rounded-[16px] flex items-center gap-4 text-sm font-bold text-white transition-all w-fit"
                  style={{
                    background:
                      "linear-gradient(135deg, #E4002B 0%, #B8001F 100%)",
                    boxShadow:
                      "inset 0px 4px 4px 0px rgba(255,255,255,0.25), 0 10px 25px -5px rgba(228, 0, 43, 0.35)",
                  }}
                >
                  <span>See Our Work</span>
                  <motion.div
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-600 shrink-0"
                    style={{ color: "#E4002B" }}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </motion.div>
                </Link>
              </motion.div>

              {/* Watch Reel ghost link */}
              <Link
                href="/contact-us/"
                className="group flex items-center gap-2.5"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-red-100 transition-colors"
                  style={{ backgroundColor: "rgba(228,0,43,0.06)" }}
                >
                  <Play
                    className="w-3.5 h-3.5 ml-0.5"
                    fill="#E4002B"
                    stroke="#E4002B"
                  />
                </motion.div>
                <span
                  className="text-[14px] font-bold transition-colors group-hover:opacity-70"
                  style={{ color: "#E4002B" }}
                >
                  Let&apos;s Talk
                </span>
              </Link>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 flex items-center gap-3 flex-wrap"
            >
              <div className="flex items-center gap-1.5 text-[11px] text-black/35 font-mono uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-[#E4002B] opacity-70" />
                BNI Member
              </div>
              <div className="w-px h-3 bg-black/10" />
              <div className="text-[11px] text-black/35 font-mono uppercase tracking-widest">
                Kerala Startup Mission
              </div>
              <div className="w-px h-3 bg-black/10" />
              <div className="text-[11px] text-black/35 font-mono uppercase tracking-widest">
                Est. 2019
              </div>
            </motion.div>
          </div>

          {/* ────── RIGHT COLUMN ────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
            className="lg:col-span-7 relative w-full flex items-center justify-center lg:justify-end py-10 lg:py-0 pointer-events-none"
          >
            {/* Background aura pulse */}
            <motion.div
              animate={
                shouldReduce
                  ? {}
                  : { scale: [1, 1.08, 1], opacity: [0.12, 0.2, 0.12] }
              }
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[30%] left-[20%] w-[380px] h-[380px] rounded-full -z-10"
              style={{
                background:
                  "radial-gradient(circle, rgba(228,0,43,0.15) 0%, transparent 70%)",
                filter: "blur(70px)",
              }}
            />

            {/* Orbital rings */}
            <OrbitalRings />

            {/* Central visual — stylized brand card/mockup */}
            <div className="relative max-w-[520px] w-full mx-auto">

              {/* Main brand display card */}
              <motion.div
                animate={
                  shouldReduce
                    ? {}
                    : {
                        y: [0, -6, 0],
                      }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 w-full aspect-[4/3.6] rounded-[28px] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #0A0A0A 0%, #1a0005 50%, #0A0A0A 100%)",
                  boxShadow:
                    "0 40px 80px -20px rgba(0,0,0,0.35), 0 0 0 1px rgba(228,0,43,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                {/* Inner content of the brand card */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  {/* Red radial glow inside card */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 70%, rgba(228,0,43,0.25) 0%, transparent 65%)",
                    }}
                  />

                  {/* Grid lines on card */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)",
                    }}
                  />

                  {/* CREATOX • wordmark on dark card */}
                  <div className="relative z-10 text-center">
                    <div className="flex items-center gap-2 justify-center mb-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#E4002B" }}
                      >
                        <span className="text-white text-[13px] font-black font-display">
                          C
                        </span>
                      </div>
                      <span className="font-display font-black text-white text-[22px] tracking-tight">
                        CREATOX
                        <span style={{ color: "#E4002B" }}>●</span>
                      </span>
                    </div>
                    <p className="font-body text-white/40 text-[12px] tracking-[0.18em] uppercase">
                      Full-Service Digital Agency
                    </p>

                    {/* Animated service tags */}
                    <div className="flex flex-wrap gap-2 justify-center mt-6">
                      {[
                        "Branding",
                        "Web Design",
                        "Social Media",
                        "Campaigns",
                        "SEO",
                        "Productions",
                      ].map((tag, i) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}
                          className="px-3 py-1 rounded-full text-[11px] font-semibold font-body border"
                          style={{
                            backgroundColor:
                              i === 0
                                ? "#E4002B"
                                : "rgba(255,255,255,0.06)",
                            borderColor:
                              i === 0
                                ? "#E4002B"
                                : "rgba(255,255,255,0.12)",
                            color: i === 0 ? "#fff" : "rgba(255,255,255,0.6)",
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Kannur badge */}
                    <div className="mt-8 flex items-center justify-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="font-mono text-white/30 text-[10px] tracking-widest uppercase">
                        Kannur, Kerala · Est. 2019
                      </span>
                    </div>
                  </div>
                </div>

                {/* Top shimmer line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                  }}
                />
              </motion.div>

              {/* Floating Badges */}

              {/* 1. "Brand Identity" badge — top right */}
              <FloatBadge
                className="top-[10%] -right-4 sm:-right-8 lg:-right-12"
                icon={
                  <PenLine className="w-4 h-4 text-white stroke-[2]" />
                }
                iconBg="bg-gradient-to-br from-[#E4002B] to-[#8B0018]"
                iconShadow="0 4px 12px rgba(228,0,43,0.4)"
                label="Brand Identity"
                sublabel="logo & visual"
                cardShadow="0 12px 32px -4px rgba(228,0,43,0.14)"
                floatY={[0, -8, 0]}
                floatX={[0, 2, 0]}
                duration={5.0}
                delay={0.7}
                hoverRotate={1}
              />

              {/* 2. "Campaign Strategy" badge — center left */}
              <FloatBadge
                className="top-[42%] -left-4 sm:-left-10 lg:-left-14"
                icon={
                  <FileText className="w-4 h-4 text-white stroke-[2]" />
                }
                iconBg="bg-gradient-to-br from-[#10B981] to-[#059669]"
                iconShadow="0 4px 12px rgba(16,185,129,0.35)"
                label="Campaign"
                sublabel="strategy & ads"
                cardShadow="0 12px 32px -4px rgba(16,185,129,0.12)"
                floatY={[0, 8, 0]}
                floatX={[0, -2, 0]}
                duration={5.5}
                delay={0.85}
                hoverRotate={-1}
              />

              {/* 3. "Social Media" badge — bottom right */}
              <FloatBadge
                className="bottom-[10%] -right-2 sm:-right-6 lg:-right-10"
                icon={
                  <Check className="w-4 h-4 text-white stroke-[3]" />
                }
                iconBg="bg-gradient-to-br from-[#9333EA] to-[#7E22CE]"
                iconShadow="0 4px 12px rgba(147,51,234,0.35)"
                label="Social Media"
                sublabel="managed daily"
                cardShadow="0 12px 32px -4px rgba(147,51,234,0.12)"
                floatY={[0, -10, 0]}
                floatX={[0, -1, 0]}
                duration={4.8}
                delay={1.0}
                hoverRotate={1.5}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] text-black/25 tracking-[0.18em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-black/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
