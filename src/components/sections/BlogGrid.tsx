"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
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
  return <section className="blog-insights site-gutter" aria-labelledby="blog-insights-heading">
    <div className="blog-insights-layout">
      <motion.header className="blog-insights-intro" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : .3 } } }}>
        <motion.div variants={reveal} transition={transition}><SectionLabel text="BLOG & INSIGHTS" /></motion.div>
        <motion.h2 variants={reveal} transition={transition} id="blog-insights-heading">Our latest <span>blogs.</span></motion.h2>
        <motion.p variants={reveal} transition={transition}>Ideas, insights and stories from Creatox. Explore branding, digital marketing and the creative thinking that helps businesses grow.</motion.p>
        <motion.div variants={reveal} transition={transition}><Link href="/blog/" className="blog-insights-view-all">View all posts</Link></motion.div>
        <div className="blog-insights-navigation"><button type="button" disabled={start === 0} onClick={() => setStart(value => value - 1)} aria-label="Previous articles" aria-controls="blog-insights-articles"><ArrowLeft size={18} aria-hidden="true" /></button><button type="button" disabled={start >= blogPosts.length - 2} onClick={() => setStart(value => value + 1)} aria-label="Next articles" aria-controls="blog-insights-articles"><ArrowRight size={18} aria-hidden="true" /></button></div>
        <span className="blog-insights-status" role="status" aria-live="polite">Articles {start + 1}–{Math.min(start + 2, blogPosts.length)} of {blogPosts.length}</span>
      </motion.header>
      <div id="blog-insights-articles" className="blog-insights-articles">
        {blogPosts.map((post, index) => <motion.article key={`${start}-${post.id}`} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} transition={{ ...transition, delay: reduced ? 0 : Math.max(0, index - start) * .3 }} className="blog-insights-card" hidden={index < start || index >= start + 2}>
          <Link href={post.link} tabIndex={-1} aria-hidden="true" className="blog-insights-image"><Image src={failedImages[post.id] ? "/images/creatox-our-story.png" : post.image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1000px) 50vw, 34vw" unoptimized={!failedImages[post.id] && post.image.startsWith("https://")} onError={() => setFailedImages(previous => previous[post.id] ? previous : { ...previous, [post.id]: true })} /></Link>
          <time dateTime={dates[post.id]}>{post.date}</time>
          <h3><Link href={post.link}>{post.title}</Link></h3>
          <p>{summaries[post.id]}</p>
          <Link href={post.link} className="blog-insights-read" aria-label={`Read more: ${post.title}`}>Read more <ArrowRight size={16} aria-hidden="true" /></Link>
        </motion.article>)}
      </div>
    </div>
  </section>;
}
