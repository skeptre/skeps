# aliskeps.dev

Personal portfolio — [aliskeps.com](https://aliskeps.com)

## Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Vercel Analytics](https://vercel.com/analytics)
- Deployed on [Vercel](https://vercel.com)

## Local development

```bash
cp .env.example .env.local
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

## Updating CV

Replace `public/M_Ali_2.pdf` with the new file (keep the same filename).

## Adding projects

Edit `src/data/projects.ts` — each entry in `PROJECTS` becomes a card on `/projects`.

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://aliskeps.com` | Used in `metadataBase` |
