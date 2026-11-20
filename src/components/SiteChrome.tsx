"use client";
import { usePathname } from "next/navigation";
import { Preloader } from "./Preloader";
import { CustomCursor } from "./CustomCursor";
import { Navbar } from "./Navbar";
import { MobileStickyBar } from "./MobileStickyBar";
import { ScrollToTop } from "./ScrollToTop";
export function SiteChrome({ bottom = false }: { bottom?: boolean }) {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;
  return bottom ? <><MobileStickyBar/><ScrollToTop/></> : <><Preloader/><CustomCursor/><Navbar/><div className="noise-overlay" aria-hidden="true"/><div className="grid-overlay" aria-hidden="true"/></>;
}
