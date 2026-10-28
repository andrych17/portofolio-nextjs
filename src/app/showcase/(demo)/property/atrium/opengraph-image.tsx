import { ImageResponse } from "next/og";

export const alt = "Your Brand, offices and studios in fourteen city-centre buildings";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const bands = [
  { w: 150, c: "#ff4a1c" },
  { w: 230, c: "#0b1319" },
  { w: 230, c: "#ff4a1c" },
  { w: 290, c: "#0b1319" },
  { w: 290, c: "#0b1319" },
  { w: 290, c: "#e8ebea", ring: true },
];

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "space-between", padding: 72, background: "#e8ebea", color: "#0b1319" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 700 }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#566068" }}>Your Brand · City-centre workspace</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 112, lineHeight: 0.95, letterSpacing: -4, fontWeight: 300 }}>
            <span>Work a few</span>
            <span style={{ fontWeight: 700 }}>floors above</span>
            <span style={{ display: "flex" }}>
              the street<span style={{ color: "#ff4a1c" }}>.</span>
            </span>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#566068" }}>14 buildings · leases from 6 months · service charge included</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: 6, width: 300 }}>
          {bands.map((b, i) => (
            <div
              key={i}
              style={{ width: b.w, height: i === 0 ? 46 : 62, background: b.c, border: b.ring ? "2px solid #0b1319" : "none" }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
