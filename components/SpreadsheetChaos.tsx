const CHAOS_FILES = [
  { name: "Budget_v1.xlsx", top: 16, left: 24, rotate: -9, bad: [1] },
  { name: "Q4_Forecast_v2_copy.xlsx", top: 58, left: 236, rotate: 6, bad: [0, 6] },
  { name: "Budget_v2_edits.xlsx", top: 172, left: 40, rotate: 5, bad: [1, 7] },
  {
    name: "Budget_FINAL_v3_useThisOne.xlsx",
    top: 208,
    left: 252,
    rotate: -6,
    bad: [2, 8],
  },
  {
    name: "Budget_FINAL_v3(2)_ACTUAL.xlsx",
    top: 332,
    left: 130,
    rotate: 7,
    bad: [3, 4, 10],
  },
];

/**
 * The "five files, one truth" file stack — the Before half of the journey.
 * Renders a bare 440x400 stage; callers scale it inside a fixed-size box
 * rather than reflowing, so the scattered layout keeps its geometry.
 */
export default function SpreadsheetChaos() {
  return (
    <div className="relative h-[400px] w-[440px]">
      {CHAOS_FILES.map((file) => (
        <div
          key={file.name}
          className="absolute w-[160px] rounded border border-ink-900/10 bg-white shadow-md"
          style={{
            top: file.top,
            left: file.left,
            transform: `rotate(${file.rotate}deg)`,
          }}
        >
          <div className="flex items-center gap-1.5 border-b border-ink-900/10 px-2 py-1.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-alert-600" />
            <span className="truncate font-mono text-[8.5px] text-ink-500">
              {file.name}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-px bg-ink-900/10 p-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`h-2.5 ${
                  file.bad.includes(i) ? "bg-alert-600/50" : "bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
