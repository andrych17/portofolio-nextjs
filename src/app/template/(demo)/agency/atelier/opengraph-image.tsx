import { ImageResponse } from "next/og";
import { atelier } from "@/content/atelier";

export const alt = `${atelier.name}, ${atelier.tagline} in ${atelier.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", padding: 28, background: "#f2ede4" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 56, borderRadius: 40, background: "#2f5d46", color: "#f2ede4" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", opacity: 0.7 }}>
            <span>{atelier.tagline}</span>
            <span>{atelier.city}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 140, lineHeight: 0.9, letterSpacing: -4, fontStyle: "italic" }}>{atelier.name}</span>
            <span style={{ fontSize: 48, marginTop: 24, opacity: 0.85 }}>Identity, packaging and websites for makers.</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
