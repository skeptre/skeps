// The index is generated from src/content/notes/*.mdx frontmatter by
// scripts/build-notes-index.mjs before every build and dev run, so this
// module has no filesystem access and is safe in the Cloudflare Workers
// runtime (and importable from plain Node, e.g. the Playwright tests).
import notesIndex from "@/content/notes-index.json";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  published: string;
  readingTime: string;
  tags: string[];
};

export const BLOG_POSTS: BlogPost[] = notesIndex;

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
