import { ImageResponse } from "next/og";

export const alt = "Your Brand, boutique cosmetic and restorative dental studio";
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
          background: "linear-gradient(150deg, #f8fafb 60%, #e2ebf0 100%)",
          color: "#111822",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#526070" }}>
          <span>Boutique Dental Studio</span>
          <span>Porcelain &amp; Aligners</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 136, lineHeight: 0.95, letterSpacing: -3 }}>
          <span>Your Brand</span>
          <span style={{ color: "#167d8a", fontSize: 52, marginTop: 24, letterSpacing: -1, fontStyle: "italic" }}>
            Modern dentistry for quiet confidence.
          </span>
        </div>
      </div>
    ),
    size,
  );
}
