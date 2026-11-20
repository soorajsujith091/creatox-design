/* cms-native-links */
import { PageAnchor } from "@/components/cms/PageContent";
/* cms-page-fields */
import { PageText, PageLink, PageImage } from "@/components/cms/PageContent";


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
    <section className="ip-section ip-cta"><span className="ip-eyebrow"><PageText field="35bbb6e58_1" section="shell" label="Text">{"YOUR NEXT CHAPTER"}</PageText></span><Reveal><h2><PageText field="35bbb6e58_2" section="shell" label="Heading">{"Let’s make"}</PageText><br /><span><PageText field="35bbb6e58_3" section="shell" label="Text">{"something matter."}</PageText></span></h2></Reveal><MagneticLink href="/contact-us/">Start a conversation</MagneticLink></section>
    <footer className="ip-footer"><div><BrandLogo className="ip-logo" /><p><PageText field="35bbb6e58_4" section="shell" label="Text">{"Crafting designs and brands"}</PageText><br /><PageText field="35bbb6e58_5" section="shell" label="Text">{"with love since 2019."}</PageText></p><PageAnchor field="anchor_d731aeedf_1" section="shell" href={`mailto:${companyInfo.email}`}><PageText field="35bbb6e58_6" section="shell" label="Text">{companyInfo.email}</PageText><ArrowUpRight size={16} /></PageAnchor></div>{pageGroups.map(group => <div key={group.title}><h2><PageText field="35bbb6e58_7" section="shell" label="Heading">{group.title}</PageText></h2>{group.links.map(link => <PageLink field="35bbb6e58_8" section="shell" href={link.href} key={link.href}><PageText field="35bbb6e58_9" section="shell" label="Text">{link.label}</PageText></PageLink>)}</div>)}<div><h2><PageText field="35bbb6e58_10" section="shell" label="Heading">{"Find us"}</PageText></h2><address><PageText field="35bbb6e58_11" section="shell" label="Text">{companyInfo.address}</PageText></address><PageAnchor field="anchor_d731aeedf_2" section="shell" href={`tel:${companyInfo.phone1.replace(/\s/g, "")}`}><PageText field="35bbb6e58_12" section="shell" label="Text">{companyInfo.phone1}</PageText></PageAnchor><div className="ip-socials">{socialLinks.map(link => <PageAnchor field="anchor_d731aeedf_3" section="shell" key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"><PageText field="35bbb6e58_13" section="shell" label="Text">{link.name}</PageText><ArrowUpRight size={12} /></PageAnchor>)}</div></div><div className="ip-copyright">© {new Date().getFullYear()} Creatox Designs. All rights reserved.<span><PageText field="35bbb6e58_14" section="shell" label="Text">{"Kannur, Kerala · Made to connect."}</PageText></span></div></footer>
  </div>;
}

const heroBackgrounds: Record<string, string> = {
  "Our expertise": "/images/creatox-immersive-brand-studio-hero.png",
  "Our clients": "/images/creatox-creative-studio-hero.png",
  "Life at Creatox": "/images/WhatsApp%20Image%202026-10-12%20at%2012.56.42%20PM.jpeg",
  "Get in touch": "/images/creatox-our-story.png",
  "Selected work": "/images/Robotic%20Hands%20and%20Glowing%20Starburst%20Emblem.png",
  "Case studies": "/images/creatox-immersive-brand-studio-hero.png",
};

export function PageHero({ eyebrow, title, description, image, compact = false }: { eyebrow: string; title: string; description: string; image?: string; imageAlt?: string; compact?: boolean }) {
  const background = image || heroBackgrounds[eyebrow] || "/images/creatox-creative-studio-hero.png";
  return <section className={`ip-hero ${compact ? "ip-hero-compact" : ""}`}>
    <div className="ip-hero-background" aria-hidden="true"><PageImage field="35bbb6e58_15" section="shell" src={background} alt="" fill priority sizes="100vw" unoptimized={background.endsWith(".svg") || background.startsWith("https://")} /></div>
    <nav className="ip-breadcrumb" aria-label="Breadcrumb"><PageLink field="35bbb6e58_16" section="shell" href="/"><PageText field="35bbb6e58_17" section="shell" label="Text">{"Home"}</PageText></PageLink><ArrowRight size={12} aria-hidden="true" /><span aria-current="page"><PageText field="35bbb6e58_18" section="shell" label="Text">{eyebrow}</PageText></span></nav>
    <Reveal><span className="ip-eyebrow"><PageText field="35bbb6e58_19" section="shell" label="Text">{"[ "}</PageText><PageText field="35bbb6e58_20" section="shell" label="Text">{eyebrow}</PageText> <PageText field="35bbb6e58_21" section="shell" label="Text">{"]"}</PageText></span><h1><PageText field="35bbb6e58_22" section="shell" label="Heading">{title}</PageText></h1><p className="ip-lead"><PageText field="35bbb6e58_23" section="shell" label="Text">{description}</PageText></p></Reveal>
  </section>;
}

export function SectionIntro({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return <Reveal className="ip-section-intro"><div><span className="ip-eyebrow"><PageText field="35bbb6e58_24" section="shell" label="Text">{"[ "}</PageText><PageText field="35bbb6e58_25" section="shell" label="Text">{label}</PageText> <PageText field="35bbb6e58_26" section="shell" label="Text">{"]"}</PageText></span><h2><PageText field="35bbb6e58_27" section="shell" label="Heading">{title}</PageText></h2></div>{children && <div className="ip-intro-copy">{children}</div>}</Reveal>;
}
