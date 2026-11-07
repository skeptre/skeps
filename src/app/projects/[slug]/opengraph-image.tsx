import { ImageResponse } from "next/og";

import { SITE } from "@/config/site";
import { PROJECTS } from "@/data/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

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
          {project?.type ?? "project"}
        </div>

        <div
          style={{
            color: "#F4F4F5",
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 900,
          }}
        >
          {project?.title ?? "Project"}
        </div>

        <div
          style={{
            color: "#A1A1AA",
            fontSize: 24,
            marginTop: 24,
            lineHeight: 1.4,
            maxWidth: 800,
          }}
        >
          {project?.description ?? ""}
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
          {SITE.url.replace("https://", "") + "/projects/" + slug}
        </div>
      </div>
    ),
    { ...size },
  );
}
