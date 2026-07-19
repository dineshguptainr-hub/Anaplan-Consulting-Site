import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05070C",
          900: "#0A0E17",
          850: "#0F1523",
          800: "#141B2C",
          700: "#1C2438",
          600: "#2A3350",
        },
        mist: {
          400: "#8A93A6",
          300: "#A7AFC0",
          200: "#C7CDDA",
          100: "#E7EAF1",
        },
        gold: {
          400: "#F2C879",
          500: "#EFB84E",
          600: "#D89B2E",
        },
        signal: {
          teal: "#4FD1C5",
          blue: "#5B8DEF",
          red: "#F0665C",
          green: "#3FC488",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(10,14,23,0) 0%, #0A0E17 85%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        "hero-glow":
          "radial-gradient(circle at 20% 20%, rgba(91,141,239,0.18), transparent 45%), radial-gradient(circle at 80% 0%, rgba(79,209,197,0.14), transparent 40%)",
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(239,184,78,0.25), 0 12px 30px -8px rgba(239,184,78,0.35)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
