import { ImageResponse } from "next/og";

export const alt = "Your Brand, a webhook delivery API that signs, retries and logs every event";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f6f5f0", color: "#0e0e0c" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#66655d" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, letterSpacing: -0.5, textTransform: "none", color: "#0e0e0c", fontWeight: 700 }}>
            <div style={{ width: 40, height: 40, border: "3px solid #0e0e0c", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 14, height: 14, background: "#0f3dff", display: "flex" }} />
            </div>
            Your Brand
          </div>
          <span>POST /v1/events</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, lineHeight: 0.9, letterSpacing: -6, fontWeight: 800 }}>
          <span>Send it once.</span>
          <span style={{ color: "#0f3dff" }}>We make it land.</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{ display: "flex", width: 44, height: 12 + i * 9, background: i === 6 ? "#0f3dff" : "rgba(14,14,12,0.22)" }} />
          ))}
          <span style={{ marginLeft: 22, fontSize: 24, color: "#66655d" }}>Signed, retried for 72 hours, logged and replayable</span>
        </div>
      </div>
    ),
    size,
  );
}
