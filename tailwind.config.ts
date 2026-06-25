import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds (light theme)
        black: "#0A0A0A",       // kept for dark sections: footer, CTA, ticker, preloader
        surface: "#F7F7F7",     // alternate section bg (was #111111)
        surface2: "#F0F0F0",    // card hover, elevated (was #1A1A1A)
        bgDark: "#0A0A0A",      // explicit dark bg for dark sections
        // Text
        white: "#FFFFFF",
        gray: "#888888",        // muted text (unchanged)
        // Brand
        red: "#E4002B",
        redDark: "#B8001F",
        // Borders
        border: "#E8E8E8",      // was #222222
        borderMed: "#D0D0D0",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Space Grotesk", "sans-serif"],
        display: ["var(--font-outfit)", "Outfit", "sans-serif"],
        body: ["var(--font-body)", "DM Sans", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "marquee": "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 28s linear infinite",
        "marquee-slow": "marquee 20s linear infinite",
        "scan-line": "scan-line 8s linear infinite",
        "pulse-line": "pulse-line 2s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        "blink": "blink 1s step-end infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "scan-line": {
          "0%": { top: "-2px" },
          "100%": { top: "100%" },
        },
        "pulse-line": {
          "0%, 100%": { opacity: "0.3", transform: "scaleY(0.8)" },
          "50%": { opacity: "1", transform: "scaleY(1)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
      letterSpacing: {
        "widest-custom": "0.12em",
      },
    },
  },
  plugins: [],
};
export default config;
