import { ImageResponse } from "next/og";

export const alt = "Creatin Systems";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
    >
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
        <defs>
          <linearGradient id="apple-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <mask id="apple-mask">
            <rect width="180" height="180" fill="white" />
            <rect
              x="70"
              y="-20"
              width="10"
              height="220"
              transform="rotate(45 70 -20)"
              fill="black"
            />
          </mask>
        </defs>
        <circle cx="90" cy="90" r="90" fill="url(#apple-gradient)" mask="url(#apple-mask)" />
      </svg>
    </div>,
    { ...size }
  );
}
