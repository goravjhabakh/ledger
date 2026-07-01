# Ledger

A personal finance tracker: log income and expenses, set category budgets and
savings goals, track recurring bills, and (later) get plain-English AI insights
about your spending.

Built as a deep-learning fullstack project — one app, built in phases.

## Tech stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **API:** tRPC + TanStack Query + Zod
- **Database:** Neon (Postgres) + Prisma
- **Auth:** Better-Auth
- **AI (later):** Vercel AI SDK + Google Gemini
- **Infra (later):** Upstash Redis, Cloudinary
- **Deploy:** Vercel

## Documentation

The `context/` folder is the single source of truth for this project:

- `context/01-overview.md` — what we're building and why
- `context/02-tech-stack.md` — every tech choice with reasoning
- `context/03-features-scope.md` — in-scope, out-of-scope, cut list
- `context/04-data-model.md` — entities and data model
- `context/05-roadmap.md` — the 6-month phased plan
- `context/06-conventions.md` — coding standards and workflow
- `context/phases/` — detailed per-phase plans

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `pnpm dev` — start the dev server
- `pnpm build` — production build
- `pnpm lint` — run ESLint
- `pnpm typecheck` — run TypeScript type checking
- `pnpm format` — format with Prettier
- `pnpm format:check` — check formatting
