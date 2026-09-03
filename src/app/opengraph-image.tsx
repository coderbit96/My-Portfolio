import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = "Joydip Ghosh — AI Full Stack Developer";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";
export const revalidate = 86_400;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
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
              "radial-gradient(circle at 18% 18%, rgba(59,130,246,0.34), transparent 300px), radial-gradient(circle at 82% 28%, rgba(139,92,246,0.25), transparent 280px), radial-gradient(circle at 64% 78%, rgba(34,211,238,0.22), transparent 260px)"
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 52,
            border: "1px solid rgba(148,163,184,0.22)",
            borderRadius: 36
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 90,
            top: 86,
            display: "flex",
            alignItems: "center",
            gap: 18
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(34,211,238,0.55)",
              borderRadius: 18,
              background: "rgba(59,130,246,0.18)",
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: -1
            }}
          >
            JG
          </div>
          <div
            style={{
              display: "flex",
              color: "#22D3EE",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 5,
              textTransform: "uppercase"
            }}
          >
            {siteConfig.domain}
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "132px 90px 90px"
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 950,
              letterSpacing: -5,
              lineHeight: 0.95
            }}
          >
            JOYDIP GHOSH
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 42,
              fontWeight: 800,
              color: "#F5F7FA"
            }}
          >
            AI Full Stack Developer
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 34,
              fontWeight: 700,
              color: "#9AA6B5"
            }}
          >
            Next.js • MERN • TypeScript
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 90,
            bottom: 82,
            display: "flex",
            width: 260,
            height: 260,
            borderRadius: 999,
            border: "1px solid rgba(59,130,246,0.36)",
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.78), rgba(34,211,238,0.28), rgba(139,92,246,0.66))"
          }}
        />
      </div>
    ),
    size
  );
}
