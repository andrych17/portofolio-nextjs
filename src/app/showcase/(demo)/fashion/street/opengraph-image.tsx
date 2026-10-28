import { ImageResponse } from "next/og";

export const alt = "Your Brand, streetwear label with limited drops of 24 pieces";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#0d0d0d", color: "#efede6" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#8d8b84" }}>
          <span>Your Brand*</span>
          <span>Drop 07 · 24 pieces</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 168, lineHeight: 0.9, fontWeight: 900, textTransform: "uppercase" }}>
          <span>Made for the</span>
          <span style={{ display: "flex" }}>
            <span style={{ background: "#d7ff1f", color: "#0d0d0d", padding: "0 20px 6px" }}>long way home.</span>
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, letterSpacing: 3, textTransform: "uppercase", color: "#d7ff1f" }}>
          <span>No restock</span>
          <span>Ships in 48 hours</span>
          <span>Free returns</span>
        </div>
      </div>
    ),
    size,
  );
}
