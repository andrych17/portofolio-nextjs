import { ImageResponse } from "next/og";

export const alt = "Your Brand, asset-owned express road transport and pharmaceutical cold-chain fleet";
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
          background: "linear-gradient(150deg, #f5f6f9 60%, #e1e7ee 100%)",
          color: "#0f1722",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#526071" }}>
          <span>Asset-Owned Motor Carrier</span>
          <span>450+ Tractors · Satellite Telematics</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 136, lineHeight: 0.95, letterSpacing: -3 }}>
          <span>Your Brand</span>
          <span style={{ color: "#e65100", fontSize: 52, marginTop: 24, letterSpacing: -1, fontStyle: "italic" }}>
            Autonomous dispatch across eight thousand highway lanes.
          </span>
        </div>
      </div>
    ),
    size,
  );
}
