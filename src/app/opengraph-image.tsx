import { ImageResponse } from "next/og";

import { SITE } from "@/config/site";

export const runtime = "edge";
export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "hsl(0, 0%, 4%)",
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
            color: "hsl(130, 100%, 50%)",
            fontSize: 18,
            fontFamily: "monospace",
            marginBottom: 28,
            letterSpacing: "0.05em",
          }}
        >
          {"/* about */"}
        </div>

        <div
          style={{
            color: "hsl(0, 0%, 98%)",
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
            color: "hsl(0, 0%, 60%)",
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
            color: "hsl(130, 100%, 50%)",
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
