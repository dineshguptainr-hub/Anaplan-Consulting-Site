const STATS = [
  {
    value: "6+",
    label: "Years",
    sub: "Core Anaplan architecture experience",
  },
  {
    value: "Master",
    label: "Anaplanner",
    sub: "The highest certification tier in the ecosystem",
  },
  {
    value: "4+",
    label: "Implementations",
    sub: "End-to-end, enterprise-grade global rollouts",
  },
];

const PILLARS = [
  {
    title: "Certified Master Anaplanner",
    detail:
      "Anaplan's highest model-building certification, backed by real delivery experience — not a badge earned in a sandbox.",
    icon: (
      <path
        d="M12 3 4 6v6c0 4.4 3.4 8.3 8 9 4.6-.7 8-4.6 8-9V6l-8-3Zm-2.5 8.5 2 2 4-4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Automation-first approach",
    detail:
      "Every model is wired to your ERP and workflow engine from day one, so the forecast cycle runs itself instead of running your team.",
    icon: (
      <path
        d="M12 7v5l3 2m6-2a9 9 0 1 1-2.6-6.4M21 3v5h-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Enterprise team, master-led",
    detail:
      "A team of experienced practitioners with real enterprise delivery behind them, with me leading the architecture as Master Anaplanner.",
    icon: (
      <path
        d="M8 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 19c.5-2.5 2.7-4 6-4m4 4c.5-2.5 2.7-4 6-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function Authority() {
  return (
    // Paper, not white: WorkflowDemo above is white, and two adjacent white
    // sections flatten the page's alternating rhythm.
    <section id="about" className="relative overflow-hidden bg-paper py-24">
      <div className="container-max relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="eyebrow">Who We Are</span>
            <h2 className="section-heading mt-3 leading-[1.15]">
              A Master Anaplanner who&apos;s sat in your seat
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-500">
              I&apos;m Dinesh Gupta, founder of EPM Journey and a certified{" "}
              <span className="font-semibold text-ink-900">
                Master Anaplanner
              </span>{" "}
              — the highest credential Anaplan awards, held by a small fraction
              of practitioners worldwide. I lead a team of enterprise Anaplan
              practitioners designing connected planning across Finance,
              Workforce, Opex, and Capex.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              We don&apos;t hand your team a black-box model and disappear. I
              stay hands-on from the first workshop through hypercare — fluent
              in EBITDA, driver trees, allocation logic, and close calendars —
              and translate that language directly into architecture. Your FP&amp;A
              director doesn&apos;t need a translator between &quot;what finance
              needs&quot; and &quot;what gets built.&quot;
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Over 6+ years and 4+ full-lifecycle global implementations,
              we&apos;ve owned everything from the first vendor conversation to
              the last end-user login — strategic suite selection, model
              blueprinting, automated data loads, workflow governance, and
              deployment.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Peer-to-Peer Partnership",
                "Full Lifecycle Ownership",
                "Global Enterprise Scale",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink-900/10 bg-surface px-4 py-1.5 text-xs font-semibold text-ink-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-trust-600 text-white">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                    {pillar.icon}
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-[16.5px] font-bold text-ink-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-ink-500">
                    {pillar.detail}
                  </p>
                </div>
              </div>
            ))}

            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-ink-900/[0.08] bg-surface p-5"
                >
                  <div className="font-mono text-2xl font-bold text-trust-600">
                    {stat.value}
                  </div>
                  <p className="mt-1 font-display text-sm font-bold text-ink-900">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-500">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
