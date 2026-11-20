"use client";

/* cms-page-fields */
import { PageImage } from "@/components/cms/PageContent";


export function CreativeHeroBackground() {
  return <div className="ref-hero-photo ref-creative-background" aria-hidden="true">
    <PageImage field="3f1f8be75_1" section="creative hero background" src="/images/Galloping%20Through%20Desert%20Dust.png" alt="" fill priority sizes="100vw" quality={85} style={{ objectFit: "cover", objectPosition: "62% center" }} />
  </div>;
}
