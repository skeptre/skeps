import type { MetadataRoute } from "next";

import { SITE } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const navRoutes = SITE.nav
    .filter((link) => !link.external)
    .map((link) => ({ url: `${SITE.url}${link.href}` }));

  return [{ url: SITE.url, changeFrequency: "monthly", priority: 1 }, ...navRoutes];
}
