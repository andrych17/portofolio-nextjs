import { ImageResponse } from "next/og";

export const alt = "Your Brand, linen resort clothing made in Portugal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#cc3a16", color: "#fff4e4" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, textTransform: "uppercase" }}>
          <span>Your Brand</span>
          <span>Summer 07 · Linen made in Portugal</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 200, lineHeight: 0.92, letterSpacing: -4, fontFamily: "serif" }}>
          <span>Dressed for</span>
          <span>the long lunch.</span>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {["#cc3a16", "#0f4c5c", "#f5d36a", "#efe7d8"].map((c) => (
            <div key={c} style={{ width: 56, height: 56, borderRadius: 56, background: c, border: "3px solid #fff4e4" }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
