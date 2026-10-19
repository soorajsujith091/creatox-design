"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import "./diagonal-marquee-carousel.css";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  url: string;
  title: string;
}

export interface DiagonalMarqueeCarouselProps {
  cards?: CardItem[];
  angle?: number;
  baseSpeed?: number;
  alternateDirections?: boolean;
  className?: string;
  cardClassName?: string;
  fadeClassName?: string;
}

const DEFAULT_CARDS: CardItem[] = [
  {
    id: 2,
    url: "https://cdn.21st.dev/assets/mirror/ea/ea608dad4b140cc5d6ecc2be86bc5f2deeafe98cf8502d871282048215e3d622.jpg",
    title: "Landscape",
  },
  {
    id: 3,
    url: "https://cdn.21st.dev/assets/mirror/6b/6b6fec49246cddee6ba49e493fc5bb31edf1e12c654756552620b78a83c9ddc1.jpg",
    title: "Nature",
  },
  {
    id: 4,
    url: "https://cdn.21st.dev/assets/mirror/28/280d2dbc25810f40d5dc719091c10506bae978a6aeebdfc4d6f8ac322a1fa31d.jpg",
    title: "Forest",
  },
  {
    id: 5,
    url: "https://cdn.21st.dev/assets/mirror/c8/c8853a7d2976e101bce74f1bf4431ea59703f7e21f1c1b3ebeba16d4e35c2146.jpg",
    title: "Bridge",
  },
  {
    id: 6,
    url: "https://cdn.21st.dev/assets/mirror/3c/3c4fd6a11e5a0b20c886fd010021f39c102483ae6c8eda44e15b4d42fe32c5bd.jpg",
    title: "Ocean",
  },
  {
    id: 7,
    url: "https://cdn.21st.dev/assets/mirror/78/78039a78d191168120b66b5b97565b64cb1751b0cadfcaab4d9b03a785b41925.jpg",
    title: "Valley",
  },
];

const Card = ({ card, className }: { card: CardItem; className?: string }) => {
  return (
    <div
      className={cn(
        "group relative h-[300px] w-[400px] shrink-0 overflow-hidden rounded-xl shadow-2xl",
        className,
      )}
    >
      <img
        src={card.url}
        loading="lazy"
        decoding="async"
        width={400}
        height={300}
        alt={card.title}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};

const MarqueeRow = ({
  cards,
  speed,
  direction,
  cardClassName,
  progress,
}: {
  cards: CardItem[];
  speed: number;
  progress: MotionValue<number>;
  direction: 1 | -1;
  cardClassName?: string;
}) => {
  const reducedMotion = useReducedMotion();
  const distance = 10 * (120 / Math.max(speed, 20));
  const x = useTransform(progress, [0, 1], direction === -1
    ? ["-2%", `-${2 + distance}%`]
    : [`-${2 + distance}%`, "-2%"]);

  return (
    <div className="flex w-full overflow-hidden">
      <motion.div
        className="diagonal-marquee-track flex shrink-0"
        style={{ x: reducedMotion ? "-2%" : x }}
      >
        <div className="flex shrink-0">
          {cards.map((card, idx) => (
            <div key={`${card.id}-${idx}`} className="shrink-0 pr-8">
              <Card card={card} className={cardClassName} />
            </div>
          ))}
        </div>
        <div className="flex shrink-0" aria-hidden="true">
          {cards.map((card, idx) => (
            <div key={`${card.id}-${idx}-copy`} className="shrink-0 pr-8">
              <Card card={card} className={cardClassName} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function DiagonalMarqueeCarousel({
  cards = DEFAULT_CARDS,
  angle = -25,
  baseSpeed = 120,
  alternateDirections = true,
  className = "",
  cardClassName = "",
  fadeClassName = "",
}: DiagonalMarqueeCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotationStyle = {
    transform: `rotate(${angle}deg)`,
  };

  const rowCards = [...cards, ...cards, ...cards];
  const rowCardsReverse = [...rowCards].reverse();

  return (
    <div
      ref={containerRef}
      className={cn(
        "diagonal-marquee relative flex h-screen w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute z-0 flex w-[200vw] flex-col gap-8"
        style={rotationStyle}
      >
        <MarqueeRow
          progress={scrollYProgress}
          cards={rowCards}
          speed={baseSpeed}
          direction={-1}
          cardClassName={cardClassName}
        />
        <MarqueeRow
          progress={scrollYProgress}
          cards={rowCardsReverse}
          speed={baseSpeed - 15 > 20 ? baseSpeed - 15 : 30}
          direction={alternateDirections ? 1 : -1}
          cardClassName={cardClassName}
        />
        <MarqueeRow
          progress={scrollYProgress}
          cards={rowCards}
          speed={baseSpeed + 15}
          direction={-1}
          cardClassName={cardClassName}
        />
        <MarqueeRow
          progress={scrollYProgress}
          cards={rowCardsReverse}
          speed={baseSpeed - 6 > 20 ? baseSpeed - 6 : 35}
          direction={alternateDirections ? 1 : -1}
          cardClassName={cardClassName}
        />
        <MarqueeRow
          progress={scrollYProgress}
          cards={rowCards}
          speed={baseSpeed + 24}
          direction={-1}
          cardClassName={cardClassName}
        />
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-10 h-1/4 bg-gradient-to-b from-white to-transparent dark:from-neutral-950",
          fadeClassName,
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/4 bg-gradient-to-t from-white to-transparent dark:from-neutral-950",
          fadeClassName,
        )}
      />
    </div>
  );
}

/**
 * Great UI Component
 *
 * Built with React, TypeScript, Tailwind CSS, and Framer Motion.
 * Designed to be accessible, customizable, and production-ready.
 *
 * Website: https://great-ui.com
 * GitHub: https://github.com/Saurabh-2607/GreatUI
 * X (Great UI): https://x.com/GreatUIHQ
 *
 * Released under the MIT License.
 * Contributions, issues, and feature requests are always welcome.
 *
 * Author: Saurabh Sharma
 * X: https://x.com/srbh_s
 */
