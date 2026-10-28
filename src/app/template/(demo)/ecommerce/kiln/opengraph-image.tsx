import { ImageResponse } from "next/og";

export const alt = "Your Brand, ceramic supply, glaze lab and maker storefront";
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
          background: "#faf6ef",
          color: "#1e1916",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#6c6158",
          }}
        >
          <span>Batch-Tracked Supply</span>
          <span>Live Shelf Sync</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 136, lineHeight: 0.94, letterSpacing: -3 }}>
          <span>Stocked for the</span>
          <span style={{ color: "#c44d34", fontStyle: "italic" }}>mindful maker.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, letterSpacing: 6, textTransform: "uppercase" }}>
          <span>Your Brand</span>
          <span style={{ color: "#6c6158" }}>Ceramics · Glazes · Open Studio</span>
        </div>
      </div>
    ),
    size,
  );
}
