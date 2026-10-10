"use client";

/** Shimmer Text adapted from @dorianbaffier / Kokonut UI (MIT). */
import { motion, useReducedMotion } from "framer-motion";

interface ShimmerTextProps {
  text: string;
  className?: string;
  tone?: "dark" | "red";
}

export default function ShimmerText({
  text,
  className = "",
  tone = "dark",
}: ShimmerTextProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          tone === "red"
            ? "linear-gradient(to right, #E4002B, #FF8A9F, #E4002B)"
            : "linear-gradient(to right, #0A0A0A, #A3A3A3, #0A0A0A)",
        backgroundSize: "200% 100%",
        backgroundPosition: "200% center",
      }}
      animate={
        reducedMotion
          ? undefined
          : { backgroundPosition: ["200% center", "-200% center"] }
      }
      transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
    >
      {text}
    </motion.span>
  );
}
