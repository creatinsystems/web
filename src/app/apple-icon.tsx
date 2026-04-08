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
      <div
        style={{
          position: "relative",
          width: "180px",
          height: "180px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "12px",
            height: "240px",
            background: "transparent",
            transform: "rotate(45deg)",
            left: "84px",
            top: "-30px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "white",
            }}
          />
        </div>
      </div>
    </div>,
    { ...size }
  );
}
