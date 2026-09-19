import type { MetadataRoute } from "next";

import { SITE } from "@/config/site";
import { BLOG_POSTS } from "@/data/posts";
import { PROJECTS } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const navRoutes = SITE.nav
    .filter((link) => !link.external && link.href !== SITE.cvPath)
    .map((link) => ({
      url: `${SITE.url}${link.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const projectRoutes = PROJECTS.map((project) => ({
    url: `${SITE.url}/projects/${project.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: post.published,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    ...navRoutes,
    ...projectRoutes,
    ...blogRoutes,
  ];
}
