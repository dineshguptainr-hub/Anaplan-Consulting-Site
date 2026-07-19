const CAPABILITIES = [
  {
    label: "Finance Planning",
    title: "Driver-Based P&L, Cash Flow & Forecasting.",
    detail:
      "Multi-method financial models — revenue, opex, P&L, balance sheet, cash flow — built on live business drivers instead of hardcoded assumptions, so every forecast updates itself when the business changes.",
    icon: (
      <path
        d="M4 19V9m6 10V5m6 14v-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    ),
  },
  {
    label: "Workforce Planning",
    title: "Headcount, Comp & Org Logic. No Spreadsheet Required.",
    detail:
      "Workforce planning models that handle headcount, compensation, attrition, and org changes across every department — with full audit trails, not a single manual spreadsheet update.",
    icon: (
      <path
        d="M8 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 19c.5-2.5 2.7-4 6-4s5.5 1.5 6 4M12 19c.5-2.5 2.7-4 6-4s5.5 1.5 6 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Opex Planning",
    title: "Granular Allocation, Traced to the True Owner.",
    detail:
      "Cost allocation engines that trace every operating dollar to its true owner and cost center, replacing manual chargeback spreadsheets with a governed, auditable allocation model.",
    icon: (
      <path
        d="M4 6h16M4 12h16M4 18h10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    ),
  },
  {
    label: "Capex Planning",
    title: "Asset & Project Spend, Modeled Before You Commit.",
    detail:
      "Capital project and asset models — spend phasing, depreciation schedules, and approval workflows — so leadership sees the full return-on-investment picture before capital is committed.",
    icon: (
      <path
        d="M12 3v3m0 12v3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1M3 12h3m12 0h3M4.2 19.8l2.1-2.1m11.4-11.4 2.1-2.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    ),
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="bg-surface py-24">
      <div className="container-max">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Core Capabilities</span>
          <h2 className="section-heading mt-4">
            One consultant. The full planning lifecycle.
          </h2>
          <p className="mt-4 text-ink-500">
            From choosing the platform to deploying it to your last end user —
            every stage of Connected Planning, handled end-to-end across
            Finance, Workforce, Opex, and Capex.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {CAPABILITIES.map((cap, i) => (
            <div
              key={cap.label}
              className="card group relative overflow-hidden p-8 transition hover:border-trust-600/30"
            >
              <span className="absolute right-6 top-6 font-display text-5xl font-semibold text-ink-900/[0.05]">
                0{i + 1}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-trust-100 text-trust-600">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  {cap.icon}
                </svg>
              </span>

              <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-trust-600">
                {cap.label}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink-900">
                {cap.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                {cap.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
