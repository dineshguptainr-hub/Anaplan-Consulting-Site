"use client";

import { useState } from "react";
import HexAmbience from "./HexAmbience";
import SpreadsheetChaos from "./SpreadsheetChaos";

/**
 * Pointy-top hexagon. Paired with the 94x108 cell size and the ring offsets
 * below this tiles as a true honeycomb: horizontal neighbours sit exactly one
 * width apart, diagonal neighbours at (w/2, h*0.75). Do not change one of
 * these three numbers without the others — that is what broke the previous
 * hero honeycomb, where the cells overlapped the hub.
 */
const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
const HEX_W = 94;
const HEX_H = 108;
const SPOKE = 94;

const RING = [
  { angle: 0, x: 94, y: 0 },
  { angle: 60, x: 47, y: 81 },
  { angle: 120, x: -47, y: 81 },
  { angle: 180, x: -94, y: 0 },
  { angle: 240, x: -47, y: -81 },
  { angle: 300, x: 47, y: -81 },
];

const MODELS = [
  {
    key: "hr",
    label: "HR Model",
    desc: "HR data flows from the Anaplan Data Hub into the HR Model for workforce and headcount planning. Once approved, it feeds straight into the Opex Model — and Opex assumptions flow back to refine HR cost planning.",
  },
  {
    key: "opex",
    label: "Opex Model",
    desc: "Opex data syncs from the Data Hub for departmental spend planning. Approved numbers feed into the Finance Model for consolidation — and finance targets flow back to guide Opex planning.",
  },
  {
    key: "finance",
    label: "Finance Model",
    desc: "Finance data syncs from the Data Hub for consolidation and forecasting. Approved actuals feed into the Revenue Model — and revenue forecasts flow back into the finance plan.",
  },
  {
    key: "revenue",
    label: "Revenue Model",
    desc: "Revenue data syncs from the Data Hub for sales forecasting. Approved forecasts feed into the Workforce Model — and hiring plans flow back to refine revenue assumptions.",
  },
  {
    key: "workforce",
    label: "Workforce Model",
    desc: "Workforce data syncs from the Data Hub for capacity and resource planning. Approved plans feed into the Supply Model — and supply constraints flow back into workforce capacity.",
  },
  {
    key: "supply",
    label: "Supply Model",
    desc: "Supply data syncs from the Data Hub for demand-to-supply balancing. Approved plans feed into the HR Model — and headcount needs flow back to refine supply planning.",
  },
];

/** The transition between the two panels: a flowing pipe, horizontal on
 *  desktop and vertical once the panels stack. */
function Seam() {
  return (
    <>
      <svg
        viewBox="0 0 80 24"
        className="hidden h-6 w-20 self-center lg:block"
        aria-hidden
      >
        <path
          d="M2 12 H62"
          fill="none"
          stroke="#2563A8"
          strokeWidth="2"
          strokeLinecap="round"
          className="flow-line flow-line--moving"
        />
        <path
          d="M62 6 L70 12 L62 18"
          fill="none"
          stroke="#2563A8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <svg
        viewBox="0 0 24 64"
        className="h-16 w-6 self-center lg:hidden"
        aria-hidden
      >
        <path
          d="M12 2 V44"
          fill="none"
          stroke="#2563A8"
          strokeWidth="2"
          strokeLinecap="round"
          className="flow-line flow-line--moving"
        />
        <path
          d="M6 44 L12 52 L18 44"
          fill="none"
          stroke="#2563A8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export default function ConnectedHoneycomb() {
  const [active, setActive] = useState(0);

  return (
    <section id="connected" className="relative overflow-hidden bg-paper py-24">
      <HexAmbience />
      <div className="container-max relative">
        <div className="mx-auto max-w-[640px] text-center">
          <span className="eyebrow justify-center">Connected Planning</span>
          <h2 className="section-heading mt-4">
            One source of truth, every model connected
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500">
            Every planning model reads and writes to a single Anaplan Data Hub —
            one source of truth instead of six versions of it scattered across
            spreadsheets. Click a model to see how it connects.
          </p>
        </div>

        {/* The journey: scattered files on ruled grid paper, flowing into one
            connected model on clean ground. */}
        <div className="mt-14 flex flex-col items-center gap-2 lg:flex-row lg:items-stretch lg:justify-center lg:gap-4">
          {/* BEFORE — spreadsheet sprawl, on spreadsheet ruling */}
          <div className="card-lift w-full max-w-[420px] overflow-hidden rounded-2xl border border-ink-900/[0.08] bg-white shadow-card lg:flex-1">
            <div className="flex items-center justify-between border-b border-ink-900/[0.08] px-5 py-3">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-alert-600">
                Today
              </span>
              <span className="font-mono text-[11px] text-ink-400">.xlsx</span>
            </div>

            <div className="bg-ledger-grid flex h-[300px] items-center justify-center overflow-hidden bg-paper [background-size:28px_28px]">
              <div className="h-[400px] w-[440px] shrink-0 scale-[0.6] sm:scale-[0.68]">
                <SpreadsheetChaos />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 border-t border-ink-900/[0.08] px-5 py-4 text-sm font-medium text-ink-900">
              <span className="h-2 w-2 shrink-0 rounded-full bg-alert-600" />
              Five files, one truth? Pick a version.
            </div>
          </div>

          <Seam />

          {/* AFTER — one connected model, on clean ground */}
          <div className="card-lift w-full max-w-[420px] overflow-hidden rounded-2xl border border-ink-900/[0.08] bg-white shadow-card lg:flex-1">
            <div className="flex items-center justify-between border-b border-ink-900/[0.08] px-5 py-3">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-trust-700">
                With Anaplan
              </span>
              <span className="font-mono text-[11px] text-ink-400">
                Anaplan Workspace
              </span>
            </div>

            <div className="flex h-[300px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,168,0.08),transparent_65%)]">
              <div className="h-[300px] w-[300px] shrink-0 scale-[0.78] sm:scale-90">
                <div className="relative h-[300px] w-[300px]">
                  {RING.map((pos, i) => (
                    <div
                      key={`spoke-${pos.angle}`}
                      aria-hidden
                      className="absolute left-1/2 top-1/2 z-0 h-0.5 origin-[0_50%] transition-colors duration-200"
                      style={{
                        width: SPOKE,
                        transform: `rotate(${pos.angle}deg)`,
                        background:
                          active === i ? "#1A4780" : "rgba(28,36,48,0.16)",
                      }}
                    />
                  ))}

                  {/* Full size so the hub tiles flush against the ring — no
                      gap, no overlap. It stays distinct from the active model
                      by colour alone: navy hub vs mid-blue active hex. */}
                  <div
                    className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-trust-700 p-2 text-center shadow-hex"
                    style={{
                      width: HEX_W,
                      height: HEX_H,
                      clipPath: HEX_CLIP,
                    }}
                  >
                    <span className="font-display text-[12px] font-bold leading-tight text-white">
                      Anaplan
                      <br />
                      Data Hub
                    </span>
                  </div>

                  {MODELS.map((model, i) => {
                    const pos = RING[i];
                    const isActive = active === i;
                    return (
                      <button
                        key={model.key}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-pressed={isActive}
                        className="absolute z-10 flex items-center justify-center p-2 text-center transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trust-700"
                        style={{
                          width: HEX_W,
                          height: HEX_H,
                          clipPath: HEX_CLIP,
                          left: `calc(50% + ${pos.x}px)`,
                          top: `calc(50% + ${pos.y}px)`,
                          transform: `translate(-50%, -50%) scale(${isActive ? 1.1 : 1})`,
                          background: isActive ? "#2563A8" : "#E8791B",
                          boxShadow: isActive
                            ? "0 12px 26px rgba(0,0,0,0.2)"
                            : "0 4px 10px rgba(0,0,0,0.08)",
                        }}
                      >
                        <span className="text-[12.5px] font-bold leading-tight text-white">
                          {model.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 border-t border-ink-900/[0.08] px-5 py-4 text-sm font-medium text-ink-900">
              <span className="h-2 w-2 shrink-0 rounded-full bg-trust-600" />
              Six models, one hub. One version of the truth.
            </div>
          </div>
        </div>

        <div
          className="mx-auto mt-8 max-w-[560px] rounded-xl border border-ink-900/[0.08] bg-surface px-6 py-5 text-center"
          aria-live="polite"
        >
          <div className="font-display text-[15.5px] font-bold text-trust-700">
            {MODELS[active].label}
          </div>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-500">
            {MODELS[active].desc}
          </p>
        </div>
      </div>
    </section>
  );
}
