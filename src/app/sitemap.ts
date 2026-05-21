import type { MetadataRoute } from "next";

import { SITE } from "@/config/site";
import { PROJECTS } from "@/data/projects";
import { slugify } from "@/lib/slugify";

export default function sitemap(): MetadataRoute.Sitemap {
  const navRoutes = SITE.nav
    .filter((link) => !link.external)
    .map((link) => ({
      url: `${SITE.url}${link.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const projectRoutes = PROJECTS.map((project) => ({
    url: `${SITE.url}/projects/${slugify(project.title)}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    ...navRoutes,
    ...projectRoutes,
  ];
}
