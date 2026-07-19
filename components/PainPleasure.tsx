const BEFORE_ITEMS = [
  {
    title: "Fragile VLOOKUPs & Broken Formulas",
    detail:
      "One dragged cell and the whole model silently breaks. Nobody notices until the board deck is wrong.",
  },
  {
    title: "Manual Email Data Collection",
    detail:
      "Chasing 20 department heads for their tab, then hand-stitching versions together at midnight before close.",
  },
  {
    title: "Zero Version Control",
    detail:
      "'Budget_FINAL_v3_useThisOne.xlsx' is not a system of record. Nobody can trust which number is real.",
  },
  {
    title: "No Forecasting Agility",
    detail:
      "A single what-if scenario takes two days to rebuild. By the time it's ready, the business has moved on.",
  },
  {
    title: "Delayed, Painful Close",
    detail:
      "Finance spends the entire close cycle collecting and reconciling data instead of explaining the numbers.",
  },
];

const AFTER_ITEMS = [
  {
    title: "Fully Automated Actuals",
    detail:
      "Data Load Automation pulls actuals directly from your GL/ERP on schedule — no manual imports, no stale numbers.",
  },
  {
    title: "Structured Workflow Delegation",
    detail:
      "Managers get tasked, reminded, and locked out automatically. Forecasts close on time, every cycle, without you chasing anyone.",
  },
  {
    title: "One Governed Source of Truth",
    detail:
      "Every contributor works inside a single connected model with full audit trails and version history built in.",
  },
  {
    title: "Real-Time Variance Analysis",
    detail:
      "Run driver-based what-ifs in minutes, not days. Answer 'what if' the moment leadership asks it.",
  },
  {
    title: "Bulletproof Scalability",
    detail:
      "Add a business unit, a currency, or a new cost center without rebuilding the model from scratch.",
  },
];

export default function PainPleasure() {
  return (
    <section id="transformation" className="bg-paper py-24">
      <div className="container-max">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">The Transformation</span>
          <h2 className="section-heading mt-4">
            You know the pain. Here&apos;s the graduation.
          </h2>
          <p className="mt-4 text-ink-500">
            Every finance leader living in spreadsheets recognizes this list.
            Here&apos;s exactly what changes when your planning moves onto a
            single connected model.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* BEFORE */}
          <div className="card relative overflow-hidden p-8">
            <div className="absolute inset-x-0 top-0 h-1 bg-alert-600/70" />
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-alert-100 text-alert-600">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 6v5m0 3h.01M8.6 2.9 1.7 15a2 2 0 0 0 1.7 3h13.2a2 2 0 0 0 1.7-3L11.4 2.9a2 2 0 0 0-3.4 0Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-alert-600">
                  Before
                </p>
                <p className="font-display text-lg font-semibold text-ink-900">
                  Spreadsheet Hell
                </p>
              </div>
            </div>

            <ul className="mt-7 space-y-5">
              {BEFORE_ITEMS.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="mt-0.5 shrink-0 text-alert-600"
                  >
                    <path
                      d="m6 6 8 8m0-8-8 8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-ink-900">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-500">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* AFTER */}
          <div className="card relative overflow-hidden p-8 ring-1 ring-trust-600/20">
            <div className="absolute inset-x-0 top-0 h-1 bg-trust-600/80" />
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-trust-100 text-trust-600">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 2 3 6v5c0 4 3 6.5 7 7 4-.5 7-3 7-7V6l-7-4Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-trust-600">
                  After
                </p>
                <p className="font-display text-lg font-semibold text-ink-900">
                  Connected Planning
                </p>
              </div>
            </div>

            <ul className="mt-7 space-y-5">
              {AFTER_ITEMS.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="mt-0.5 shrink-0 text-trust-600"
                  >
                    <path
                      d="m4 10.5 4 4 8-9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-ink-900">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-500">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
