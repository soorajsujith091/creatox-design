"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, Play, X } from "lucide-react";
import { Header } from "@/components/ui/header-2";
import "./home-video-hero.css";

export function HomeVideoHero() {
  const dialog = useRef<HTMLDialogElement>(null);
  const film = useRef<HTMLVideoElement>(null);
  const closeFilm = () => { film.current?.pause(); dialog.current?.close(); };

  return (
    <section className="home-video-hero" aria-labelledby="home-hero-heading">
      <div className="home-video-navigation"><Header /></div>
      <div className="home-video-stage">
        <svg className="home-video-mask" width="0" height="0" aria-hidden="true"><defs><clipPath id="home-hero-frame" clipPathUnits="objectBoundingBox"><path d="M .025,0 H .975 Q 1,0 1,.05 V .29 C 1,.32 .96,.34 .96,.38 V .69 C .96,.73 1,.75 1,.79 V .86 Q 1,.91 .975,.91 H .85 C .83,.91 .825,1 .805,1 H .22 C .20,1 .195,.91 .175,.91 H .025 Q 0,.91 0,.86 V .05 Q 0,0 .025,0 Z" /></clipPath></defs></svg>
        <div className="home-video-media" aria-hidden="true">
          <Image src="/images/Galloping%20Through%20Desert%20Dust.png" alt="" fill priority sizes="100vw" quality={85} style={{ objectFit: "cover", objectPosition: "62% center" }} />
        </div>
        <div className="home-video-copy">
          <p className="home-video-eyebrow"><span /> CREATOX DESIGNS · KANNUR, KERALA</p>
          <h1 id="home-hero-heading"><span>Your next</span><span>big <em>move.</em></span></h1>
          <p className="home-video-description">A creative digital agency building brands that move forward. Strategy, design, websites and digital marketing — made to connect. Built to grow.</p>
          <button className="home-video-showreel" type="button" onClick={() => { dialog.current?.showModal(); void film.current?.play().catch(() => {}); }}><Play size={18} fill="currentColor" aria-hidden="true" /> Watch showreel</button>
        </div>
        <a className="home-video-discover" href="#home-about">Scroll to discover <ArrowDown size={16} aria-hidden="true" /></a>
        <p className="home-video-signature">CRAFTED WITH <strong>PASSION</strong><br />DRIVEN BY <strong>CREATIVITY</strong></p>
      </div>
      <dialog ref={dialog} className="home-video-dialog" aria-label="Creatox agency showreel" data-lenis-prevent onCancel={closeFilm} onClose={() => film.current?.pause()} onClick={event => { if (event.target === event.currentTarget) closeFilm(); }}>
        <button type="button" className="home-video-close" aria-label="Close showreel" onClick={closeFilm}><X aria-hidden="true" /></button>
        <video ref={film} src="/videos/creatox%20profile%20website%20(2).mp4" controls playsInline preload="none" aria-label="Creatox Designs agency showreel" />
      </dialog>
    </section>
  );
}
