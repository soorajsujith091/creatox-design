"use client";

/* cms-native-links */
import { PageAnchor } from "@/components/cms/PageContent";
/* cms-page-fields */
import { PageImage, PageText } from "@/components/cms/PageContent";

import { ParallaxScrollFeature } from "../ui/parallax-scroll-feature-section";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "../SectionLabel";
import "./grand-malabar-expo.css";

const campaignImage = "/images/Creatox%20x%20jalolsavam%20copy.jpg.jpeg";


export function MalabarJalolsavam() {
  return (
    <section className="malabar-feature jalolsavam-feature site-gutter" aria-labelledby="jalolsavam-heading">
      <ParallaxScrollFeature reverse media={<div className="malabar-main-image jalolsavam-main-image malabar-reveal">
          <PageImage field="4e08fb364_1" section="Malabar Jalolsavam" src={campaignImage} alt="Creatox campaign for Malabar Jalolsavam 2026, featuring snake boats, social media creatives and 5 million plus views" fill sizes="(max-width: 767px) 100vw, 42vw" />
          <span className="malabar-image-caption"><PageText field="4e08fb364_2" section="Malabar Jalolsavam" label="Text">{"MALABAR JALOLSAVAM / 2026"}</PageText></span>
        </div>}>

        <div className="malabar-content">
          <div className="malabar-reveal">
            <SectionLabel text="MALABAR JALOLSAVAM" />
            <h2 id="jalolsavam-heading"><PageText field="4e08fb364_3" section="Malabar Jalolsavam" label="Heading">{"Making waves."}</PageText><br /><PageText field="4e08fb364_4" section="Malabar Jalolsavam" label="Heading">{"Reaching"}</PageText><br /><span><PageText field="4e08fb364_5" section="Malabar Jalolsavam" label="Text">{"millions."}</PageText></span></h2>
            <p className="malabar-description"><PageText field="4e08fb364_6" section="Malabar Jalolsavam" label="Text">{"For Malabar Jalolsavam 2026, Creatox brought the excitement of the boat race to social media. Creative content and digital promotion helped Navodaya Mangalassery reach audiences far beyond the venue."}</PageText></p>
          </div>
          <div className="malabar-highlights malabar-reveal">
            <dl className="malabar-stats">
              <div><dt><PageText field="4e08fb364_7" section="Malabar Jalolsavam" label="Text">{"Content views"}</PageText></dt><dd><PageText field="4e08fb364_8" section="Malabar Jalolsavam" label="Text">{"5M+"}</PageText></dd></div>
              <div><dt><PageText field="4e08fb364_9" section="Malabar Jalolsavam" label="Text">{"Malabar Jalolsavam"}</PageText></dt><dd><PageText field="4e08fb364_10" section="Malabar Jalolsavam" label="Text">{"2026"}</PageText></dd></div>
            </dl>
            <div className="malabar-detail-image jalolsavam-detail-image"><PageImage field="4e08fb364_11" section="Malabar Jalolsavam" src="/images/Screenshot%202026-10-14%20111858-Photoroom.png" alt="Malabar Jalolsavam 2026 — Navodaya Mangalassery logo" fill sizes="(max-width: 767px) 40vw, 20vw" /></div>
          </div>
          <PageAnchor field="anchor_14c532f88_1" section="MalabarJalolsavam" href={campaignImage} target="_blank" rel="noopener noreferrer" className="malabar-link"><PageText field="4e08fb364_12" section="Malabar Jalolsavam" label="Text">{"View the campaign "}</PageText><ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> <PageText field="4e08fb364_13" section="Malabar Jalolsavam" label="Text">{"(opens in a new tab)"}</PageText></span></PageAnchor>
        </div>
      </ParallaxScrollFeature>
    </section>
  );
}
