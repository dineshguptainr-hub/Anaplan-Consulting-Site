import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F6F7F9",
        surface: "#FFFFFF",
        ink: {
          900: "#17263B",
          700: "#2C3E54",
          500: "#5C6B7A",
          200: "#D7DCE2",
          100: "#EDEFF2",
        },
        trust: {
          600: "#1D4E89",
          500: "#2A5C9A",
          400: "#5B9BD9",
          100: "#E8EEF6",
        },
        alert: {
          600: "#B4453A",
          100: "#F5E6E4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Consolas", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(246,247,249,0) 0%, #F6F7F9 85%), linear-gradient(rgba(23,38,59,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,38,59,0.04) 1px, transparent 1px)",
        "hero-glow":
          "radial-gradient(circle at 20% 15%, rgba(29,78,137,0.08), transparent 45%), radial-gradient(circle at 80% 0%, rgba(180,69,58,0.05), transparent 40%)",
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.6) inset, 0 12px 30px -18px rgba(23,38,59,0.18)",
        glow: "0 0 0 1px rgba(29,78,137,0.25), 0 12px 26px -10px rgba(29,78,137,0.28)",
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
