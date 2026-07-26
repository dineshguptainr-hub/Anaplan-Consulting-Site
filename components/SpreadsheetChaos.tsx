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
 * The "five files, one truth" visual that opens the Before / After section.
 * The stack is absolutely positioned inside a fixed-height stage, so the
 * stage is scaled down rather than reflowed on small screens.
 */
export default function SpreadsheetChaos() {
  return (
    <div className="card overflow-hidden">
      <div className="flex h-[300px] justify-center overflow-hidden sm:h-[480px]">
        <div className="relative w-[440px] origin-top scale-[0.62] sm:scale-100">
          {CHAOS_FILES.map((file) => (
            <div
              key={file.name}
              className="absolute w-[160px] rounded border border-ink-900/10 bg-paper shadow-md"
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
                      file.bad.includes(i) ? "bg-alert-600/50" : "bg-paper"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 border-t border-ink-900/10 bg-surface px-5 py-4 text-sm font-medium text-ink-900">
        <span className="h-2 w-2 shrink-0 rounded-full bg-alert-600" />
        Five files, one truth? Pick a version.
      </div>
    </div>
  );
}
