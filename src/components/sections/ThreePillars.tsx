"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { SectionLabel } from "../SectionLabel";
import { Component as GradientBlurBackground } from "@/components/ui/gradient-blur-bg";
import "./three-pillars.css";

const disciplines = [
  {
    title: "Market & Grow", heading: ["Market", "& Grow"],
    description: "Reach the right people with the right message. We connect strategy, content and digital campaigns to help your brand build its presence and grow.",
    link: "/service/social-media-management/", button: "Explore digital marketing",
    details: [
      { title: "Social media management", text: "Build a consistent presence through content planning, creative posts and social campaigns that reflect your brand and encourage your audience to engage." },
      { title: "Ads & campaigns", text: "Reach relevant audiences through Facebook, Instagram and Google advertising. We connect campaign strategy with creative messages and clear business objectives." },
      { title: "Search engine optimisation", text: "Help people discover your business with relevant content, clear page structure and SEO work focused on the services and information your audience searches for." },
      { title: "Content-led growth", text: "From campaign visuals to video and written content, we bring creative production and marketing together to give your brand a stronger, more consistent voice." },
    ],
  },
  {
    title: "Design & Experience", heading: ["Design", "& Experience"],
    description: "Build a brand people recognise, remember and connect with. We turn your story into a visual identity that works across every touchpoint.",
    link: "/service/branding-and-design/", button: "Explore branding & design",
    details: [
      { title: "Brand strategy & identity", text: "We shape your brand around your business, audience and ambitions. From positioning and personality to logos, colour and typography, every element tells a consistent story." },
      { title: "Creative design & communication", text: "Give your ideas a clear visual voice through campaign creatives, print materials and digital assets designed to communicate your value." },
      { title: "Content & visual storytelling", text: "Photography, brand films and creative content bring your story to life and help your audience understand what makes your business different." },
      { title: "Consistent brand experiences", text: "We connect your visual identity across websites, social channels and marketing materials so your brand feels familiar wherever people find it." },
    ],
  },
  {
    title: "Build & Transform", heading: ["Build", "& Transform"],
    description: "Turn your ideas into useful digital experiences. We build responsive websites, online stores and applications around your business and the people who use them.",
    link: "/service/creative-branding/", button: "Explore web development",
    details: [
      { title: "Purposeful website design", text: "Your website should reflect your brand and make the next step clear. We bring design and development together to create a digital home built around your goals." },
      { title: "Mobile-friendly user experiences", text: "Clear navigation, readable content and responsive layouts help visitors explore your website and get in touch across phones, tablets and desktop screens." },
      { title: "E-commerce development", text: "We create online stores with organised product pages and straightforward shopping journeys, helping customers move from discovering a product to placing an order." },
      { title: "Web & mobile applications", text: "Custom applications help businesses simplify processes and connect with users. We shape the experience around the tasks your customers and team need to complete." },
      { title: "Search-friendly foundations", text: "Structured pages, descriptive headings and considered site architecture give your content a clear foundation for search visibility and future growth." },
    ],
  },
];

export function ThreePillars() {
  const reduced = useReducedMotion();
  return <section className="expertise-columns" aria-label="What We Do">
    <GradientBlurBackground fixed className="expertise-columns-background" />
    <header className="expertise-columns-label"><SectionLabel text="WHAT WE DO"/></header>
    <div className="expertise-columns-grid">{disciplines.map((discipline, index) => <motion.article key={discipline.title} className={`expertise-column expertise-column-${index}`} initial={reduced ? false : { opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: reduced ? 0 : .6 }}>
      <div className="expertise-column-heading">
        <span className="expertise-column-number">0{index + 1} / CREATOX EXPERTISE</span>
        <h3>{discipline.heading[0]}<br /><span>{discipline.heading[1]}</span></h3>
        <div className="expertise-column-butterfly" aria-hidden="true">
          {discipline.title === "Build & Transform" ? <div className="expertise-column-orb"><Image src="/images/build-transform-orb.jpeg" alt="" fill sizes="160px" /></div> : <Image src={discipline.title === "Market & Grow" ? (reduced ? "/images/market-grow-ring-still.png" : "/images/market-grow-ring.gif") : (reduced ? "/images/expertise-papillon-still.png" : "/images/expertise-papillon.gif")} alt="" fill unoptimized sizes="160px" />}
        </div>
      </div>
      <div className="expertise-column-content">
        <div className="expertise-column-intro">
          <p>{discipline.description}</p>
          <Link className="expertise-column-cta" href={discipline.link}>{discipline.button}<ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="expertise-column-details">{discipline.details.map((detail, detailIndex) => <details key={detail.title} open={detailIndex === 0}>
          <summary><h4>{detail.title}</h4><Plus size={18} aria-hidden="true" /></summary>
          <p>{detail.text}</p>
        </details>)}</div>
      </div>
    </motion.article>)}</div>
  </section>;
}
