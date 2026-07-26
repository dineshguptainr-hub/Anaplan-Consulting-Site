import Link from "next/link";
import HexAmbience from "./HexAmbience";

const STATS = [
  { stat: "6+ Yrs", label: "Anaplan Architecture" },
  { stat: "Master", label: "Anaplanner Certified" },
  { stat: "4+", label: "End-to-End Global Rollouts" },
  { stat: "4 Domains", label: "Finance · Workforce · Opex · Capex" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-paper bg-hero-glow pb-20 pt-20 sm:pt-28"
    >
      <HexAmbience />

      <div className="container-max relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-up eyebrow justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-trust-600" />
            Certified Master Anaplanner · Connected Planning Specialists
          </div>

          {/* No text-balance here: it splits "Connected Planning." across two
              lines, which breaks the underline into two stray rules. The line
              breaks are set explicitly instead. */}
          <h1 className="animate-fade-up mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink-900 sm:text-6xl [animation-delay:80ms]">
            Escape Spreadsheet Hell.
            <br />
            Graduate to{" "}
            <span className="whitespace-nowrap border-b-[3px] border-trust-600 pb-0.5">
              Connected Planning.
            </span>
          </h1>

          <p className="animate-fade-up mx-auto mt-8 max-w-2xl text-balance text-lg leading-relaxed text-ink-500 [animation-delay:160ms]">
            Stop wasting weeks manually consolidating broken Excel sheets. A
            Certified Master Anaplanner and a team of enterprise practitioners
            turn your Finance, Workforce, Opex, and Capex planning into one
            unified, automated forecasting engine.
          </p>

          <div className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row [animation-delay:240ms]">
            <Link href="/contact" className="btn-primary w-full sm:w-auto">
              Book a Complimentary Model Audit
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M3.5 8h9m0 0L8.5 4m4 4L8.5 12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link href="#connected" className="btn-secondary w-full sm:w-auto">
              See How It Works
            </Link>
          </div>

          <p className="animate-fade-up mt-5 text-xs uppercase tracking-[0.14em] text-ink-400 [animation-delay:280ms]">
            No sales deck. Just a 30-minute look at what&apos;s breaking your model.
          </p>
        </div>

        {/* ledger stat line */}
        <div className="animate-fade-up mx-auto mt-16 grid max-w-4xl grid-cols-2 divide-x divide-ink-900/10 border-y border-ink-900/10 sm:grid-cols-4 [animation-delay:320ms]">
          {STATS.map((item) => (
            <div key={item.label} className="px-4 py-5 text-center sm:px-6">
              <div className="font-mono text-2xl font-semibold text-ink-900">
                {item.stat}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-500">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
