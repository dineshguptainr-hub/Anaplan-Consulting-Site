import Link from "next/link";
import HexAmbience from "./HexAmbience";

const PROMISES = [
  { label: "Response", value: "Within 1 business day" },
  { label: "First Step", value: "30-min Model Audit" },
  { label: "Engagement", value: "Senior, hands-on delivery" },
];

export default function CtaBand() {
  return (
    <section className="bg-paper pb-24 pt-4">
      <div className="container-max">
        <div className="relative overflow-hidden rounded-2xl bg-trust-700 px-8 py-12 text-center shadow-lift sm:px-12">
          <HexAmbience variant="dark" />
          <div className="relative">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-[34px]">
            Ready to modernize your planning?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16.5px] leading-relaxed text-white/75">
            Tell me where your current process breaks down — I&apos;ll come back
            with a plan, not a pitch deck.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-trust-700 transition hover:bg-trust-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
          >
            Book a Consultation
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.5 8h9m0 0L8.5 4m4 4L8.5 12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <div className="mt-10 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-3">
            {PROMISES.map((item) => (
              <div key={item.label}>
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                  {item.label}
                </div>
                <div className="mt-1.5 font-display text-[17px] font-bold text-white">
                  {item.value}
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
