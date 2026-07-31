import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Required by output: "export" — rendered once at build time. Note this route
// is unreferenced: the explicit metadata.icons in app/layout.tsx wins, so the
// static PNGs in public/ are what actually ship.
export const dynamic = "force-static";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7F8FA",
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#2563A8",
            borderRadius: 7,
            color: "#FFFFFF",
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "monospace",
          }}
        >
          EJ
        </div>
      </div>
    ),
    { ...size },
  );
}
