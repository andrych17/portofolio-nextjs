import { ImageResponse } from "next/og";

export const alt = "Your Brand, a wood-fired steakhouse with a seven-course tasting menu";
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
          background: "linear-gradient(160deg, #14100e 55%, #3a1a0c 100%)",
          color: "#f2e8d8",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: "#a39583" }}>
          <span>Wood-fired steakhouse</span>
          <span>Reservations open</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 168, lineHeight: 0.9, letterSpacing: -4 }}>
          <span>Your Brand</span>
          <span style={{ color: "#ff6a1f", fontSize: 62, marginTop: 28, letterSpacing: -1, fontStyle: "italic" }}>Fire, salt, and patience.</span>
        </div>
      </div>
    ),
    size,
  );
}
