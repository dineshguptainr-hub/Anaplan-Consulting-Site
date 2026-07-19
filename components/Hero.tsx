import Link from "next/link";

const STATS = [
  { stat: "6+ Yrs", label: "Anaplan Architecture" },
  { stat: "Master", label: "Anaplanner Certified" },
  { stat: "4+", label: "End-to-End Global Rollouts" },
  { stat: "3 Domains", label: "Finance · HR · Cost" },
];

const HEX_CLIP = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

const CAPABILITY_NODES = [
  { label: "Strategy & Selection", dx: 0, dy: -101 },
  { label: "Financial Modeling", dx: 88, dy: -50.5 },
  { label: "Cost & HR Planning", dx: 88, dy: 50.5 },
  { label: "Workflow Automation", dx: 0, dy: 101 },
];

const FAINT_NODES = [
  { dx: -88, dy: 50.5 },
  { dx: -88, dy: -50.5 },
];

const CHAOS_FILES = [
  { name: "Budget_v1.xlsx", top: 16, left: 24, rotate: -9, bad: [1] },
  { name: "Q4_Forecast_v2_copy.xlsx", top: 58, left: 236, rotate: 6, bad: [0, 6] },
  { name: "Budget_v2_edits.xlsx", top: 172, left: 40, rotate: 5, bad: [1, 7] },
  {
    name: "Budget_FINAL_v3_useThisOne.xlsx",
    top: 208,
    left: 252,
    rotate: -6,
    bad: [2, 8],
  },
  {
    name: "Budget_FINAL_v3(2)_ACTUAL.xlsx",
    top: 332,
    left: 130,
    rotate: 7,
    bad: [3, 4, 10],
  },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-paper bg-hero-glow pb-24 pt-20 sm:pt-28"
    >
      <div className="container-max relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up eyebrow justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-trust-600" />
            For CFOs &amp; FP&amp;A Leaders Trapped in Spreadsheet Hell
          </div>

          <h1 className="animate-fade-up mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink-900 sm:text-6xl [animation-delay:80ms]">
            Escape Spreadsheet Hell.
            <br />
            Graduate to{" "}
            <span className="border-b-[3px] border-trust-600 pb-0.5">
              Connected Planning.
            </span>
          </h1>

          <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-ink-500 [animation-delay:160ms]">
            Stop wasting weeks manually consolidating broken Excel sheets.
            Let a certified Master Anaplanner transform your Finance, HR, and
            Cost Planning into a unified, automated forecasting powerhouse.
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
            <Link href="/services" className="btn-secondary w-full sm:w-auto">
              See the Before / After
            </Link>
          </div>

          <p className="animate-fade-up mt-5 text-xs uppercase tracking-[0.14em] text-ink-500 [animation-delay:280ms]">
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

        {/* hero visual: spreadsheet chaos vs. capability honeycomb */}
        <div className="animate-fade-up mx-auto mt-16 max-w-5xl overflow-hidden rounded-xl border border-ink-900/10 bg-surface shadow-card [animation-delay:360ms]">
          <div className="grid sm:grid-cols-2">
            <div className="relative h-[480px] overflow-hidden border-b border-ink-900/10 sm:border-b-0 sm:border-r">
              {CHAOS_FILES.map((file) => (
                <div
                  key={file.name}
                  className="absolute w-[160px] rounded border border-ink-900/10 bg-paper shadow-md"
                  style={{
                    top: file.top,
                    left: file.left,
                    transform: `rotate(${file.rotate}deg)`,
                  }}
                >
                  <div className="flex items-center gap-1.5 border-b border-ink-900/10 px-2 py-1.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-alert-600" />
                    <span className="truncate font-mono text-[8.5px] text-ink-500">
                      {file.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-px bg-ink-900/10 p-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-2.5 ${
                          file.bad.includes(i) ? "bg-alert-600/50" : "bg-paper"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative flex h-[480px] items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 300 300"
                className="pointer-events-none absolute h-[390px] w-[390px]"
              >
                {CAPABILITY_NODES.map((n) => (
                  <line
                    key={n.label}
                    x1="150"
                    y1="150"
                    x2={150 + n.dx}
                    y2={150 + n.dy}
                    stroke="#1D4E89"
                    strokeWidth="1.5"
                    opacity="0.5"
                  />
                ))}
                {FAINT_NODES.map((n, i) => (
                  <line
                    key={i}
                    x1="150"
                    y1="150"
                    x2={150 + n.dx}
                    y2={150 + n.dy}
                    stroke="#D7DCE2"
                    strokeWidth="1.5"
                    opacity="0.6"
                  />
                ))}
              </svg>

              <div className="absolute left-1/2 top-1/2 h-[127px] w-[164px] -translate-x-1/2 -translate-y-1/2">
                <div
                  className="absolute inset-0 bg-ink-900 shadow-lg"
                  style={{ clipPath: HEX_CLIP }}
                />
                <div className="relative flex h-full w-full items-center justify-center px-2 text-center">
                  <span className="font-mono text-[13px] font-semibold leading-tight text-white">
                    Connected Model
                    <span className="mt-1.5 block text-[9px] font-normal uppercase tracking-normal text-white/70">
                      One Source of Truth
                    </span>
                  </span>
                </div>
              </div>

              {CAPABILITY_NODES.map((n) => (
                <div
                  key={n.label}
                  className="absolute left-1/2 top-1/2 h-[104px] w-[132px]"
                  style={{
                    transform: `translate(calc(-50% + ${n.dx}px), calc(-50% + ${n.dy}px))`,
                  }}
                >
                  <div
                    className="absolute inset-0 bg-trust-600 shadow-md"
                    style={{ clipPath: HEX_CLIP }}
                  />
                  <div className="relative flex h-full w-full items-center justify-center px-2 text-center">
                    <span className="font-mono text-xs font-semibold leading-tight text-white">
                      {n.label}
                    </span>
                  </div>
                </div>
              ))}

              {FAINT_NODES.map((n, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 h-[104px] w-[132px] bg-ink-100 opacity-60"
                  style={{
                    clipPath: HEX_CLIP,
                    transform: `translate(calc(-50% + ${n.dx}px), calc(-50% + ${n.dy}px))`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-ink-900/10 bg-surface px-5 py-4 text-sm font-medium sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-2 text-ink-900">
              <span className="h-2 w-2 shrink-0 rounded-full bg-alert-600" />
              Five files, one truth? Pick a version.
            </span>
            <span className="flex items-center gap-2 text-ink-900">
              <span className="h-2 w-2 shrink-0 rounded-full bg-trust-600" />
              Four capabilities, one honeycomb.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
