"use client";

export function TickerMarquee() {
  const row1Text =
    "BRANDING & DESIGN · CREATIVE WEB DESIGN · SOCIAL MEDIA MANAGEMENT · ADS & CAMPAIGNS · SEO · E-COMMERCE · ";
  const row2Text =
    "PRODUCTIONS · WEB & MOBILE APPS · INFLUENCER MARKETING · ADVERTISING · UI/UX DESIGN · MOTION · ";

  return (
    <section
      className="bg-red py-4 overflow-hidden marquee-container"
      aria-label="Services ticker"
    >
      {/* Row 1 — left to right */}
      <div className="flex overflow-hidden whitespace-nowrap mb-2">
        <div className="marquee-track flex animate-marquee">
          {[...Array(4)].map((_, i) => (
            <span
              key={`r1-${i}`}
              className="font-mono text-[13px] text-white uppercase tracking-[0.12em] mx-0 shrink-0"
            >
              {row1Text}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="flex overflow-hidden whitespace-nowrap">
        <div className="marquee-track flex animate-marquee-reverse">
          {[...Array(4)].map((_, i) => (
            <span
              key={`r2-${i}`}
              className="font-mono text-[11px] text-white/70 uppercase tracking-[0.12em] mx-0 shrink-0"
            >
              {row2Text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
