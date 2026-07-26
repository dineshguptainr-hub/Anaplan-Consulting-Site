const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

type Variant = "light" | "dark";

/**
 * Ambient drifting hexes — the Connected Planning atmosphere that runs behind
 * every section. Purely decorative, so it is aria-hidden and pointer-inert.
 * The float keyframes are disabled by the global reduced-motion rule.
 */
export default function HexAmbience({
  variant = "light",
}: {
  variant?: Variant;
}) {
  const a = variant === "dark" ? "bg-white/[0.05]" : "bg-trust-600/[0.05]";
  const b = variant === "dark" ? "bg-white/[0.04]" : "bg-ember-600/[0.05]";
  const c = variant === "dark" ? "bg-white/[0.03]" : "bg-trust-600/[0.04]";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute -left-16 top-16 h-56 w-48 animate-float1 ${a}`}
        style={{ clipPath: HEX_CLIP }}
      />
      <div
        className={`absolute -right-12 top-1/3 h-72 w-64 animate-float2 ${b}`}
        style={{ clipPath: HEX_CLIP }}
      />
      <div
        className={`absolute bottom-8 left-1/4 h-40 w-36 animate-float2 ${c}`}
        style={{ clipPath: HEX_CLIP }}
      />
    </div>
  );
}
