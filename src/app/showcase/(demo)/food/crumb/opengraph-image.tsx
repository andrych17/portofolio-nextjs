import { ImageResponse } from "next/og";

export const alt = "Your Brand, artisan sourdough bakery, laminated viennoiserie and specialty brew bar";
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
          background: "linear-gradient(150deg, #f7f3ec 60%, #e6dccf 100%)",
          color: "#1e1411",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#685952" }}>
          <span>Artisan Sourdough &amp; Specialty Brew</span>
          <span>Baking from 06:00 Daily</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 136, lineHeight: 0.95, letterSpacing: -3 }}>
          <span>Your Brand</span>
          <span style={{ color: "#b85e28", fontSize: 54, marginTop: 24, letterSpacing: -1, fontStyle: "italic" }}>
            Thirty-six hours of wild fermentation.
          </span>
        </div>
      </div>
    ),
    size,
  );
}
