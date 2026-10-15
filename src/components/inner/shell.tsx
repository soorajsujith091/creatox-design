import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Header as SiteNavigation } from "@/components/ui/header-2";
import { pageGroups } from "@/data/page-navigation";
import { companyInfo, socialLinks } from "@/data/stats";
import { MagneticLink, Reveal } from "./interactions";

export function InnerShell({ children }: { children: ReactNode }) {
  return <div className="inner-site">
    <div className="ip-nav"><SiteNavigation /></div>
    {children}
    <section className="ip-section ip-cta"><span className="ip-eyebrow">YOUR NEXT CHAPTER</span><Reveal><h2>Let’s make<br /><span>something matter.</span></h2></Reveal><MagneticLink href="/contact-us/">Start a conversation</MagneticLink></section>
    <footer className="ip-footer"><div><BrandLogo className="ip-logo" /><p>Crafting designs and brands<br />with love since 2019.</p><a href={`mailto:${companyInfo.email}`}>{companyInfo.email}<ArrowUpRight size={16} /></a></div>{pageGroups.map(group => <div key={group.title}><h2>{group.title}</h2>{group.links.map(link => <Link href={link.href} key={link.href}>{link.label}</Link>)}</div>)}<div><h2>Find us</h2><address>{companyInfo.address}</address><a href={`tel:${companyInfo.phone1.replace(/\s/g, "")}`}>{companyInfo.phone1}</a><div className="ip-socials">{socialLinks.map(link => <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer">{link.name}<ArrowUpRight size={12} /></a>)}</div></div><div className="ip-copyright">© {new Date().getFullYear()} Creatox Designs. All rights reserved.<span>Kannur, Kerala · Made to connect.</span></div></footer>
  </div>;
}

export function PageHero({ eyebrow, title, description, image, imageAlt = "", compact = false }: { eyebrow: string; title: string; description: string; image?: string; imageAlt?: string; compact?: boolean }) {
  return <section className={`ip-hero ${compact ? "ip-hero-compact" : ""}`}>
    <nav className="ip-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><ArrowRight size={12} aria-hidden="true" /><span aria-current="page">{eyebrow}</span></nav>
    <Reveal><span className="ip-eyebrow">[ {eyebrow} ]</span><h1>{title}</h1><p className="ip-lead">{description}</p></Reveal>
    {image && <Reveal className="ip-hero-image"><Image src={image} alt={imageAlt} fill priority sizes="(max-width: 767px) 100vw, 90vw" unoptimized={image.endsWith(".svg")} /></Reveal>}
  </section>;
}

export function SectionIntro({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return <Reveal className="ip-section-intro"><div><span className="ip-eyebrow">[ {label} ]</span><h2>{title}</h2></div>{children && <div className="ip-intro-copy">{children}</div>}</Reveal>;
}
