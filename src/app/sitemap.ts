import type { MetadataRoute } from "next";

import { SITE } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/projects`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/contact`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
