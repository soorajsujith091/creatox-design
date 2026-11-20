"use client";

/* cms-page-fields */
import { PageText, PageLink } from "@/components/cms/PageContent";
import dynamic from "next/dynamic";

import "./about-studio-robot.css";

const BrandRobot = dynamic(() => import("@/components/ui/brand-robot").then(module => module.BrandRobot), { ssr: false });

export function AboutStudioRobot() {
  return <section className="ip-section about-studio-robot" aria-labelledby="studio-hello-heading">
    <div><span className="ip-eyebrow"><PageText field="5d3129e41_1" section="about studio robot" label="Text">{"A little studio personality"}</PageText></span><h2 id="studio-hello-heading"><PageText field="5d3129e41_2" section="about studio robot" label="Heading">{"Say hello to our creative side."}</PageText></h2><p><PageText field="5d3129e41_3" section="about studio robot" label="Text">{"Curiosity, imagination and a playful approach are part of how we work. Meet the people who bring that energy to every project."}</PageText></p><PageLink field="5d3129e41_4" section="about studio robot" href="/our-team/" className="ip-button"><PageText field="5d3129e41_5" section="about studio robot" label="Text">{"Meet our team"}</PageText></PageLink></div>
    <BrandRobot />
  </section>;
}
