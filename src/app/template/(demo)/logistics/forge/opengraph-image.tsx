import { ImageResponse } from "next/og";

export const alt = "Your Brand, engineered heavy-haul transport, multi-axle modular trailers and project cargo logistics";
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
          background: "linear-gradient(150deg, #101317 60%, #1e2530 100%)",
          color: "#f3f4f6",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#94a3b8" }}>
          <span>Engineered Heavy Transport</span>
          <span>SPMT &amp; Hydraulic Platforms · 600+ Tons</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 136, lineHeight: 0.95, letterSpacing: -3 }}>
          <span>Your Brand</span>
          <span style={{ color: "#f59e0b", fontSize: 52, marginTop: 24, letterSpacing: -1, fontStyle: "italic" }}>
            Engineering heavy transport for impossible cargo.
          </span>
        </div>
      </div>
    ),
    size,
  );
}
