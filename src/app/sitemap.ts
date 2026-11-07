import type { MetadataRoute } from "next";

import { SITE } from "@/config/site";
import { NOW_UPDATED } from "@/data/now";
import { BLOG_POSTS } from "@/data/posts";
import { PROJECTS } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogUpdated = BLOG_POSTS[0]?.published ?? SITE.updated;

  const lastModifiedFor = (href: string) => {
    if (href === "/now") return NOW_UPDATED;
    if (href === "/blog") return blogUpdated;
    return SITE.updated;
  };

  const navRoutes = SITE.nav
    .filter((link) => !link.external)
    .map((link) => ({
      url: `${SITE.url}${link.href}`,
      lastModified: lastModifiedFor(link.href),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const projectRoutes = PROJECTS.map((project) => ({
    url: `${SITE.url}/projects/${project.slug}`,
    lastModified: SITE.updated,
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
    { url: SITE.url, lastModified: SITE.updated, changeFrequency: "monthly", priority: 1 },
    ...navRoutes,
    ...projectRoutes,
    ...blogRoutes,
  ];
}
