# aliskeps.com

Personal portfolio — [aliskeps.com](https://aliskeps.com)

## Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Vercel Analytics](https://vercel.com/analytics)
- Deployed on [Vercel](https://vercel.com)

## Local development

No `.env` file is required — defaults live in `src/config/site.ts`. See `.env.example` only if you need to override `NEXT_PUBLIC_SITE_URL`.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run lint` | ESLint |
| `npm run test:e2e` | Playwright smoke + axe accessibility checks |
| `npm run lighthouse` | Lighthouse CI (Accessibility, Best Practices, SEO = 100) |

## Quality assurance

**Automated (CI)**

- Playwright smoke tests: `/`, `/projects`, `/contact`, CV PDF, `#links` anchor, projects TOC jumps
- [axe-core](https://github.com/dequelabs/axe-core) via `@axe-core/playwright` on the same routes
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) enforces **100** on Accessibility, Best Practices, and SEO

**Manual (recommended before releases)**

- Chrome DevTools → **Lighthouse** (same three categories)
- Browser extension **axe DevTools** for spot checks on new UI

Security headers (`Content-Security-Policy`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options`) are set in `next.config.ts`.

## Updating CV

Replace `public/M_Ali_2.pdf` with the new file (keep the same filename).

## Adding projects

Edit `src/data/projects.ts` — each entry in `PROJECTS` becomes a card on `/projects`.

## Environment variables

Optional. Copy `.env.example` to `.env.local` only when overriding defaults.

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://aliskeps.com` | Used in `metadataBase` |
