import { ImageResponse } from "next/og";

export const alt = "Your Brand, industrial builder and design-build general contractor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#d9d8d3", color: "#141414" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#55554f" }}>
          <span>Your Brand</span>
          <span>Design-build · Class A licence</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 230, lineHeight: 0.82, letterSpacing: -4, fontWeight: 900, textTransform: "uppercase" }}>
          <span>Built</span>
          <span style={{ display: "flex" }}>
            <span style={{ background: "#ffd100", padding: "0 22px 8px" }}>to hold.</span>
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div style={{ display: "flex", height: 18, width: "100%", background: "repeating-linear-gradient(-45deg, #ffd100 0px, #ffd100 14px, #141414 14px, #141414 28px)" }} />
        </div>
      </div>
    ),
    size,
  );
}
