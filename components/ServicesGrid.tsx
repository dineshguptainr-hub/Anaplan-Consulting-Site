import HexAmbience from "./HexAmbience";
import Reveal from "./Reveal";

const SERVICES = [
  {
    title: "Connected Planning Model Design",
    desc: "HR, Opex, and Finance models that share one live data foundation — no more disconnected spreadsheets.",
    icon: (
      <path
        d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Zm0 0v18m8-13.5L4 16.5m0-9 16 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "ERP & GL Data Integration",
    desc: "Automated data pipelines from your ERP and GL systems into the Anaplan Data Hub via Anaplan Connect and Azure DevOps pipelines.",
    icon: (
      <path
        d="M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Forecast Workflow Automation",
    desc: "Anaplan workflow-driven forecast cycles that assign, remind, and track tasks for every planner.",
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
    title: "Model Build & Configuration",
    desc: "Hands-on Anaplan build: modules, lists, actions, and dashboards engineered for adoption.",
    icon: (
      <path
        d="M4 5h16M4 5v14h16V5M9 5v14m5-9h4m-4 4h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Managed Anaplan Support",
    desc: "Ongoing administration, enhancements, and health checks to keep your model running smoothly.",
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
    title: "Training & Enablement",
    desc: "Hands-on workshops so your planners and admins own the model long-term.",
    icon: (
      <path
        d="M12 4 2 9l10 5 10-5-10-5Zm-6 7.5V17c0 1.1 2.7 2.5 6 2.5s6-1.4 6-2.5v-5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="relative overflow-hidden bg-paper py-24">
      <HexAmbience />
      <div className="container-max relative">
        <div className="mx-auto max-w-[600px] text-center">
          <span className="eyebrow justify-center">What We Do</span>
          <h2 className="section-heading mt-4">End-to-End Anaplan delivery</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500">
            Strategy, model build, and ongoing support — led by a Certified
            Master Anaplanner.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 80}>
              <div className="group h-full">
                <div className="card card-lift flex h-full flex-col gap-3.5 p-7">
                  <span className="hex-tile hex-tile--hover flex h-11 w-11 items-center justify-center bg-trust-100 text-trust-600">
                    <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                      {service.icon}
                    </svg>
                  </span>
                  <h3 className="font-display text-[17px] font-bold text-ink-900">
                    {service.title}
                  </h3>
                  <p className="text-[14.5px] leading-relaxed text-ink-500">
                    {service.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
