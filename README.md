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

This project uses the OpenNext Cloudflare adapter. That preserves the existing Next.js App Router, middleware, metadata routes, and image handling while producing a Workers-compatible artifact.

### Domains

The canonical production hostname is `aliskeps.com`, attached directly to the `skeps` Worker as a Cloudflare Custom Domain.

`www.aliskeps.com` should not be attached as a second Worker Custom Domain. Instead, keep a proxied DNS record for `www` and use a Cloudflare 301 redirect from `www.aliskeps.com` to `https://aliskeps.com`, preserving the path and query string.

### Cloudflare Workers Builds

The connected Cloudflare Workers Builds project should use:

| Setting | Value |
|---|---|
| Production branch | `master` |
| Build command | `npx @opennextjs/cloudflare build` |
| Deploy command | `npx @opennextjs/cloudflare deploy` |

The standard `npm run build` command remains the native Next.js build because OpenNext invokes the package's `build` script internally. Use `npm run cf:build` when you want the Workers-compatible OpenNext artifact.

The Worker configuration lives in `wrangler.jsonc`; its `name` must remain `skeps` to target the already-connected Worker. The OpenNext adapter configuration lives in `open-next.config.ts`.

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
| `npm run build` | Build the native Next.js production output |
| `npm run build:next` | Alias for the native Next.js production build |
| `npm run start` | Start the native Next.js production server |
| `npm run preview` | Build and preview in the Workers runtime |
| `npm run deploy` | Build and deploy to Cloudflare Workers |
| `npm run upload` | Build and upload a Worker version without immediately deploying it |
| `npm run cf-typegen` | Generate Cloudflare environment binding types |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run test:e2e` | Run Playwright smoke and axe accessibility tests |
| `npm run lighthouse` | Run Lighthouse CI |
| `npm run cf:build` | Build the Cloudflare/OpenNext production artifact |
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
8. Lighthouse Accessibility, Best Practices, and SEO thresholds for the home, projects, and contact routes

The Lighthouse routes run as separate CI jobs so a headless Chromium failure on one audit cannot contaminate a later route. Lighthouse currently gates Accessibility, Best Practices, and SEO at **0.90 or higher**. Performance is observed separately and is not currently a hard CI gate.

## Updating the CV

Replace `public/M_Ali_2.pdf` with the new file while the current route remains in use.

## Adding projects

Edit `src/data/projects.ts`. Each entry is included in the project index and its statically generated project route.

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
npm run build
npm run test:e2e
npm run cf:build
```

A successful native Next.js build is not sufficient on its own; the OpenNext/Cloudflare build must also pass.
