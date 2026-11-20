/* cms-page-fields */
import { PageImage, PageText } from "@/components/cms/PageContent";

import { ArrowUpRight } from "lucide-react";
import { agencyValues } from "@/data/inner-services";
import { Reveal } from "./interactions";
import { SectionIntro } from "./shell";
import "./agency-principles.css";

const labels = ["Original thinking", "Every detail matters", "Different skills. One team.", "Built together"];

export function AgencyPrinciples() {
  return <section className="ip-section agency-principles" aria-label="What drives us">
    <SectionIntro label="What drives us" title="Built on a few good principles." />
    <div className="agency-principles-grid">
      {agencyValues.map((value, index) => <Reveal key={value.title} delay={index * .1} className={`agency-principle-wrap agency-principle-wrap-${index}`}>
        <article className={`agency-principle-card agency-principle-card-${index}`}>
          {(index === 1 || index === 3) && <PageImage field="9aee4f478_1" section="agency principles" src={index === 1 ? "/images/creatox-immersive-brand-studio-hero.png" : "/images/creatox-our-story.png"} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw" />}
          <span className="agency-principle-label"><PageText field="9aee4f478_2" section="agency principles" label="Text">{labels[index]}</PageText></span>
          <div className="agency-principle-copy"><span className="agency-principle-number"><PageText field="9aee4f478_3" section="agency principles" label="Text">{"0"}</PageText><PageText field="9aee4f478_4" section="agency principles" label="Text">{index + 1}</PageText></span><h3><PageText field="9aee4f478_5" section="agency principles" label="Heading">{value.title}</PageText><span><PageText field="9aee4f478_6" section="agency principles" label="Text">{"."}</PageText></span></h3><p><PageText field="9aee4f478_7" section="agency principles" label="Text">{value.description}</PageText></p></div>
          {index === 3 && <span className="agency-principle-signature"><PageText field="9aee4f478_8" section="agency principles" label="Text">{"creatox "}</PageText><ArrowUpRight size={20} aria-hidden="true" /></span>}
        </article>
      </Reveal>)}
    </div>
  </section>;
}
