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

export default function Authority() {
  return (
    <section id="about" className="relative overflow-hidden bg-paper py-24">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-trust-600/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-alert-600/[0.05] blur-3xl" />

      <div className="container-max relative grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <span className="eyebrow">The Consultant</span>
          <h2 className="section-heading mt-4">
            Not a coder who learned finance.
            <br />A finance mind who mastered the platform.
          </h2>
          <p className="mt-6 text-ink-500">
            I&apos;m Dinesh Gupta, a certified{" "}
            <span className="text-ink-900">Master Anaplanner</span> — the
            highest credential Anaplan awards, held by a small fraction of
            practitioners worldwide. But the certification isn&apos;t the
            point. The point is what it lets me do for you.
          </p>
          <p className="mt-4 text-ink-500">
            I don&apos;t hand your team a black-box model and disappear. I sit
            across the table as a peer — fluent in EBITDA, driver trees,
            allocation logic, and close calendars — and translate that
            language directly into architecture. Your FP&amp;A director
            doesn&apos;t need a translator between &quot;what finance needs&quot;
            and &quot;what gets built.&quot; That translator is me.
          </p>
          <p className="mt-4 text-ink-500">
            Over 6+ years and 4+ full-lifecycle global implementations,
            I&apos;ve owned everything from the first vendor conversation to
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
                className="rounded-full border border-ink-900/10 bg-surface px-4 py-1.5 text-xs font-medium text-ink-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="card flex items-center gap-6 p-7"
            >
              <div className="font-mono text-4xl font-bold text-trust-600">
                {stat.value}
              </div>
              <div>
                <p className="font-display text-base font-semibold text-ink-900">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-sm text-ink-500">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
