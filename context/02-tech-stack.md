# Ledger — Tech Stack (with reasoning)

Every choice below was made deliberately. If we ever consider changing one,
update this file with the new reasoning.

## Locked stack summary

| Layer            | Choice                           | Phase introduced |
| ---------------- | -------------------------------- | ---------------- |
| Framework        | Next.js 16 (App Router)          | 1 (installed)    |
| UI runtime       | React 19                         | 1 (installed)    |
| Language         | TypeScript (strict mode)         | 1 (installed)    |
| Styling          | Tailwind CSS v4                  | 1 (installed)    |
| UI components    | shadcn/ui                        | 1                |
| Database         | Neon (serverless Postgres)       | 1                |
| ORM              | Prisma                           | 1                |
| Deployment       | Vercel                           | 1                |
| Package manager  | pnpm                             | (installed)      |
| API layer        | tRPC v11                         | 2                |
| Data fetching    | TanStack Query (via tRPC)        | 2                |
| Validation       | Zod (shared schemas)             | 2                |
| Auth             | Better-Auth                      | 2                |
| Charts           | Recharts (shadcn chart wrappers) | 3                |
| CSV/PDF parsing  | TBD (papaparse etc.)             | 4                |
| AI SDK           | Vercel AI SDK                    | 5                |
| AI model         | Google Gemini (free tier)        | 5                |
| Rate limit/cache | Upstash Redis                    | 5                |
| Image storage    | Cloudinary                       | 6                |
| Background jobs  | Inngest (STRETCH only)           | 7 (stretch)      |

## Reasoning per choice

### Next.js 16 + React 19 (App Router)

- One framework for frontend + backend. Ideal for a beginner learning fullstack.
- Note: these are _very_ new versions. Occasionally a library/tutorial lags behind.
  Dealing with current versions is part of the job; we adapt when it bites.

### TypeScript — strict mode, no compromises

- `strict: true`, no implicit `any`, no unused vars.
- Will produce more errors early. That's the point — it's how you learn TS properly.

### Tailwind v4 + shadcn/ui

- Tailwind = utility classes, fast styling, no CSS rabbit holes.
- shadcn/ui = accessible components copied **into our own code** (we own + learn them),
  not a black-box library. Ships Recharts wrappers for the dashboard.

### Neon (Postgres)

- Serverless Postgres, generous free tier.
- **Branching enabled:** `dev` branch + `prod` branch from day one (like git for the DB).
  Protects real data; teaches a real pro workflow.

### Prisma

- Typed DB access + versioned migrations. Best beginner DX.
- **Learning rule:** occasionally inspect the SQL Prisma generates (via migrations /
  `EXPLAIN`) so we actually understand what the database is doing.

### Money storage — integer minor units (CRITICAL)

- Store money as whole numbers of the smallest unit (e.g. 1050 = ₹10.50).
- **Why:** binary floating point can't represent decimals exactly
  (`0.1 + 0.2 !== 0.3`). For money that means lost/created cents. Every serious
  payment system (Stripe, banks) uses integer minor units.
- Helpers: `parseMoney("10.50") -> 1050`, `formatMoney(1050) -> "₹10.50"`.

### tRPC v11 + TanStack Query

- End-to-end typesafety: call backend functions from the frontend with full
  autocomplete; backend changes surface as frontend type errors instantly.
- Only works because frontend + backend live in one TS project (unified Next.js).
- Paired with TanStack Query for caching, loading/error states, refetching.

### Zod — shared schemas everywhere

- Define a schema once; reuse it for tRPC input validation AND frontend form
  validation. Single source of truth for "what valid data looks like."

### Better-Auth

- Modern, fully typesafe, self-hosted, free forever. Pairs cleanly with
  tRPC/Prisma/Zod. Smaller community than NextAuth but better DX for learning today.
- **Login methods, sequenced:** Google OAuth first → email + password → GitHub OAuth.
  We do NOT build all three at once.

### Recharts

- React-native charting; shadcn provides chart wrappers. Powers the dashboard.

### Vercel AI SDK + Gemini

- Vercel AI SDK gives clean streaming + provider-swappable helpers over Gemini.
- Gemini free tier for spending insights and (later) receipt extraction.

### Upstash Redis

- Serverless Redis, free tier. Used to **rate-limit AI calls** (so we don't blow the
  free quota / get abused) and **cache** expensive AI summaries.

### Cloudinary

- Free-tier image storage + transforms for uploaded receipt photos.

### Inngest — STRETCH, Phase 7 only

- Background jobs / durable workflows. **Not needed early.** Only justified once we
  have real background work: processing recurring bills on a schedule, batch-processing
  a large CSV through AI, or emailing a monthly summary. Do NOT touch until earned.

### Vercel (deploy)

- Made by the Next.js team; best free DX. **Deploy early and often**, starting Phase 1.

## Coding standards & tooling

- **ESLint** (installed) + **Prettier** (format-on-save). Solid baseline from the start.
- **TypeScript strict** as above.
- Commit hooks (Husky + lint-staged) and Conventional Commits: **added later**, not day one.
- **No automated tests** for this project (builder's explicit choice). Money-math
  correctness handled by careful helpers + manual verification.

## Free-tier services checklist (accounts to create as needed)

- [ ] Neon (database) — Phase 1
- [ ] Vercel (deploy) — Phase 1
- [ ] Google Cloud OAuth credentials — Phase 2
- [ ] GitHub OAuth app — Phase 2 (later)
- [ ] Google AI Studio (Gemini API key) — Phase 5
- [ ] Upstash (Redis) — Phase 5
- [ ] Cloudinary — Phase 6
