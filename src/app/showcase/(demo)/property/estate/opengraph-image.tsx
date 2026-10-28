import { ImageResponse } from "next/og";

export const alt = "Your Brand, luxury homes and private estates";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0f2a20", color: "#f6f2ea" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: "#d6b571" }}>
          <span>Developer and sales agent</span>
          <span>Villas / Townhouses / Apartments</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 120, height: 3, background: "#b08d4b", marginBottom: 36 }} />
          <span style={{ fontSize: 150, lineHeight: 0.92, letterSpacing: -4 }}>Your Brand</span>
          <span style={{ marginTop: 24, fontSize: 52, color: "#d6b571", fontStyle: "italic" }}>Homes made to be kept.</span>
        </div>
      </div>
    ),
    size,
  );
}
