import { ImageResponse } from "next/og";

export const alt = "Your Brand, custom mechanical keyboards, switches and desk gear storefront";
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
          background: "#f6f8fc",
          color: "#0f172a",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#526077" }}>
          <span>CNC Aluminum Kits</span>
          <span>100% In-Stock Drops</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 132, lineHeight: 0.94, letterSpacing: -3 }}>
          <span>Tactile precision.</span>
          <span style={{ color: "#2546f0" }}>Ready to ship.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, letterSpacing: 6, textTransform: "uppercase" }}>
          <span>Your Brand</span>
          <span style={{ color: "#526077" }}>Keyboards · Switches · Desk Gear</span>
        </div>
      </div>
    ),
    size,
  );
}
