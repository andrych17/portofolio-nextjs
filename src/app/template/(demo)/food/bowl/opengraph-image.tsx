import { ImageResponse } from "next/og";

export const alt = "Your Brand, organic grain bowls, fresh greens and cold-pressed elixirs";
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
          background: "linear-gradient(150deg, #fbf9f4 60%, #eee8db 100%)",
          color: "#17231a",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#5c6d60" }}>
          <span>Organic Grain Bowls & Greens</span>
          <span>Harvested Daily</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 140, lineHeight: 0.95, letterSpacing: -3 }}>
          <span>Your Brand</span>
          <span style={{ color: "#d95c26", fontSize: 56, marginTop: 24, letterSpacing: -1, fontStyle: "italic" }}>
            Real food, pulled from the soil this morning.
          </span>
        </div>
      </div>
    ),
    size,
  );
}
