const CAPABILITIES = [
  {
    label: "Strategic Selection",
    title: "The Right Suite. The Right License Mix.",
    detail:
      "Before a single model gets built, I guide CFOs through vendor and suite selection — mapping your actual planning complexity to the right Anaplan tier and license structure, so you never overbuy or outgrow your platform in year one.",
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
    label: "Financial Modeling & Analytics",
    title: "Dynamic, Driver-Based Forecasting.",
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
    label: "Cost & HR Planning",
    title: "Granular Allocation. Real Workforce Logic.",
    detail:
      "Cost allocation engines that trace every dollar to its true owner, plus workforce planning models that handle headcount, comp, attrition, and org changes without a single manual spreadsheet update.",
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
    label: "Workflow Automation",
    title: "Forecasts Submitted On Time. Automatically.",
    detail:
      "End-to-end workflow delegation — tasked reminders, submission tracking, and hard locks before close — so managers submit on schedule and your team spends its time analyzing numbers, not chasing spreadsheets.",
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
            Finance, HR, and Cost.
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
