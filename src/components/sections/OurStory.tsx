import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { SectionLabel } from "../SectionLabel";
import { stats } from "@/data/stats";
import "./our-story.css";

export function OurStory() {
  return <section className="our-story site-gutter" aria-labelledby="our-story-heading">
    <header className="our-story-header">
      <div><SectionLabel text="OUR STORY" /><h2 id="our-story-heading">Creative at heart.<br /><span>Connected by purpose.</span></h2></div>
      <p>Since 2019, we have brought design, strategy and digital thinking together to help brands find their voice. Built in Kannur. Made to connect.</p>
    </header>
    <div className="our-story-cards">
      <div className="our-story-experience">
        <Image src="/images/creatox-our-story.png" alt="Red sculptural ribbon surrounding a glass cube, symbolising creativity and connection" fill sizes="(max-width: 767px) 100vw, 32vw" />
        <dl className="our-story-stats">{stats.slice(0, 2).map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}</dl>
      </div>
      <article className="our-story-statement">
        <div className="our-story-wordmark"><Sparkles size={24} aria-hidden="true" /><span>Creatox<span className="our-story-wordmark-dot">®</span></span></div>
        <p className="our-story-belief">Brands deserve more than visibility.<br />They deserve <span>a voice.</span></p>
        <p className="our-story-signature">Our belief, since 2019</p>
        <Link href="/about-us/" className="our-story-about">Discover our story <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </article>
      <figure className="our-story-team">
        <div className="our-story-team-photo"><Image src="/images/WhatsApp%20Image%202026-10-12%20at%2012.56.42%20PM.jpeg" alt="Creatox Designs team together at the Kannur office" fill sizes="(max-width: 767px) 100vw, 42vw" /></div>
        <figcaption><MapPin size={17} aria-hidden="true" /><span>Creative minds. Kannur, Kerala.</span><ArrowUpRight size={18} aria-hidden="true" /></figcaption>
      </figure>
    </div>
  </section>;
}