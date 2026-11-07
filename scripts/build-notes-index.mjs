// Generates src/content/notes-index.json from the frontmatter of every
// src/content/notes/*.mdx file. Runs before `next build` and `next dev`
// (see package.json "prebuild:next" / "predev"), so the site never reads the
// filesystem at runtime — Cloudflare Workers has none.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const notesDir = path.join(root, "src/content/notes");
const outFile = path.join(root, "src/content/notes-index.json");

function requireString(data, key, file) {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`[notes] ${file}: frontmatter "${key}" is missing or not a string`);
  }
  return value.trim();
}

const posts = fs
  .readdirSync(notesDir)
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => {
    const { data, content } = matter(fs.readFileSync(path.join(notesDir, file), "utf8"));
    const title = requireString(data, "title", file);
    const description = requireString(data, "description", file);
    const rawPublished = data.published;
    const published =
      rawPublished instanceof Date
        ? rawPublished.toISOString().slice(0, 10)
        : typeof rawPublished === "string"
          ? rawPublished.trim()
          : "";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(published)) {
      throw new Error(`[notes] ${file}: frontmatter "published" must be YYYY-MM-DD`);
    }
    const tags = data.tags;
    if (!Array.isArray(tags) || tags.length === 0 || !tags.every((t) => typeof t === "string")) {
      throw new Error(`[notes] ${file}: frontmatter "tags" must be a non-empty array of strings`);
    }
    const words = content.split(/\s+/).filter(Boolean).length;
    return {
      slug: file.replace(/\.mdx$/, ""),
      title,
      description,
      published,
      readingTime: `${Math.max(1, Math.round(words / 200))} min read`,
      tags,
    };
  })
  .sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : 0));

fs.writeFileSync(outFile, JSON.stringify(posts, null, 2) + "\n");
console.log(`[notes] indexed ${posts.length} note(s) → src/content/notes-index.json`);
