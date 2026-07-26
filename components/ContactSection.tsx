import ContactForm from "./ContactForm";

const LEDGER = [
  {
    label: "Response",
    value: "Within 1 business day",
    note: "Direct reply, no sales sequence.",
  },
  {
    label: "First Step",
    value: "30-min Model Audit",
    note: "A live look at what's breaking today.",
  },
  {
    label: "Domains",
    value: "Finance · Workforce · Opex · Capex",
    note: "Connected planning across all four.",
  },
  {
    label: "Engagement",
    value: "Senior, hands-on delivery",
    note: "Master-Anaplanner led, start to finish.",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-paper py-24">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-60" />

      <div className="container-max relative">
        <div className="mx-auto max-w-[600px] text-center">
          <span className="eyebrow justify-center">Get In Touch</span>
          <h2 className="section-heading mt-4">
            Ready to modernize your planning?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500">
            Tell me where your current process breaks down — I&apos;ll come back
            with a plan, not a pitch deck.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1120px] overflow-hidden rounded-2xl shadow-lift lg:grid-cols-[1fr_1.15fr]">
          <div className="ledger-panel flex flex-col justify-center gap-7 px-9 py-12 sm:px-11">
            {LEDGER.map((item, i) => (
              <div key={item.label}>
                {i > 0 && <div className="mb-7 h-px bg-ink-900/10" />}
                <div className="font-mono text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#8A8370]">
                  {item.label}
                </div>
                <div className="mt-1.5 font-display text-[19px] font-bold text-ink-900">
                  {item.value}
                </div>
                <div className="mt-1 text-sm text-[#6B6656]">{item.note}</div>
              </div>
            ))}
          </div>

          <div className="bg-surface p-9 sm:p-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
