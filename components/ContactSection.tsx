import ContactForm from "./ContactForm";
import HexAmbience from "./HexAmbience";

const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

/**
 * The four promises, rendered as connected nodes rather than a list — the
 * page argues Connected Planning instead of only claiming it.
 */
const PROMISES = [
  {
    label: "Response",
    value: "Within 1 business day",
    note: "Direct reply, no sales sequence.",
    icon: (
      <path
        d="M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "First step",
    value: "30-min Model Audit",
    note: "A live look at what's breaking today.",
    icon: (
      <path
        d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.5-4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Domains",
    value: "Finance · Workforce · Opex · Capex",
    note: "Connected planning across all four.",
    icon: (
      <path
        d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Zm0 0v18m8-13.5L4 16.5m0-9 16 9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Engagement",
    value: "Senior, hands-on delivery",
    note: "Master-Anaplanner led, start to finish.",
    icon: (
      <path
        d="M12 3 4 6v6c0 4.4 3.4 8.3 8 9 4.6-.7 8-4.6 8-9V6l-8-3Zm-2.5 8.5 2 2 4-4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-paper py-20 sm:py-24">
      <HexAmbience />

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

        <div className="mx-auto mt-12 grid max-w-[1120px] overflow-hidden rounded-2xl shadow-lift lg:grid-cols-[0.85fr_1.15fr]">
          {/* ── The connected chain ── */}
          <div className="relative overflow-hidden bg-trust-700 px-7 py-10 sm:px-9 sm:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 h-52 w-44 bg-white/[0.04]"
              style={{ clipPath: HEX_CLIP }}
            />

            <p className="relative font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
              What happens next
            </p>

            <ul className="relative mt-8 space-y-0">
              {PROMISES.map((item, i) => (
                <li key={item.label} className="group relative flex gap-4 pb-8 last:pb-0">
                  {/* spine segment, drawn between this node and the next */}
                  {i < PROMISES.length - 1 && (
                    <span
                      aria-hidden
                      className="flow-spine absolute left-[21px] top-11 h-[calc(100%-2.75rem)] w-0.5"
                    />
                  )}

                  <span className="hex-tile hex-tile--hover relative z-10 flex h-11 w-11 shrink-0 items-center justify-center bg-white/10 text-white/80">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                      {item.icon}
                    </svg>
                  </span>

                  <div className="pt-0.5">
                    <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45 transition-colors duration-300 group-hover:text-ember-600">
                      {item.label}
                    </div>
                    <div className="mt-1 font-display text-[17px] font-bold leading-snug text-white">
                      {item.value}
                    </div>
                    <div className="mt-1 text-sm leading-relaxed text-white/55">
                      {item.note}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── The form ── */}
          <div className="bg-surface px-6 py-10 sm:px-10 sm:py-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
