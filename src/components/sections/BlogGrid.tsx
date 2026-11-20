"use client";

/* cms-page-fields */
import { PageText, PageLink, PageImage } from "@/components/cms/PageContent";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";


import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { CmsArticles } from "@/components/CmsArticles";
import { SectionLabel } from "../SectionLabel";
import "./blog-insights.css";

const summaries: Record<string, string> = {
  "external-linking-seo": "Explore how relevant external links can support a useful content strategy and help readers discover trusted information.",
  "art-of-storytelling": "Discover how stories built around people can bring your brand closer to its audience through engaging video content.",
  "what-is-ppc": "Get familiar with pay-per-click advertising and the role paid campaigns can play in your digital marketing strategy.",
};
const dates: Record<string, string> = { "external-linking-seo": "2025-03-20", "art-of-storytelling": "2025-02-27", "what-is-ppc": "2025-02-14" };

export function BlogGrid() {
  const reduced = useReducedMotion();
  const reveal = { hidden: { opacity: 0, y: reduced ? 0 : 32 }, visible: { opacity: 1, y: 0 } };
  const transition = { duration: reduced ? 0 : 1.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  const [start, setStart] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  return <><CmsArticles /><section className="blog-insights site-gutter" aria-labelledby="blog-insights-heading">
    <div className="blog-insights-layout">
      <motion.header className="blog-insights-intro" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : .3 } } }}>
        <motion.div variants={reveal} transition={transition}><SectionLabel text="BLOG & INSIGHTS" /></motion.div>
        <motion.h2 variants={reveal} transition={transition} id="blog-insights-heading">Our latest <span><PageText field="7bc7002fd_1" section="Blog Grid" label="Text">{"blogs."}</PageText></span></motion.h2>
        <motion.p variants={reveal} transition={transition}>Ideas, insights and stories from Creatox. Explore branding, digital marketing and the creative thinking that helps businesses grow.</motion.p>
        <motion.div variants={reveal} transition={transition}><PageLink field="7bc7002fd_2" section="Blog Grid" href="/blog/" className="blog-insights-view-all"><PageText field="7bc7002fd_3" section="Blog Grid" label="Text">{"View all posts"}</PageText></PageLink></motion.div>
        <div className="blog-insights-navigation"><button type="button" disabled={start === 0} onClick={() => setStart(value => value - 1)} aria-label="Previous articles" aria-controls="blog-insights-articles"><ArrowLeft size={18} aria-hidden="true" /></button><button type="button" disabled={start >= blogPosts.length - 2} onClick={() => setStart(value => value + 1)} aria-label="Next articles" aria-controls="blog-insights-articles"><ArrowRight size={18} aria-hidden="true" /></button></div>
        <span className="blog-insights-status" role="status" aria-live="polite"><PageText field="7bc7002fd_4" section="Blog Grid" label="Text">{"Articles "}</PageText><PageText field="7bc7002fd_5" section="Blog Grid" label="Text">{start + 1}</PageText><PageText field="7bc7002fd_6" section="Blog Grid" label="Text">{"–"}</PageText><PageText field="7bc7002fd_7" section="Blog Grid" label="Text">{Math.min(start + 2, blogPosts.length)}</PageText> <PageText field="7bc7002fd_8" section="Blog Grid" label="Text">{"of "}</PageText><PageText field="7bc7002fd_9" section="Blog Grid" label="Text">{blogPosts.length}</PageText></span>
      </motion.header>
      <div id="blog-insights-articles" className="blog-insights-articles">
        {blogPosts.map((post, index) => <motion.article key={`${start}-${post.id}`} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} transition={{ ...transition, delay: reduced ? 0 : Math.max(0, index - start) * .3 }} className="blog-insights-card" hidden={index < start || index >= start + 2}>
          <PageLink field="7bc7002fd_10" section="Blog Grid" href={post.link} tabIndex={-1} aria-hidden="true" className="blog-insights-image"><PageImage field="7bc7002fd_11" section="Blog Grid" src={failedImages[post.id] ? "/images/creatox-our-story.png" : post.image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1000px) 50vw, 34vw" unoptimized={!failedImages[post.id] && post.image.startsWith("https://")} onError={() => setFailedImages(previous => previous[post.id] ? previous : { ...previous, [post.id]: true })} /></PageLink>
          <time dateTime={dates[post.id]}>{post.date}</time>
          <h3><PageLink field="7bc7002fd_12" section="Blog Grid" href={post.link}><PageText field="7bc7002fd_13" section="Blog Grid" label="Text">{post.title}</PageText></PageLink></h3>
          <p><PageText field="7bc7002fd_14" section="Blog Grid" label="Text">{summaries[post.id]}</PageText></p>
          <PageLink field="7bc7002fd_15" section="Blog Grid" href={post.link} className="blog-insights-read" aria-label={`Read more: ${post.title}`}><PageText field="7bc7002fd_16" section="Blog Grid" label="Text">{"Read more "}</PageText><ArrowRight size={16} aria-hidden="true" /></PageLink>
        </motion.article>)}
      </div>
    </div>
  </section></>;
}
