import { ImageResponse } from "next/og";

export const alt = "Your Brand, integrative longevity sanctuary, thermal contrast and hyperbaric oxygen clinic";
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
          background: "linear-gradient(150deg, #f6f4ee 60%, #e2ded3 100%)",
          color: "#161b17",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#5f6a62" }}>
          <span>Integrative Longevity Sanctuary</span>
          <span>Thermal Contrast &amp; Hyperbaric</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 136, lineHeight: 0.95, letterSpacing: -3 }}>
          <span>Your Brand</span>
          <span style={{ color: "#2b5c40", fontSize: 52, marginTop: 24, letterSpacing: -1, fontStyle: "italic" }}>
            Restoring the body through contrast, breath and stillness.
          </span>
        </div>
      </div>
    ),
    size,
  );
}
