"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import "./about-studio-robot.css";

const BrandRobot = dynamic(() => import("@/components/ui/brand-robot").then(module => module.BrandRobot), { ssr: false });

export function AboutStudioRobot() {
  return <section className="ip-section about-studio-robot" aria-labelledby="studio-hello-heading">
    <div><span className="ip-eyebrow">A little studio personality</span><h2 id="studio-hello-heading">Say hello to our creative side.</h2><p>Curiosity, imagination and a playful approach are part of how we work. Meet the people who bring that energy to every project.</p><Link href="/our-team/" className="ip-button">Meet our team</Link></div>
    <BrandRobot />
  </section>;
}
