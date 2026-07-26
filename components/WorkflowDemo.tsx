"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Stage = "idle" | "syncing" | "synced" | "notifying" | "running" | "done";

type Analyst = {
  key: string;
  name: string;
  role: string;
  durationMs: number;
  /** Left offset inside the 760px desktop org chart. */
  left: number;
};

const HEAD = { name: "Laura Bennett", role: "Head of FP&A" };
const MGR_A = { name: "Michael Reed", role: "FP&A Manager" };
const MGR_B = { name: "Arjun Mehta", role: "Opex Manager" };

const ANALYSTS_A: Analyst[] = [
  { key: "a1", name: "James Carter", role: "FP&A Analyst", durationMs: 1300, left: 0 },
  { key: "a2", name: "Emily Hart", role: "HR Analyst", durationMs: 1600, left: 134 },
  { key: "a3", name: "Priya Nair", role: "Opex Analyst", durationMs: 1900, left: 268 },
];
const ANALYSTS_B: Analyst[] = [
  { key: "b1", name: "Daniel Brooks", role: "Finance Analyst", durationMs: 1400, left: 468 },
  { key: "b2", name: "Sophie Turner", role: "Workforce Analyst", durationMs: 1700, left: 602 },
];

const ALL_ANALYSTS = [...ANALYSTS_A, ...ANALYSTS_B];

const NO_SUBMISSIONS: Record<string, boolean> = {
  a1: false,
  a2: false,
  a3: false,
  b1: false,
  b2: false,
};
const ALL_SUBMITTED: Record<string, boolean> = {
  a1: true,
  a2: true,
  a3: true,
  b1: true,
  b2: true,
};

/** Connector segments of the desktop org chart, as [left, top, width, height]. */
const CONNECTORS: [number, number, number, number][] = [
  [394, 70, 2, 30],
  [194, 100, 401, 2],
  [193, 100, 2, 30],
  [594, 100, 2, 30],
  [193, 210, 2, 24],
  [594, 210, 2, 24],
  [60, 234, 268, 2],
  [59, 234, 2, 24],
  [193, 234, 2, 24],
  [327, 234, 2, 24],
  [528, 234, 134, 2],
  [527, 234, 2, 24],
  [661, 234, 2, 24],
];

export default function WorkflowDemo() {
  const [stage, setStage] = useState<Stage>("idle");
  const [notify, setNotify] = useState(false);
  const [running, setRunning] = useState(false);
  const [submitted, setSubmitted] = useState(NO_SUBMISSIONS);
  const [accepted, setAccepted] = useState({ A: false, B: false });
  const [headReviewed, setHeadReviewed] = useState(false);

  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAll = useCallback(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  }, []);

  // Never leave timers running after the section unmounts.
  useEffect(() => clearAll, [clearAll]);

  const runCycle = useCallback(() => {
    clearAll();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // Skip the choreography and show the finished state.
      setNotify(true);
      setRunning(true);
      setSubmitted(ALL_SUBMITTED);
      setAccepted({ A: true, B: true });
      setHeadReviewed(true);
      setStage("done");
      return;
    }

    setStage("syncing");
    setNotify(false);
    setRunning(false);
    setSubmitted(NO_SUBMISSIONS);
    setAccepted({ A: false, B: false });
    setHeadReviewed(false);

    const at = (ms: number, fn: () => void) => {
      timeouts.current.push(setTimeout(fn, ms));
    };

    at(1900, () => setStage("synced"));
    at(2300, () => {
      setStage("notifying");
      setNotify(true);
    });
    at(3200, () => {
      setStage("running");
      setRunning(true);
    });

    ALL_ANALYSTS.forEach((a) => {
      at(3200 + a.durationMs, () =>
        setSubmitted((prev) => ({ ...prev, [a.key]: true })),
      );
    });

    const doneA = 3200 + Math.max(...ANALYSTS_A.map((a) => a.durationMs));
    const doneB = 3200 + Math.max(...ANALYSTS_B.map((a) => a.durationMs));
    at(doneA + 500, () => setAccepted((prev) => ({ ...prev, A: true })));
    at(doneB + 500, () => setAccepted((prev) => ({ ...prev, B: true })));

    const lastGroup = Math.max(doneA, doneB) + 500;
    at(lastGroup + 600, () => setHeadReviewed(true));
    at(lastGroup + 1000, () => setStage("done"));
  }, [clearAll]);

  const busy =
    stage === "syncing" ||
    stage === "synced" ||
    stage === "notifying" ||
    stage === "running";

  const syncStatusText =
    stage === "idle"
      ? "Click Run Forecast Cycle to simulate the sync"
      : stage === "syncing"
        ? "Syncing ERP and GL actuals into the Anaplan Data Hub…"
        : "Data synced — ready for forecast";

  const buttonLabel =
    stage === "idle"
      ? "Run Forecast Cycle"
      : stage === "done"
        ? "Restart Demo"
        : "Running…";

  function analystStatus(a: Analyst) {
    const isSubmitted = submitted[a.key];
    const isRunning = running && !isSubmitted;
    return {
      text: isSubmitted
        ? "✓ Submitted"
        : isRunning
          ? "Submitting…"
          : notify
            ? "Task assigned"
            : "Awaiting sync",
      className: isSubmitted
        ? "text-success-600"
        : isRunning
          ? "text-trust-700"
          : "text-ink-400",
      pct: running ? 100 : 0,
    };
  }

  function mgrStatus(group: "A" | "B") {
    const isAccepted = accepted[group];
    return {
      text: isAccepted
        ? "✓ Accepted"
        : notify
          ? "Reviewing team numbers…"
          : "Awaiting submissions",
      className: isAccepted
        ? "text-success-600"
        : notify
          ? "text-trust-700"
          : "text-ink-400",
    };
  }

  const headStatus = headReviewed
    ? { text: "✓ Reviewed forecast numbers", className: "text-success-600" }
    : notify
      ? { text: "Awaiting manager sign-off", className: "text-trust-700" }
      : { text: "Awaiting forecast cycle", className: "text-ink-400" };

  // Cards dim until the workflow trigger fires, then light up.
  const cardStyle = (i: number) => ({
    background: notify ? "#FFFFFF" : "#F7F8FA",
    opacity: notify ? 1 : 0.45,
    transform: notify ? "translateY(0)" : "translateY(10px)",
    transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms, background 0.3s ease`,
  });

  function AnalystCard({ a, i }: { a: Analyst; i: number }) {
    const s = analystStatus(a);
    return (
      <div
        className="rounded-[10px] border border-ink-900/[0.08] p-2.5 text-center"
        style={cardStyle(i)}
      >
        <div className="text-xs font-bold text-ink-900">{a.name}</div>
        <div className="mb-1.5 text-[10px] text-ink-500">{a.role}</div>
        <div className="mb-1.5 h-[5px] overflow-hidden rounded-[3px] bg-ink-100">
          <div
            className="h-full rounded-[3px] bg-trust-600"
            style={{
              width: `${s.pct}%`,
              transition: `width ${a.durationMs / 1000}s ease`,
            }}
          />
        </div>
        <div className={`text-[10.5px] font-semibold ${s.className}`}>
          {s.text}
        </div>
      </div>
    );
  }

  function ManagerCard({
    mgr,
    group,
    i,
  }: {
    mgr: { name: string; role: string };
    group: "A" | "B";
    i: number;
  }) {
    const s = mgrStatus(group);
    return (
      <div
        className="rounded-[10px] border border-ink-900/[0.08] p-3 text-center"
        style={cardStyle(i)}
      >
        <div className="text-[13px] font-bold text-ink-900">{mgr.name}</div>
        <div className="mb-1.5 text-[10.5px] text-ink-500">{mgr.role}</div>
        <div className={`text-[11px] font-semibold ${s.className}`}>{s.text}</div>
      </div>
    );
  }

  function HeadCard() {
    return (
      <div
        className="rounded-[10px] border border-ink-900/[0.08] p-3 text-center"
        style={cardStyle(0)}
      >
        <div className="text-[13.5px] font-bold text-ink-900">{HEAD.name}</div>
        <div className="mb-1.5 text-[11px] text-ink-500">{HEAD.role}</div>
        <div className={`text-[11.5px] font-semibold ${headStatus.className}`}>
          {headStatus.text}
        </div>
      </div>
    );
  }

  return (
    <section
      id="workflow"
      className="border-y border-ink-900/[0.08] bg-surface py-24"
    >
      <div className="container-max">
        <div className="mx-auto max-w-[640px] text-center">
          <span className="eyebrow justify-center">See It In Action</span>
          <h2 className="section-heading mt-4">
            From ERP/GL Actuals to a completed Forecast
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500">
            Run the demo to see data sync from your ERP and GL into the Anaplan
            Data Hub, then watch the workflow engine assign and track the
            forecast cycle.
          </p>
          <button
            type="button"
            onClick={runCycle}
            disabled={busy}
            className="btn-primary mt-6 disabled:cursor-default disabled:bg-ink-200 disabled:shadow-none"
          >
            {buttonLabel}
          </button>
        </div>

        {/* ── data sync ──
            The diagonal SVG connector only reads correctly when the three
            groups sit on one row, so below md it is swapped for a vertical
            arrow and the groups stack. */}
        <div className="mt-11 flex flex-col items-center gap-5 md:flex-row md:justify-center md:gap-0">
          <div className="flex flex-col gap-4 md:gap-8">
            {["ERP", "GL"].map((label) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-xl bg-ink-100 font-display text-xs font-bold text-ink-500">
                  {label}
                </div>
                <div className="text-[13px] font-semibold text-ink-900">
                  {label === "ERP" ? "ERP System" : "GL Model"}
                </div>
              </div>
            ))}
          </div>

          <svg
            viewBox="0 0 160 120"
            className="hidden h-[120px] w-[160px] shrink-0 md:block"
            aria-hidden
          >
            <path d="M0,29 L88,60" fill="none" stroke="rgba(28,36,48,0.22)" strokeWidth="2" />
            <path d="M0,91 L88,60" fill="none" stroke="rgba(28,36,48,0.22)" strokeWidth="2" />
            <path d="M88,60 L160,60" fill="none" stroke="#2563A8" strokeWidth="3" />
          </svg>

          <svg
            viewBox="0 0 24 44"
            className="h-11 w-6 shrink-0 md:hidden"
            aria-hidden
          >
            <path
              d="M12 0 L12 36 M5 29 L12 37 L19 29"
              fill="none"
              stroke="#2563A8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-ember-600 p-2 text-center font-display text-[13px] font-bold text-white">
            Anaplan Data Hub
          </div>
        </div>

        <div className="mt-4 text-center">
          <span className="inline-block rounded-full bg-ink-100 px-4 py-1.5 text-[12.5px] font-semibold text-ink-500">
            Automated via Anaplan Connect · CloudWorks · ADO integration
          </span>
        </div>

        <div className="mx-auto mt-5 max-w-[420px]">
          <div
            className="h-2 overflow-hidden rounded"
            role="progressbar"
            aria-label="ERP and GL sync progress"
            aria-valuenow={stage === "idle" ? 0 : 100}
          >
            <div className="h-full rounded bg-ink-100">
              <div
                className="h-full rounded bg-trust-600"
                style={{
                  width: stage === "idle" ? "0%" : "100%",
                  transition: "width 1.8s ease",
                }}
              />
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-[13.5px] text-ink-500" aria-live="polite">
          {syncStatusText}
        </p>

        {/* ── workflow ── */}
        <div className="mt-8 min-h-[44px] text-center">
          {(stage === "notifying" || stage === "running" || stage === "done") && (
            <span className="status-pill bg-trust-100 text-trust-700">
              Anaplan Workflow triggered — forecast tasks emailed to planners
            </span>
          )}
        </div>

        <p className="mt-4 text-center text-[13px] text-ink-500">
          Analysts submit numbers → Managers accept → Head reviews the forecast
        </p>

        {/* desktop org chart — exact geometry, shown where 760px fits */}
        <div className="mt-5 hidden justify-center lg:flex">
          <div className="relative h-[400px] w-[760px]">
            {CONNECTORS.map(([left, top, width, height]) => (
              <div
                key={`${left}-${top}-${width}-${height}`}
                aria-hidden
                className="absolute bg-ink-900/[0.18]"
                style={{ left, top, width, height }}
              />
            ))}

            <div className="absolute left-[310px] top-0 w-[170px]">
              <HeadCard />
            </div>
            <div className="absolute left-[109px] top-[130px] w-[170px]">
              <ManagerCard mgr={MGR_A} group="A" i={0} />
            </div>
            <div className="absolute left-[510px] top-[130px] w-[170px]">
              <ManagerCard mgr={MGR_B} group="B" i={1} />
            </div>

            {ANALYSTS_A.map((a, i) => (
              <div
                key={a.key}
                className="absolute top-[258px] w-[120px]"
                style={{ left: a.left }}
              >
                <AnalystCard a={a} i={i} />
              </div>
            ))}
            {ANALYSTS_B.map((a, i) => (
              <div
                key={a.key}
                className="absolute top-[258px] w-[120px]"
                style={{ left: a.left }}
              >
                <AnalystCard a={a} i={i + 3} />
              </div>
            ))}
          </div>
        </div>

        {/* stacked timeline — same state, reflowed for narrow viewports */}
        <div className="mx-auto mt-5 max-w-md space-y-5 lg:hidden">
          <HeadCard />

          {(
            [
              { mgr: MGR_A, group: "A" as const, team: ANALYSTS_A, offset: 0 },
              { mgr: MGR_B, group: "B" as const, team: ANALYSTS_B, offset: 3 },
            ]
          ).map(({ mgr, group, team, offset }, gi) => (
            <div
              key={group}
              className="border-l-2 border-ink-900/[0.18] pl-4"
            >
              <ManagerCard mgr={mgr} group={group} i={gi} />
              <div className="mt-3 space-y-3 border-l-2 border-ink-900/[0.12] pl-4">
                {team.map((a, i) => (
                  <AnalystCard key={a.key} a={a} i={i + offset} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 min-h-[48px] text-center">
          {stage === "done" && (
            <span className="status-pill bg-success-100 text-success-600">
              Forecast Cycle Complete — all tasks submitted
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
