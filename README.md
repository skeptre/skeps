# aliskeps.com

Personal software engineering portfolio for [aliskeps.com](https://aliskeps.com).

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Playwright + axe-core
- Lighthouse CI
- Cloudflare Workers
- OpenNext Cloudflare adapter

## Deployment

Production runs on the existing Cloudflare Worker named `skeps`. The repository keeps the Worker and OpenNext configuration in source control so the production artifact is reproducible locally and in CI.

This project uses the OpenNext Cloudflare adapter. That preserves the existing Next.js App Router, Proxy, metadata routes, and image handling while producing a Workers-compatible artifact.

### Domains

The canonical production hostname is `aliskeps.com`, attached directly to the `skeps` Worker as a Cloudflare Custom Domain.

`www.aliskeps.com` should not be attached as a second Worker Custom Domain. Instead, keep a proxied DNS record for `www` and use a Cloudflare 301 redirect from `www.aliskeps.com` to `https://aliskeps.com`, preserving the path and query string.

### Cloudflare Workers Builds

The connected Worker currently invokes `npm run build`. This repository intentionally maps that command to the OpenNext Cloudflare build so the Git-integrated Worker receives a deployable `.open-next` artifact.

`open-next.config.ts` overrides OpenNext's internal Next.js build command to `npm run build:next`. This avoids recursive builds while keeping the existing Workers Builds configuration compatible.

Recommended Workers Builds settings are:

| Setting | Value |
|---|---|
| Production branch | `master` |
| Build command | `npm run build` |
| Deploy command | `npx @opennextjs/cloudflare deploy` |
| Non-production deploy command | `npx @opennextjs/cloudflare upload` |

The Worker configuration lives in `wrangler.jsonc`; its `name` must remain `skeps` to target the already-connected Worker.

### Local Cloudflare preview

```bash
npm ci
npm run preview
```

### Deploy from the CLI

Authenticate Wrangler first, then run:

```bash
npm run deploy
```

### Generate Cloudflare binding types

```bash
npm run cf-typegen
```

No Cloudflare bindings are currently required by the application, but generated types are useful if bindings are added later.

## Local development

No `.env` file is required for the current site. Defaults live in `src/config/site.ts`.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the Cloudflare/OpenNext Worker artifact |
| `npm run build:next` | Build the native Next.js production output |
| `npm run start` | Start the native Next.js production server |
| `npm run preview` | Build and preview in the Workers runtime |
| `npm run deploy` | Build and deploy to Cloudflare Workers |
| `npm run upload` | Build and upload a Worker version without immediately deploying it |
| `npm run cf-typegen` | Generate Cloudflare environment binding types |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run test:e2e` | Run Playwright smoke and axe accessibility tests |
| `npm run lighthouse` | Run Lighthouse CI |
| `npm run cf:build` | Alias for the Cloudflare/OpenNext build |
| `npm run cf:preview` | Alias for the Workers preview |
| `npm run cf:deploy` | Alias for the Workers deploy |
| `npm run cf:typegen` | Alias for Cloudflare type generation |

## Quality assurance

GitHub Actions validates:

1. dependency installation
2. ESLint
3. TypeScript
4. the native Next.js production build
5. the Cloudflare/OpenNext production build
6. Playwright smoke tests
7. axe accessibility checks
8. Lighthouse Accessibility, Best Practices, and SEO thresholds for the home, projects, blog, and contact routes

The Lighthouse routes run as separate CI jobs so a headless Chromium failure on one audit cannot contaminate a later route. Lighthouse currently gates Accessibility, Best Practices, and SEO at **0.90 or higher**. Performance is observed separately and is not currently a hard CI gate.

## Adding projects

Edit `src/data/projects.ts`. Each entry is included in the project index, sitemap, and its statically generated project route.

## Writing a note

Notes are MDX files. Create `src/content/notes/<slug>.mdx`; the filename is the URL slug (`/blog/<slug>`). Start with frontmatter, then write the body in Markdown:

```mdx
---
title: "Post title"
description: "One or two sentences used for the index, SEO and RSS."
published: "2026-09-19"
tags: ["Python", "NLP"]
draft: true
---

Intro paragraph.

## A heading

- Bullets, **bold**, [links](https://example.com), tables (GFM) and images work.
```

- `title`, `description`, `published` (`YYYY-MM-DD`) and `tags` (a non-empty list of strings) are required. `summary` is accepted as an alias for `description` and `date` for `published`. A missing field fails the build with an error naming the file.
- `draft: true` is optional. It keeps the note out of the production build, sitemap, RSS feed and "latest note" slot; remove the line to publish.
- Reading time is computed from the word count.
- Maths: inline `$\chi^2 = \frac{(b - c)^2}{b + c}$` or a block between `$$` lines (KaTeX). A note containing `$…$` or `$$` automatically loads the KaTeX stylesheet; notes without maths do not.
- Code: use fenced blocks with a language (```` ```python ````) for syntax highlighting.
- Components: `<BenchmarkChart />` is available without an import. To add another, export it from `src/mdx-components.tsx`.

No code change is needed: `scripts/build-notes-index.mjs` regenerates `src/content/notes-index.json` before every build and dev run. `npm run dev` includes drafts (as does `npm run notes:index:drafts`, or `NOTES_INCLUDE_DRAFTS=1` in any other run), so it rewrites `src/content/notes-index.json` with the draft included. Run `npm run notes:index` before committing, or just don't commit the regenerated index.

Push and the blog index, post page, OG image, sitemap, home-page "latest note" and RSS feed (`/feed.xml`) all update automatically. Everything is prerendered at build time (there is no filesystem on Cloudflare Workers at runtime).

## Environment variables

Optional. Copy `.env.example` to `.env.local` only when overriding defaults.

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://aliskeps.com` | Canonical URL used by metadata, sitemap and Open Graph output |

## Release checklist

Before merging a production change:

```bash
npm ci
npm run lint
npm run typecheck
npm run build:next
npm run test:e2e
npm run build
```

A successful native Next.js build is not sufficient on its own; the OpenNext/Cloudflare build must also pass.
