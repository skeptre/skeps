import { ImageResponse } from "next/og";

import { SITE } from "@/config/site";
import { BLOG_POSTS, getBlogPost } from "@/data/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

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
          {`Note · ${post?.published ?? ""}`}
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
          {post?.title ?? "Note"}
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
          {post?.description ?? ""}
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
          {SITE.url.replace("https://", "") + "/blog/" + slug}
        </div>
      </div>
    ),
    { ...size },
  );
}
