import path from "node:path";
import { fileURLToPath } from "node:url";

import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const tailwindcssResolved = path.join(projectRoot, "node_modules", "tailwindcss");

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  /**
   * Some Windows setups resolve `@import "tailwindcss"` from the drive root (`F:\`)
   * instead of the app folder, which breaks `@tailwindcss/postcss`. Pin the package.
   */
  turbopack: {
    resolveAlias: {
      tailwindcss: tailwindcssResolved,
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      tailwindcss: tailwindcssResolved,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

/**
 * Turbopack requires remark/rehype plugins as string names with
 * JSON-serialisable options (no imported functions).
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
      "remark-gfm",
      "remark-math",
    ],
    rehypePlugins: [
      "rehype-slug",
      ["rehype-autolink-headings", { behavior: "wrap" }],
      ["rehype-katex", { strict: false }],
      ["rehype-pretty-code", { theme: "github-dark-default", keepBackground: false }],
    ],
  },
});

export default withMDX(nextConfig);
