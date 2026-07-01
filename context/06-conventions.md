# Ledger — Conventions & Workflow

Habits that separate job-ready engineers from hobbyists. Keep these boring and consistent.

## Folder structure (Next.js App Router)

```text
src/
  app/                 # routes (App Router). Pages, layouts, route handlers.
  components/
    ui/                # shadcn/ui components (owned by us)
    <feature>/         # feature-specific components (e.g. transactions/)
  server/
    trpc/              # tRPC routers, context, procedures  (Phase 2+)
    auth/              # Better-Auth config                 (Phase 2+)
  lib/                 # shared helpers (formatMoney, prisma client, utils)
  schemas/             # shared Zod schemas                  (Phase 2+)
prisma/
  schema.prisma        # DB schema (source of truth for data)
context/               # project source-of-truth docs (this folder)
```

(Structure grows with phases; don't create empty folders before they're needed.)

## Naming

- **Files/folders:** kebab-case (`transaction-form.tsx`).
- **React components:** PascalCase (`TransactionForm`).
- **Variables/functions:** camelCase.
- **Types/interfaces/enums:** PascalCase.
- **Constants:** UPPER_SNAKE_CASE.
- **DB models:** singular PascalCase (`Transaction`, not `transactions`).

## TypeScript

- Strict mode, no implicit `any`, no unused vars.
- Prefer explicit return types on exported functions.
- Never use `any` to silence an error — fix the type or use `unknown` + narrow.

## Money

- Always integer minor units in code + DB.
- Only `formatMoney` / `parseMoney` cross the display boundary.

## Git workflow

- Small, frequent commits. One logical change per commit.
- **Conventional Commits** style messages:
  - `feat: add transaction create form`
  - `fix: correct budget total rounding`
  - `chore: configure prettier`
  - `refactor: extract money helpers`
  - `docs: update roadmap progress`
- Work on `main` for now (solo). Introduce feature branches when it helps.
- `.env*` files are gitignored. **Never commit secrets.**

## Environment & secrets

- All secrets in `.env.local` (gitignored).
- Keep a committed `.env.example` listing required vars (no values).
- Vercel holds production env vars in its dashboard.

## UI/UX standards

- Every data view handles three states: **loading**, **empty**, **error**.
- Dark + light mode via CSS variables (shadcn theming).
- Mobile responsive by default; design mobile-first where reasonable.
- Accessible by default: labels on inputs, keyboard nav, sufficient contrast.
- Visual direction: **minimal & clean** (Linear/Vercel vibe). Consistent spacing scale.

## Definition of done

See `03-features-scope.md`. A feature isn't done until it's validated, user-scoped,
handles all UI states, and is deployed + verified in production.

## Deployment cadence

- Deploy at the end of every phase (minimum). Ideally more often.
- Test in production after each deploy — free tiers behave differently than localhost.

## Working with my manager (the AI)

- Update `context/` docs when decisions change — docs are the source of truth.
- Log progress at the bottom of `05-roadmap.md`.
- One phase at a time. Don't skip ahead. Don't add tech before its phase.
