"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ParallaxScrollFeature } from "../ui/parallax-scroll-feature-section";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "../SectionLabel";
import "./grand-malabar-expo.css";

const expoImage = "https://creatoxdesigns.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-24-at-5.15.02-PM.jpeg";

export function GrandMalabarExpo() {
  const [imageFailed, setImageFailed] = useState(false);
  const image = imageFailed ? "/images/project-sports-concept.png" : expoImage;
  const imageAlt = imageFailed ? "Illustrative event campaign concept" : "Grand Malabar Expo 2025 event";
  return <section className="malabar-feature expo-feature site-gutter" aria-labelledby="malabar-heading">
    <ParallaxScrollFeature media={<div className="malabar-main-image malabar-reveal">
        <Image src={image} alt={imageAlt} fill unoptimized={!imageFailed} sizes="(max-width: 767px) 100vw, 42vw" onError={() => setImageFailed(true)} />
        <span className="malabar-image-caption">GRAND MALABAR EXPO / 2025</span>
      </div>}>

      <div className="malabar-content">
        <div className="malabar-reveal">
          <SectionLabel text="GRAND MALABAR EXPO" />
          <h2 id="malabar-heading">Bringing people<br />and brands<br /><span>together.</span></h2>
          <p className="malabar-description">As the official social media partner for Grand Malabar Expo 2025, Creatox helped the event connect with audiences through creative content, digital campaigns and continuous visitor engagement.</p>
        </div>
        <div className="malabar-highlights malabar-reveal">
          <dl className="malabar-stats"><div><dt>Happy visitors</dt><dd>1L+</dd></div><div><dt>Views</dt><dd>21M+</dd></div></dl>
          <div className="malabar-detail-image"><Image src="/images/Screenshot%202026-10-15%20105038.png" alt="" fill sizes="(max-width: 767px) 40vw, 20vw" /></div>
        </div>
        <Link href="/grand-malabar-expo/" className="malabar-link">Explore the partnership <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </ParallaxScrollFeature>
  </section>;
}
