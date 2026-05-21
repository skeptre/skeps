import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const tailwindcssResolved = path.join(projectRoot, "node_modules", "tailwindcss");

const nextConfig: NextConfig = {
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

export default nextConfig;
