"use client";

import Image from "next/image";

export function CreativeHeroBackground() {
  return <div className="ref-hero-photo ref-creative-background" aria-hidden="true">
    <Image src="/images/Galloping%20Through%20Desert%20Dust.png" alt="" fill priority sizes="100vw" quality={85} style={{ objectFit: "cover", objectPosition: "62% center" }} />
  </div>;
}
