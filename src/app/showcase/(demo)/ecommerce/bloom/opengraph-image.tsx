import { ImageResponse } from "next/og";

export const alt = "Your Brand, botanical apothecary, skincare and refill bar storefront";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f6faf7",
          color: "#142e1f",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#526b5c" }}>
          <span>Cold-Pressed Botanicals</span>
          <span>Zero-Waste Refill Pouches</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 132, lineHeight: 0.94, letterSpacing: -3 }}>
          <span>Pure plant chemistry.</span>
          <span style={{ color: "#1b5e3a", fontStyle: "italic" }}>Refilled, not wasted.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, letterSpacing: 6, textTransform: "uppercase" }}>
          <span>Your Brand</span>
          <span style={{ color: "#526b5c" }}>Apothecary &amp; Refill Bar</span>
        </div>
      </div>
    ),
    size,
  );
}
