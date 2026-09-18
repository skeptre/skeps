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

Production is intended to run on Cloudflare Workers. The repository keeps the deployment configuration in source control so the production runtime can be reproduced locally and in CI.

This project uses the OpenNext Cloudflare adapter rather than a framework migration. That keeps the existing Next.js App Router, middleware, metadata routes, and image handling intact while making the Worker build explicit.

### Cloudflare Workers Builds

Use these settings when connecting the repository to Cloudflare Workers Builds:

| Setting | Value |
|---|---|
| Production branch | `master` |
| Build command | `npm run cf:build` |
| Deploy command | `npm run cf:deploy:only` |
| Non-production deploy command | `npx wrangler versions upload` |

The Worker configuration lives in `wrangler.jsonc`. The OpenNext adapter configuration lives in `open-next.config.ts`.

### Local Cloudflare preview

```bash
npm ci
npm run cf:preview
```

### Deploy from the CLI

Authenticate Wrangler first, then run:

```bash
npm run cf:deploy
```

### Generate Cloudflare binding types

```bash
npm run cf:typegen
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
| `npm run build` | Build the standard Next.js production output |
| `npm run start` | Start the standard Next.js production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run test:e2e` | Run Playwright smoke and axe accessibility tests |
| `npm run lighthouse` | Run Lighthouse CI |
| `npm run cf:build` | Build the Cloudflare Worker via OpenNext |
| `npm run cf:preview` | Build and preview in the Workers runtime |
| `npm run cf:deploy` | Build and deploy to Cloudflare Workers |
| `npm run cf:deploy:only` | Deploy an already-built `.open-next` Worker |
| `npm run cf:typegen` | Generate Cloudflare environment binding types |

## Quality assurance

GitHub Actions validates:

1. dependency installation
2. ESLint
3. TypeScript
4. the standard Next.js production build
5. the Cloudflare/OpenNext production build
6. Playwright smoke tests
7. axe accessibility checks
8. Lighthouse accessibility, best-practices, and SEO thresholds

Lighthouse CI currently gates Accessibility, Best Practices, and SEO at **0.90 or higher**. Performance is observed separately and is not currently a hard CI gate.

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

Do not treat a successful `next build` alone as proof that the Cloudflare Worker build is valid.
