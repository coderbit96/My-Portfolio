import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          borderRadius: 38,
          background: "#080B10",
          color: "#F5F7FA",
          fontFamily: "Arial, Helvetica, sans-serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 24%, rgba(59,130,246,0.55), transparent 72px), radial-gradient(circle at 78% 72%, rgba(34,211,238,0.35), transparent 72px), radial-gradient(circle at 62% 28%, rgba(139,92,246,0.34), transparent 72px)"
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            width: 104,
            height: 104,
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(34,211,238,0.55)",
            borderRadius: 28,
            background: "rgba(19,26,36,0.78)",
            fontSize: 36,
            fontWeight: 950,
            letterSpacing: -2
          }}
        >
          JG
        </div>
      </div>
    ),
    size
  );
}
