import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F8FA",
        surface: "#FFFFFF",
        cream: "#F6F1E7",
        ink: {
          900: "#1C2430",
          700: "#4B5666",
          500: "#69748A",
          400: "#9AA3B2",
          200: "#D0D5DD",
          100: "#EEF0F3",
        },
        trust: {
          700: "#1A4780",
          600: "#2563A8",
          500: "#3C79BC",
          100: "#E8EEF6",
        },
        ember: {
          700: "#D9480F",
          600: "#F2622E",
          500: "#E8791B",
          100: "#FDEDE6",
        },
        success: {
          600: "#2F6E50",
          100: "#E6F0EA",
        },
        alert: {
          600: "#B4453A",
          100: "#F5E6E4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Helvetica Neue", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Consolas", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(247,248,250,0) 0%, #F7F8FA 85%), linear-gradient(rgba(28,36,48,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(28,36,48,0.04) 1px, transparent 1px)",
        "hero-glow":
          "radial-gradient(circle at 20% 15%, rgba(37,99,168,0.10), transparent 45%), radial-gradient(circle at 80% 0%, rgba(242,98,46,0.06), transparent 40%)",
        "ledger-grid":
          "linear-gradient(rgba(28,36,48,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(28,36,48,0.05) 1px, transparent 1px)",
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.6) inset, 0 12px 30px -18px rgba(20,30,50,0.18)",
        lift: "0 20px 50px rgba(20,30,50,0.10)",
        glow: "0 0 0 1px rgba(37,99,168,0.25), 0 12px 26px -10px rgba(37,99,168,0.28)",
        hex: "0 10px 26px rgba(0,0,0,0.18)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        float1: "float1 9s ease-in-out infinite",
        float2: "float2 11s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float1: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(14px, -18px)" },
        },
        float2: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-16px, 14px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
