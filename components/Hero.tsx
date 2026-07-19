export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink-900 pb-24 pt-20 sm:pt-28"
    >
      {/* background layers */}
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]" />

      <div className="container-max relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up eyebrow justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            For CFOs &amp; FP&amp;A Leaders Trapped in Spreadsheet Hell
          </div>

          <h1 className="animate-fade-up mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl [animation-delay:80ms]">
            Escape Spreadsheet Hell.
            <br />
            Graduate to{" "}
            <span className="bg-gradient-to-r from-gold-400 to-signal-teal bg-clip-text text-transparent">
              Connected Planning.
            </span>
          </h1>

          <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-mist-300 [animation-delay:160ms]">
            Stop wasting weeks manually consolidating broken Excel sheets.
            Let a certified Master Anaplanner transform your Finance, HR, and
            Cost Planning into a unified, automated forecasting powerhouse.
          </p>

          <div className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row [animation-delay:240ms]">
            <a href="#contact" className="btn-primary w-full sm:w-auto">
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
            </a>
            <a href="#transformation" className="btn-secondary w-full sm:w-auto">
              See the Before / After
            </a>
          </div>

          <p className="animate-fade-up mt-5 text-xs uppercase tracking-[0.14em] text-mist-400 [animation-delay:280ms]">
            No sales deck. Just a 30-minute look at what&apos;s breaking your model.
          </p>
        </div>

        {/* Trust / credibility strip */}
        <div className="animate-fade-up mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4 [animation-delay:320ms]">
          {[
            { stat: "6+ Yrs", label: "Anaplan Architecture" },
            { stat: "Master", label: "Anaplanner Certified" },
            { stat: "4+", label: "End-to-End Global Rollouts" },
            { stat: "3 Domains", label: "Finance · HR · Cost" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-ink-900 px-4 py-6 text-center sm:px-6"
            >
              <div className="font-display text-2xl font-semibold text-white">
                {item.stat}
              </div>
              <div className="mt-1 text-xs text-mist-400">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
