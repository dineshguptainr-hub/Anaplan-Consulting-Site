import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink-900 py-24">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-60" />
      <div className="container-max relative grid gap-14 lg:grid-cols-2 lg:items-start">
        <div className="lg:sticky lg:top-28">
          <span className="eyebrow">Get Started</span>
          <h2 className="section-heading mt-4">
            Let&apos;s audit what&apos;s actually breaking your model.
          </h2>
          <p className="mt-5 text-mist-300">
            Book a complimentary, no-pressure Model Audit. In 30 minutes,
            we&apos;ll identify exactly where your current process is
            costing you time — and what a connected, automated version would
            look like for your team.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              "A candid look at your current planning bottlenecks",
              "A clear point of view on Anaplan fit for your organization",
              "No obligation — this is a diagnostic, not a pitch",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-mist-300">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="mt-0.5 shrink-0 text-gold-500"
                >
                  <path
                    d="m4 10.5 4 4 8-9"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
