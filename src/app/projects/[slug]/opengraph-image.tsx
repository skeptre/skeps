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
          {"/* " + (project?.type ?? "project") + " */"}
        </div>

        <div
          style={{
            color: "hsl(0, 0%, 98%)",
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
            color: "hsl(0, 0%, 60%)",
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
            color: "hsl(130, 100%, 50%)",
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
