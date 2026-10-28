import { ImageResponse } from "next/og";

export const alt = "Your Brand, family clinic with same-week appointments and a 24-hour emergency desk";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f6f4ed", color: "#0e3535" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#52706d" }}>
          <span>Your Brand</span>
          <span>Family clinic · 7 departments</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, lineHeight: 0.9, letterSpacing: -5, fontWeight: 700 }}>
          <span>Good care,</span>
          <span style={{ color: "#c2432a" }}>close to home.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="420" height="56" viewBox="0 0 600 70" fill="none">
            <path d="M0 36H170L186 36 202 8 222 62 240 20 254 36H380L396 36 410 4 434 66 450 24 462 36H600" stroke="#c2432a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: "flex", padding: "12px 26px", borderRadius: 999, background: "#f2694b", color: "#0e3535", fontSize: 26, fontWeight: 700 }}>Book online</div>
        </div>
      </div>
    ),
    size,
  );
}
