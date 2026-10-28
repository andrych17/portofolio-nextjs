import { ImageResponse } from "next/og";

export const alt = "Your Brand, a luxury tailoring and ready-to-wear atelier";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f3eee6", color: "#17130f" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#6b645a" }}>
          <span>Collection 07</span>
          <span>Autumn Winter 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 168, lineHeight: 0.92, letterSpacing: -4 }}>
          <span>Made to be</span>
          <span style={{ color: "#6b1d26", fontStyle: "italic" }}>kept.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, letterSpacing: 8, textTransform: "uppercase" }}>
          <span>Your Brand</span>
          <span style={{ color: "#6b645a" }}>Tailoring and ready-to-wear</span>
        </div>
      </div>
    ),
    size,
  );
}
