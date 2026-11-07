import { ImageResponse } from "next/og";

import { SITE } from "@/config/site";

export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050507",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "#67E8F9",
            fontSize: 18,
            fontFamily: "monospace",
            marginBottom: 28,
            letterSpacing: "0.05em",
          }}
        >
          Software engineer · backend, data, AI evaluation
        </div>

        <div
          style={{
            color: "#F4F4F5",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {SITE.name}
        </div>

        <div
          style={{
            color: "#A1A1AA",
            fontSize: 28,
            marginTop: 20,
            lineHeight: 1.4,
            maxWidth: 800,
          }}
        >
          {SITE.description}
        </div>

        <div
          style={{
            color: "#67E8F9",
            fontSize: 18,
            fontFamily: "monospace",
            marginTop: 52,
            letterSpacing: "0.02em",
          }}
        >
          {SITE.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size },
  );
}
