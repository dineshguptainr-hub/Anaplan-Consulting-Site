const CREDENTIALS = [
  "Certified Master Anaplanner",
  "6+ Years Connected Planning",
  "Enterprise Anaplan Team, Master-Anaplanner Led",
];

export default function CredentialStrip() {
  return (
    <section className="border-y border-ink-900/[0.08] bg-surface py-7">
      <div className="container-max flex flex-wrap items-center justify-center gap-x-3.5 gap-y-2 text-center font-mono text-[13px] font-semibold uppercase tracking-wide text-ink-500">
        {CREDENTIALS.map((item, i) => (
          <span key={item} className="flex items-center gap-3.5">
            {i > 0 && <span className="text-ink-200">•</span>}
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
