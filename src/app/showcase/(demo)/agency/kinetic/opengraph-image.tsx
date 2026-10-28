import { ImageResponse } from "next/og";
import { kinetic } from "@/content/kinetic";

export const alt = `${kinetic.name}, ${kinetic.tagline} from ${kinetic.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", padding: 36, background: "#fff4e2" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 56,
            borderRadius: 44,
            border: "6px solid #121212",
            background: "#ffd23f",
            boxShadow: "14px 14px 0 #121212",
            color: "#121212",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 800, textTransform: "uppercase" }}>
            <span>Brand + web studio</span>
            <span>{kinetic.city}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 128, fontWeight: 900, lineHeight: 0.9, textTransform: "uppercase", letterSpacing: -3 }}>
            <span>Loud brands,</span>
            <span style={{ color: "#ff4a1c" }}>fast sites.</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
