"use client";

/* cms-native-links */
import { PageAnchor } from "@/components/cms/PageContent";
/* cms-page-fields */
import { PageText, PageLink } from "@/components/cms/PageContent";

import { Phone } from "lucide-react";

export function MobileStickyBar() {
  return (
    <div
      className="fixed bottom-0 left-0 w-full z-50 bg-[#111111] border-t border-[#303030] flex md:hidden"
      role="complementary"
      aria-label="Quick actions"
    >
      <PageAnchor field="anchor_a9d340218_1" section="MobileStickyBar"
        href="tel:+918086082888"
        className="flex-1 flex items-center justify-center gap-2 py-4 text-white font-mono text-[13px] border-r border-[#303030] hover:bg-black transition-colors"
        aria-label="Call now"
      >
        <Phone size={16} />
        <PageText field="cf9c5e9e7_1" section="Mobile Sticky Bar" label="Text">{"Call Now"}</PageText></PageAnchor>
      <PageLink field="cf9c5e9e7_2" section="Mobile Sticky Bar"
        href="/#contact"
        className="flex-1 flex items-center justify-center py-4 bg-red text-white font-mono text-[13px] hover:bg-redDark transition-colors"
      >
        <PageText field="cf9c5e9e7_3" section="Mobile Sticky Bar" label="Text">{"Start a Project →"}</PageText></PageLink>
    </div>
  );
}
