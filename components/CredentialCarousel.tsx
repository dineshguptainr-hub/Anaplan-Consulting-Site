"use client";

import { useEffect, useRef, useState } from "react";

const ROTATE_MS = 4200;

const SLIDES = [
  {
    stat: "6+",
    title: "Years of Anaplan Experience",
    desc: "Six-plus years designing and building connected planning models — from first workshop to hypercare — across finance and operations teams.",
  },
  {
    stat: "Master",
    title: "Certified Master Anaplanner",
    desc: "Anaplan's highest model-building certification — deep mastery of the platform's modeling engine, formulas, and planning UX.",
  },
  {
    stat: "4+",
    title: "End-to-End Implementations",
    desc: "Full-cycle delivery: discovery, model design, data integration, workflow build, training, and hypercare — not just configuration.",
  },
  {
    stat: "4 Domains",
    title: "Finance · Workforce · Opex · Capex",
    desc: "A team spanning FP&A, demand planning, scenario modeling, and Opex/Capex — so every model reflects real domain expertise, not a generic template.",
  },
];

export default function CredentialCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (paused || reducedRef.current) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="bg-paper px-6 pb-16 sm:px-8">
      <div
        className="relative mx-auto max-w-[760px] overflow-hidden rounded-2xl border border-ink-900/[0.08] bg-surface shadow-lift"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="h-1 bg-gradient-to-r from-trust-600 to-ember-600" />

        <div className="relative h-[230px] sm:h-[196px]" aria-live="polite">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.title}
              aria-hidden={i !== index}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-8 py-9 text-center sm:px-11"
              style={{
                opacity: i === index ? 1 : 0,
                transform: i === index ? "translateX(0)" : "translateX(14px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                pointerEvents: i === index ? "auto" : "none",
              }}
            >
              <div className="font-display text-3xl font-extrabold text-trust-700">
                {slide.stat}
              </div>
              <div className="font-display text-[17px] font-bold text-ink-900">
                {slide.title}
              </div>
              <p className="max-w-[520px] text-[14.5px] leading-relaxed text-ink-500">
                {slide.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 pb-5">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show credential ${i + 1}: ${slide.title}`}
              aria-current={i === index}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? "bg-trust-600" : "bg-ink-200 hover:bg-ink-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
