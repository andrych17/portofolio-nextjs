import { ImageResponse } from "next/og";

export const alt = "Your Brand, product analytics for teams that ship fast";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const pts = [20, 32, 28, 44, 40, 58, 52, 74, 70, 96];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0a0a08", color: "#efede4" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: "#c8f04a", display: "flex" }} />
          Your Brand
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 108, lineHeight: 0.92, letterSpacing: -4, fontWeight: 700 }}>
            <span>Know if it worked</span>
            <span style={{ color: "#c8f04a" }}>before lunch.</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 90 }}>
          {pts.map((h, i) => (
            <div key={i} style={{ width: 40, height: h, borderRadius: 8, background: i === pts.length - 1 ? "#c8f04a" : "#2a2a24", display: "flex" }} />
          ))}
          <span style={{ marginLeft: 24, fontSize: 24, color: "#8c897e" }}>Product analytics for teams that ship fast</span>
        </div>
      </div>
    ),
    size,
  );
}
