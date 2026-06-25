"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

export function MobileStickyBar() {
  return (
    <div
      className="fixed bottom-0 left-0 w-full z-50 bg-black border-t border-border flex md:hidden"
      role="complementary"
      aria-label="Quick actions"
    >
      <a
        href="tel:+918086082888"
        className="flex-1 flex items-center justify-center gap-2 py-4 text-white font-mono text-[13px] border-r border-border hover:bg-surface transition-colors"
        aria-label="Call now"
      >
        <Phone size={16} />
        Call Now
      </a>
      <Link
        href="/contact-us/"
        className="flex-1 flex items-center justify-center py-4 bg-red text-white font-mono text-[13px] hover:bg-redDark transition-colors"
      >
        Start a Project →
      </Link>
    </div>
  );
}
