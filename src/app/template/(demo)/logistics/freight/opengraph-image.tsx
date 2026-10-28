import { ImageResponse } from "next/og";

export const alt = "Your Brand, global freight forwarding by air, sea, road and rail";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#07142b", color: "#eaf0fa" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#93a6c6" }}>
          <span>Your Brand</span>
          <span>Air · Sea · Road · Rail</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 140, lineHeight: 0.92, letterSpacing: -4, fontWeight: 700 }}>
          <span>Every border.</span>
          <span style={{ color: "#ff4b1f" }}>One booking.</span>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ height: 6, width: 90 + i * 24, background: i === 5 ? "#ff4b1f" : "rgba(147,166,198,0.35)", borderRadius: 3 }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
