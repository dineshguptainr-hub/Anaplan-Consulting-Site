const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

type LogoProps = {
  /** Renders the "EPM Journey" wordmark beside the hex mark. */
  withWordmark?: boolean;
  /** Adds the "Master Anaplanner" qualifier after the wordmark. */
  withQualifier?: boolean;
  size?: "sm" | "md";
};

/**
 * The EPM Journey mark: a hexagon echoing the Connected Planning honeycomb,
 * with the "EJ" monogram inside.
 */
export default function Logo({
  withWordmark = true,
  withQualifier = false,
  size = "md",
}: LogoProps) {
  const box = size === "sm" ? "h-6 w-[21px]" : "h-8 w-7";
  const glyph = size === "sm" ? "text-[9px]" : "text-[11px]";
  const word = size === "sm" ? "text-[15px]" : "text-[17px]";

  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`relative flex ${box} shrink-0 items-center justify-center bg-trust-600`}
        style={{ clipPath: HEX_CLIP }}
      >
        <span className={`font-mono ${glyph} font-bold leading-none text-white`}>
          EJ
        </span>
      </span>

      {withWordmark && (
        <span
          className={`whitespace-nowrap font-display ${word} font-bold tracking-tight text-ink-900`}
        >
          EPM Journey
          {withQualifier && (
            <span className="ml-2 hidden font-mono text-[11px] font-normal uppercase tracking-wide text-ink-500 sm:inline">
              Master Anaplanner
            </span>
          )}
        </span>
      )}
    </span>
  );
}
