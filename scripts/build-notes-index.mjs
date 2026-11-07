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

// Drafts (`draft: true`) are left out of the index, and therefore out of every
// route, the sitemap, the RSS feed and the "latest note" slot, unless asked for.
const includeDrafts =
  process.argv.includes("--drafts") ||
  process.env.NOTES_INCLUDE_DRAFTS === "1" ||
  process.env.NODE_ENV === "development";
let skippedDrafts = 0;

function requireString(data, key, file) {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`[notes] ${file}: frontmatter "${key}" is missing or not a string`);
  }
  return value.trim();
}

// Canonical keys win over their aliases (`published` over `date`,
// `description` over `summary`).
function pick(data, canonical, alias) {
  return data[canonical] !== undefined && data[canonical] !== null ? canonical : alias;
}

const posts = fs
  .readdirSync(notesDir)
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => {
    const { data, content } = matter(fs.readFileSync(path.join(notesDir, file), "utf8"));
    if (data.draft !== undefined && typeof data.draft !== "boolean") {
      throw new Error(`[notes] ${file}: frontmatter "draft" must be a boolean (true or false)`);
    }
    if (data.draft === true && !includeDrafts) {
      skippedDrafts += 1;
      return null;
    }
    const title = requireString(data, "title", file);
    const description = requireString(data, pick(data, "description", "summary"), file);
    const rawPublished = data[pick(data, "published", "date")];
    const published =
      rawPublished instanceof Date
        ? rawPublished.toISOString().slice(0, 10)
        : typeof rawPublished === "string"
          ? rawPublished.trim()
          : "";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(published)) {
      throw new Error(`[notes] ${file}: frontmatter "published" must be YYYY-MM-DD (or use "date")`);
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
      hasMath: /(^|[^\\])\$[^$\n]+\$|\$\$/.test(content),
    };
  })
  .filter(Boolean)
  .sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : 0));

// Serve KaTeX's stylesheet + fonts from /katex/ so only notes with maths load it.
// katex.min.css references fonts/… relatively, so the layout is preserved.
const katexDist = path.join(root, "node_modules/katex/dist");
const katexOut = path.join(root, "public/katex");
fs.mkdirSync(katexOut, { recursive: true });
fs.cpSync(path.join(katexDist, "katex.min.css"), path.join(katexOut, "katex.min.css"));
fs.cpSync(path.join(katexDist, "fonts"), path.join(katexOut, "fonts"), { recursive: true });
console.log("[notes] copied KaTeX css + fonts → public/katex/");

fs.writeFileSync(outFile, JSON.stringify(posts, null, 2) + "\n");
console.log(`[notes] indexed ${posts.length} note(s) → src/content/notes-index.json`);
console.log(
  `[notes] ${skippedDrafts} draft(s) skipped${includeDrafts ? " (drafts included)" : ""}`,
);
