import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { stats, badges } from "@/data/stats";
import { SectionLabel } from "../SectionLabel";
import "./achievements.css";

const descriptions = [
  "Creative thinking, purposeful design and digital experiences. Growing with brands since 2019.",
  "Brand identities, websites and campaigns created to help businesses connect with people.",
  "Designers, strategists and developers bringing different skills to one shared purpose.",
];

export function Stats() {
  return <section className="achievement-section site-gutter" aria-labelledby="achievement-heading">
    <header className="achievement-header">
      <div><SectionLabel text="ACHIEVEMENT" /><h2 id="achievement-heading">Creative expertise<br />you can <span>count on.</span></h2></div>
      <div className="achievement-intro"><p>Behind every project is a team that cares. We combine creativity, strategy and technology to turn brand ambitions into meaningful experiences.</p><Link href="/about-us/" className="achievement-about">Meet Creatox <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
    </header>
    <div className="achievement-cards">
      <div className="achievement-photo"><Image src="/images/WhatsApp%20Image%202026-10-12%20at%2012.56.42%20PM.jpeg" alt="The Creatox Designs team at its Kannur office" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 20vw" /></div>
      {stats.slice(0, 3).map((stat, index) => <article key={stat.label} className={`achievement-card achievement-stat achievement-stat-${index}`} aria-label={`${stat.value} ${stat.label}`}>
        <span className={`achievement-motif achievement-motif-${index}`} aria-hidden="true" />
        <p className="achievement-value">{stat.value}</p><h3>{stat.label}</h3><p className="achievement-detail">{descriptions[index]}</p>
      </article>)}
      <article className="achievement-card achievement-start">
        <span className="achievement-motif achievement-motif-3" aria-hidden="true" />
        <div className="achievement-partners"><span>{stats[3].value}</span><span>Industry partners</span></div>
        <h3>Let’s build<br />your next chapter.</h3><p className="achievement-detail">Bring your idea. We’ll bring the creative thinking to move it forward.</p><a href="#contact" className="achievement-start-link">Get started with us <ArrowUpRight size={18} aria-hidden="true" /></a>
      </article>
    </div>
    <ul className="achievement-badges" aria-label="Partnerships and affiliations">{badges.map(badge => <li key={badge}>{badge}</li>)}</ul>
  </section>;
}
