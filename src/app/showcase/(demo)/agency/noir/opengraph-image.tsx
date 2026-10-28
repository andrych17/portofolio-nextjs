import { ImageResponse } from "next/og";
import { noir } from "@/content/noir";

export const alt = `${noir.name}, ${noir.tagline} in ${noir.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0d0d0b", color: "#ece7dd" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#8f8a80" }}>
          <span>{noir.tagline}</span>
          <span>{noir.city}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 150, lineHeight: 0.9, letterSpacing: -4 }}>
          <span>{noir.name}</span>
          <span style={{ color: "#ff5b22", fontSize: 64, marginTop: 24, letterSpacing: -1 }}>Brands and websites people remember.</span>
        </div>
      </div>
    ),
    size,
  );
}
