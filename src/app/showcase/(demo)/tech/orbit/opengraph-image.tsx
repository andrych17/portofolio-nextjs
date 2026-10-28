import { ImageResponse } from "next/og";

export const alt = "Your Brand, distributed GPU cloud and edge inference infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #090d16 0%, #111726 100%)",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#8b5cf6",
              boxShadow: "0 0 24px #8b5cf6",
            }}
          />
          <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8b5cf6" }}>
            Your Brand
          </span>
          <span style={{ fontSize: 18, color: "#94a3b8", marginLeft: "auto" }}>
            Tech · Distributed GPU Cloud
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: 960,
              color: "#f8fafc",
            }}
          >
            Distributed GPU cloud &amp; ultra-low latency inference.
          </div>
          <div style={{ fontSize: 24, color: "#94a3b8", maxWidth: 840, lineHeight: 1.4 }}>
            Sub-15ms time-to-first-token across 42 global edge points of presence. Serverless H100 and B200 clusters with zero cold starts.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 36,
            paddingTop: 32,
            borderTop: "1px solid rgba(248, 250, 252, 0.12)",
            fontSize: 18,
            color: "#94a3b8",
          }}
        >
          <span>900 GB/s NVLink Fabric</span>
          <span>•</span>
          <span>42 Global Edge PoPs</span>
          <span>•</span>
          <span>Serverless Scale to Zero</span>
          <span>•</span>
          <span>OpenAI API Compatible</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
