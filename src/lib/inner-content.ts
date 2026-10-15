import type { Metadata } from "next";
import { createElement } from "react";
import sourcePages from "@/data/website/pages.json";
import articles from "@/data/website/articles.json";
import projects from "@/data/website/projects.json";
import { innerServices } from "@/data/inner-services";

export { sourcePages, articles, projects, innerServices };
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://creatoxdesigns.com").replace(/\/$/, "");
export const companyPages: Record<string, { title: string; description: string }> = {
  "about-us": { title: "Creative at heart. Connected by purpose.", description: "Meet Creatox, the Kannur team bringing branding, design, web development and digital marketing together since 2019." },
  services: { title: "Good ideas. Thoughtfully built.", description: "Explore Creatox’s branding, web design, digital marketing, production and development services in Kannur, Kerala." },
  "our-clients": { title: "Great work starts with great relationships.", description: "Meet the businesses and brands that work with Creatox for creative, strategic and technology-driven solutions." },
  "our-team": { title: "Different talents. One creative purpose.", description: "Meet the people behind Creatox’s design, development and digital marketing work." },
  lifecreatox: { title: "The people. The process. The good moments.", description: "Life at Creatox means learning continuously, creating boldly and growing together in a supportive environment." },
  career: { title: "Make your next move a creative one.", description: "Explore creative careers at Creatox in Kannur. Connect with a team of designers, developers, editors and marketers." },
  "contact-us": { title: "Have an idea? Let’s make it happen.", description: "Talk to Creatox about branding, websites and digital campaigns. Visit our Kannur studio or get in touch by phone and email." },
  projects: { title: "Work that speaks.", description: "Explore Creatox’s branding, digital, website and marketing projects for businesses across industries." },
  "case-studies": { title: "Real brands. Meaningful connections.", description: "Go behind the work: explore Creatox’s case studies, creative approach and digital solutions." },
  blog: { title: "Ideas worth sharing.", description: "Branding, design and digital marketing insights from Creatox. Explore our latest articles and practical perspectives." },
  "grand-malabar-expo": { title: "Bringing people and brands together.", description: "Explore Creatox’s social media, branding, website and advertising work for Grand Malabar Expo 2025." },
  faq: { title: "Good questions. Clear answers.", description: "Learn about working with Creatox, our services and how to start your next branding, website or digital marketing project." },
};
export const aliases: Record<string, string> = { "the-art-of-storytelling": "the-art-of-storytelling-how-human-focused-videos-drive-conversions", "what-is-ppc": "what-is-ppc-learn-the-basics-of-pay-per-click-ppc-marketing", "blog-standard": "blog", "blog-grid": "blog", "portfolio-showcase": "projects", "portfolio-grid": "projects", "careers": "career" };
export function allPaths() {
  return [...Object.keys(companyPages), ...innerServices.map(s => `service/${s.slug}`), ...projects.map(p => `portfolio/${p.slug}`), ...articles.map(a => a.slug)];
}
export function pageMetadata(path: string): Metadata {
  const service = innerServices.find(s => `service/${s.slug}` === path);
  const project = projects.find(p => `portfolio/${p.slug}` === path);
  const article = articles.find(a => a.slug === path);
  const page = companyPages[path];
  const title = service ? `${service.title} in Kannur` : project?.title || article?.title || (page ? path === "about-us" ? "About us" : path.replace(/-/g," ").replace(/\b\w/g,s=>s.toUpperCase()) : "Page not found");
  const description = (service?.description || project?.description || article?.description || page?.description || "Explore Creatox Designs.").slice(0,170);
  const image = service?.image || project?.image || article?.image || "/images/creatox-immersive-brand-studio-hero.png";
  return { title: `${title} | Creatox Designs`, description, metadataBase: new URL(siteUrl), alternates: { canonical: `/${path}/` }, openGraph: { title: `${title} | Creatox Designs`, description, url: `${siteUrl}/${path}/`, type: article ? "article" : "website", images: [{ url: image, alt: title }], siteName: "Creatox Designs" }, twitter: { card: "summary_large_image", title, description, images: [image] } };
}
export function JsonLd({ value }: { value: unknown }) {
  return createElement("script", { type: "application/ld+json", dangerouslySetInnerHTML: { __html: JSON.stringify(value).replace(/</g,"\\u003c") } });
}
