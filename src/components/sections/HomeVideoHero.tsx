"use client";

/* cms-native-links */
import { PageAnchor } from "@/components/cms/PageContent";
/* cms-page-fields */
import { PageText } from "@/components/cms/PageContent";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown, Play, X } from "lucide-react";
import { Header } from "@/components/ui/header-2";
import "./home-video-hero.css";

export function HomeVideoHero() {
  const hero = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const film = useRef<HTMLVideoElement>(null);
  const closeFilm = () => { film.current?.pause(); dialog.current?.close(); };
  useEffect(() => {
    const section = hero.current;
    if (!section) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let visible = false;
      let played = false;
      const context = gsap.context(() => {
        const entrance = gsap.timeline({ paused: true });
        entrance.fromTo(".home-video-media", { opacity: .5, scale: 1.025 }, { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" }, 0);
        entrance.fromTo(".home-video-eyebrow, .home-video-copy h1 > span, .home-video-description, .home-video-showreel", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: .13, ease: "power3.out" }, .12);
        entrance.fromTo(".home-video-discover, .home-video-signature", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .8, stagger: .1 }, .85);
        const play = () => {
          if (visible && !played && !document.querySelector("[data-site-preloader]")) { played = true; entrance.play(); }
        };
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; play(); }, { threshold: .15 });
        observer.observe(section);
        // The overlay may finish after the hero has already entered the viewport.
        const overlayObserver = new MutationObserver(play);
        overlayObserver.observe(document.body, { childList: true, subtree: true });
        return () => { observer.disconnect(); overlayObserver.disconnect(); };
      }, section);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={hero} className="home-video-hero" aria-labelledby="home-hero-heading">
      <div className="home-video-navigation"><Header /></div>
      <div className="home-video-stage">
        <svg className="home-video-mask" width="0" height="0" aria-hidden="true"><defs><clipPath id="home-hero-frame" clipPathUnits="objectBoundingBox"><path d="M .025,0 H .975 Q 1,0 1,.05 V .29 C 1,.32 .96,.34 .96,.38 V .69 C .96,.73 1,.75 1,.79 V .86 Q 1,.91 .975,.91 H .85 C .83,.91 .825,1 .805,1 H .22 C .20,1 .195,.91 .175,.91 H .025 Q 0,.91 0,.86 V .05 Q 0,0 .025,0 Z" /></clipPath></defs></svg>
        <div className="home-video-media" aria-hidden="true">
          <video
            src="/videos/magnific_video-prompt-169use-the-provided-reference-image-a_kling_720p_16-9_24fps_88569.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
        <div className="home-video-copy">
          <p className="home-video-eyebrow"><span /> <PageText field="6a1b99e41_1" section="Home Video Hero" label="Text">{"CREATOX DESIGNS · KANNUR, KERALA"}</PageText></p>
          <h1 id="home-hero-heading"><span><PageText field="6a1b99e41_2" section="Home Video Hero" label="Text">{"Your next"}</PageText></span><span><PageText field="6a1b99e41_3" section="Home Video Hero" label="Text">{"big "}</PageText><em><PageText field="6a1b99e41_4" section="Home Video Hero" label="Text">{"move."}</PageText></em></span></h1>
          <p className="home-video-description"><PageText field="6a1b99e41_5" section="Home Video Hero" label="Text">{"A digital marketing agency helping brands move forward. Social media, targeted campaigns and SEO — backed by creative design, websites and software. Built to grow."}</PageText></p>
          <button className="home-video-showreel" type="button" onClick={() => { dialog.current?.showModal(); void film.current?.play().catch(() => {}); }}><Play size={18} fill="currentColor" aria-hidden="true" /> <PageText field="6a1b99e41_6" section="Home Video Hero" label="Button text">{"Watch showreel"}</PageText></button>
        </div>
        <PageAnchor field="anchor_69d56c1af_1" section="HomeVideoHero" className="home-video-discover" href="#home-about"><PageText field="6a1b99e41_7" section="Home Video Hero" label="Text">{"Scroll to discover "}</PageText><ArrowDown size={16} aria-hidden="true" /></PageAnchor>
        <p className="home-video-signature"><PageText field="6a1b99e41_8" section="Home Video Hero" label="Text">{"CRAFTED WITH "}</PageText><strong><PageText field="6a1b99e41_10" section="Home Video Hero" label="Text">{"PASSION"}</PageText></strong><br /><PageText field="6a1b99e41_9" section="Home Video Hero" label="Text">{"DRIVEN BY "}</PageText><strong><PageText field="6a1b99e41_11" section="Home Video Hero" label="Text">{"CREATIVITY"}</PageText></strong></p>
      </div>
      <dialog ref={dialog} className="home-video-dialog" aria-label="Creatox agency showreel" data-lenis-prevent onCancel={closeFilm} onClose={() => film.current?.pause()} onClick={event => { if (event.target === event.currentTarget) closeFilm(); }}>
        <button type="button" className="home-video-close" aria-label="Close showreel" onClick={closeFilm}><X aria-hidden="true" /></button>
        <video ref={film} src="/videos/creatox%20profile%20website%20(2).mp4" controls playsInline preload="none" aria-label="Creatox Designs agency showreel" />
      </dialog>
    </section>
  );
}
