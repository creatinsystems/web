import { ImageResponse } from "next/og";

export const alt = "Creatin Systems — High-Velocity Cloud Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0e1240 0%, #182578 50%, #1e3a8a 100%)",
        color: "#fafafa",
        fontFamily: "sans-serif",
        padding: "60px 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          <span>High-Velocity</span>
          <span>Cloud Engineering.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#9aaeff",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          Cloud-native infrastructure and consumer-grade UI for modern product teams.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "16px",
            fontSize: 20,
            fontWeight: 700,
            color: "#818cf8",
            letterSpacing: "0.05em",
            textTransform: "uppercase" as const,
          }}
        >
          Creatin Systems
        </div>
      </div>
    </div>,
    { ...size }
  );
}
