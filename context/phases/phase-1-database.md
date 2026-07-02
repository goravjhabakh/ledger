# Phase 1 — Database + First Real Data

> **Goal:** stand up a real Postgres database (Neon) with Prisma, model your first
> tables, install shadcn/ui, and build a page that reads & writes real transactions —
> then deploy it to Vercel.
>
> **Your job:** write the code and run the commands. **Manager's job:** guide, review, unblock.
> **Golden rule of this phase:** _read the official docs first, then do it._ Copy-pasting
> from random blogs is how you stay a junior. Reading docs is how you level up.

**New tech:** Neon (Postgres), Prisma, shadcn/ui
**New concept:** database schema, migrations, CRUD, seeding
**Estimated time:** ~2–3 weeks (~20–25 hrs)

---

## How to work through this phase (read this first)

1. **One task at a time.** Do not jump ahead. Each task has a "Done when" — don't move
   on until it's true.
2. **Docs before code.** Every task lists the official documentation to read. Read the
   relevant section _before_ you write anything. If you skip this, you'll copy code you
   don't understand and get stuck later.
3. **Type it, don't paste it.** When following docs, type the code yourself. Muscle
   memory + reading errors is how you actually learn.
4. **When stuck for >20 min, ask your manager.** Bring: what you tried, the exact error,
   and the doc section you read. Don't suffer silently, but do try first.
5. **Commit often** (small Conventional Commits). We're not enforcing hooks yet, so
   discipline is on you.

## Official docs you'll live in this phase (bookmark these)

- **Neon:** <https://neon.tech/docs>
- **Prisma (Getting Started, Postgres):** <https://www.prisma.io/docs/getting-started>
- **Prisma schema reference:** <https://www.prisma.io/docs/orm/prisma-schema>
- **Prisma with Next.js best practices:** <https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help>
- **shadcn/ui (Next.js install):** <https://ui.shadcn.com/docs/installation/next>
- **Next.js Server Components / data fetching:** <https://nextjs.org/docs/app/getting-started/fetching-data>
- **Next.js Server Actions:** <https://nextjs.org/docs/app/getting-started/updating-data>
- **Vercel deploy:** <https://vercel.com/docs/frameworks/nextjs>

> ⚠️ We're on **Next.js 16 + React 19 + Tailwind v4** — very new. If a doc or tutorial
> shows an older pattern (e.g. `pages/` router, Tailwind v3 config file), it's outdated.
> Prefer the official docs, and tell your manager if something doesn't match.

---

## Design decisions locked for Phase 1 (so you don't have to decide mid-task)

- **No real auth yet** (that's Phase 2). But our tables have `userId`. To keep things
  honest and avoid painful rework later, we **seed ONE placeholder user** and reference
  its id. When Better-Auth arrives in Phase 2, real users slot into the same structure.
- **Only two tables this phase:** `Category` and `Transaction`. Budgets, savings goals,
  and recurring rules come in Phase 3. Don't build them now.
- **Money is integer minor units.** Always. (See `context/04-data-model.md`.)
- **Enums:** `TransactionType` = `INCOME | EXPENSE`. `CategoryType` = `INCOME | EXPENSE`.
- **Reads** use Server Components (fetch on the server). **Writes** use Server Actions.
  No tRPC yet — that's Phase 2. This is intentional: you'll _feel_ why tRPC is nice
  later by first doing it the plainer way.

---

## Tasks (do in order)

### 1.1 — Create the Neon database (dev + prod branches)

**Read first:** Neon docs → "Get started" and "Branching".

- [ ] Sign up at Neon (free tier). Create a new project named `ledger`.
- [ ] Understand branches: Neon gives you a default branch (call it your **prod**).
      Create a second branch named `dev` off it. You'll develop against `dev`.
- [ ] Copy the **connection string** for the `dev` branch (the pooled connection string
      is usually recommended for serverless — read the Neon docs note on pooled vs. direct).
- [ ] **Done when:** you have a `ledger` project with a `dev` and a prod branch, and you've
      copied the `dev` connection string somewhere safe (NOT committed).

**Manager note:** you'll paste this into `.env.local` next. Never commit connection
strings — they contain your password. `.env*` is already gitignored.

### 1.2 — Set up environment variables

- [ ] Create `.env.local` (gitignored) with your Neon dev connection string:
      `DATABASE_URL="postgresql://..."`
- [ ] Update `.env.example` (committed, no secrets) to document the variable:
      `DATABASE_URL=`
- [ ] **Done when:** `.env.local` has your real dev URL; `.env.example` lists the key
      with no value.

**Read first:** Next.js docs → "Environment Variables".

### 1.3 — Install & initialize Prisma

**Read first:** Prisma "Getting Started" → "Start from scratch (relational DB)" for
Postgres. Read what `schema.prisma`, `datasource`, and `generator` mean.

- [ ] Install: `prisma` (dev dep) and `@prisma/client` (dependency).
- [ ] Initialize Prisma (`prisma init`), which creates `prisma/schema.prisma` and wires
      `DATABASE_URL`.
- [ ] Confirm the `datasource` provider is `postgresql` and points at `env("DATABASE_URL")`.
- [ ] **Done when:** `prisma/schema.prisma` exists and `pnpm prisma validate` passes.

### 1.4 — Model `Category` and `Transaction`

**Read first:** Prisma schema reference → models, fields, `@id`, `@default`, `@relation`,
enums, `@updatedAt`, and indexes.

Model these (match `context/04-data-model.md`, scoped to Phase 1):

- `enum TransactionType { INCOME EXPENSE }`
- `enum CategoryType { INCOME EXPENSE }`
- **Category:** `id`, `userId`, `name`, `type` (CategoryType), optional `color`,
  `isDefault` (default false), `createdAt`. Relation: has many `Transaction`.
- **Transaction:** `id`, `userId`, `categoryId` (relation), `amount` (**Int**, minor units),
  `type` (TransactionType), `date`, optional `note`, `createdAt`, `updatedAt`.
- Add an **index on `userId`** for both (you'll query by user constantly).

Money reminder: `amount` is `Int` and stores minor units (1050 = ₹10.50). Never `Float`,
never `Decimal`, this phase.

- [ ] **Done when:** `pnpm prisma validate` passes and the schema models both tables with
      the relation between them.

**Manager note:** don't add `Budget`/`SavingsGoal`/`recurringRule` yet. Resist it.

### 1.5 — Run your first migration (and READ the SQL)

**Read first:** Prisma docs → "Migrate" (`prisma migrate dev`). Understand what a
migration file is and why it's version-controlled.

- [ ] Run `pnpm prisma migrate dev --name init`. This creates the tables in your Neon
      **dev** branch and writes a migration SQL file under `prisma/migrations/`.
- [ ] **Open the generated `.sql` file and read it.** This is the deep-learning moment:
      see the `CREATE TABLE`, the foreign key, the index. Match each line back to your
      Prisma model. Ask yourself: "why is there a foreign key here?"
- [ ] Optional: open **Prisma Studio** (`pnpm prisma studio`) to see your empty tables in a GUI.
- [ ] **Done when:** tables exist in Neon dev, the migration file is committed, and you can
      explain (to yourself) what the SQL does.

### 1.6 — Create a single Prisma client instance

**Read first:** Prisma → "Best practices for using Prisma Client in Next.js / dev"
(the singleton pattern to avoid too many connections during hot-reload).

- [ ] Create `src/lib/prisma.ts` exporting a single shared `PrismaClient` using the
      documented singleton pattern (guard against multiple instances in dev).
- [ ] **Done when:** you can import `prisma` from `@/lib/prisma` anywhere.

### 1.7 — Seed a placeholder user + default categories

**Read first:** Prisma docs → "Seeding".

Since there's no auth yet, we need something to attach data to.

- [ ] Create a `PLACEHOLDER_USER_ID` constant (e.g. in `src/lib/constants.ts`) — a fixed
      string you'll use as `userId` everywhere this phase.
- [ ] Write `prisma/seed.ts` that inserts a few default categories for that user
      (e.g. Salary [INCOME], Food, Rent, Transport [EXPENSE]), marked `isDefault: true`.
      Use `upsert` so re-running the seed doesn't create duplicates.
- [ ] Wire the seed command per the docs and run it.
- [ ] **Done when:** Prisma Studio shows your default categories tied to the placeholder user.

**Manager note:** using a constant for the fake user id means that when Phase 2 auth
lands, you'll grep for `PLACEHOLDER_USER_ID` and replace it with the real session user —
clean, findable migration path.

### 1.8 — Write the money helpers

**Read first:** re-read `context/04-data-model.md` money rules. (Also try `0.1 + 0.2`
in your browser console and watch it NOT equal `0.3` — that's _why_ we do this.)

- [ ] Create `src/lib/money.ts` with:
      - `parseMoney(input: string): number` → `"10.50"` → `1050` (handle bad input).
      - `formatMoney(minor: number): string` → `1050` → `"₹10.50"` (use `Intl.NumberFormat`).
- [ ] Keep it small and pure (no DB, no React). These are the only functions allowed to
      cross the decimal boundary.
- [ ] **Done when:** you've manually verified a couple of values (e.g. in a scratch script
      or the page you build next).

**Read first (bonus):** MDN → `Intl.NumberFormat`. Learn to format currency properly.

### 1.9 — Install shadcn/ui + set up theming

**Read first:** shadcn/ui → "Installation → Next.js", then "Dark mode → Next.js".

- [ ] Run the shadcn init for Next.js. Understand it writes a `components.json` and a
      `lib/utils.ts` (the `cn` helper) and sets up CSS variables in `globals.css`.
- [ ] Add the components you'll need now: `button`, `card`, `table`, `input`, `label`,
      `select` (add more as needed — you can always run the add command again).
- [ ] Set up **dark/light mode toggle** per the shadcn dark-mode guide (it uses
      `next-themes`). Add a small theme toggle button somewhere visible.
- [ ] **Done when:** `pnpm dev` shows shadcn components rendering, and toggling
      dark/light works.

**Manager note:** shadcn copies components _into your repo_ (`src/components/ui`). Open one
and read it — that's the point, you own and can learn from the code.

### 1.10 — Build the Transactions page (read path)

**Read first:** Next.js → "Fetching data" (Server Components). Understand that a Server
Component can `await` your Prisma query directly — no API route needed yet.

- [ ] Create a route (e.g. `src/app/transactions/page.tsx`) as a Server Component that:
      - queries transactions for `PLACEHOLDER_USER_ID`, newest first, including the
        related category,
      - renders them in a shadcn `Table`, using `formatMoney` for amounts and showing
        type (income/expense), category, date, note.
- [ ] Handle the **empty state** (no transactions yet → a friendly message, per our
      Definition of Done in `context/03-features-scope.md`).
- [ ] **Done when:** visiting `/transactions` lists seeded/real rows from Neon.

### 1.11 — Add a transaction (write path via Server Action)

**Read first:** Next.js → "Updating data" (Server Actions) and `revalidatePath`.

- [ ] Create a form (shadcn `Input`/`Select`/`Button`) to add a transaction:
      amount (text → `parseMoney`), type, category (from DB), date, optional note.
- [ ] Create a **Server Action** that validates input, converts amount with `parseMoney`,
      writes via Prisma (attaching `PLACEHOLDER_USER_ID`), then `revalidatePath` so the
      list refreshes.
- [ ] Handle basic invalid input (e.g. empty/NaN amount) — show a simple error. (Full
      Zod validation is Phase 2; keep it minimal but not crash-y here.)
- [ ] **Done when:** submitting the form inserts a row that appears in the list and in
      Neon (check Prisma Studio).

**Manager note:** notice how you're manually wiring types between form → action → DB.
Remember this friction — it's exactly what tRPC + Zod will remove in Phase 2. Feeling the
pain first makes the solution click.

### 1.12 — (Optional) Edit & delete

Only if you have time and energy. Otherwise defer.

- [ ] Delete a transaction (Server Action + confirm dialog).
- [ ] Edit a transaction (pre-filled form → update action).
- [ ] **Done when:** you can create, read, and delete at minimum.

### 1.13 — Deploy to Vercel (prod branch)

**Read first:** Vercel → "Deploying Next.js", and Prisma → "Deploy to Vercel"
(you must run `prisma generate` on build and use the **prod** Neon branch).

- [ ] Push your repo to GitHub (if not already).
- [ ] Import the repo into Vercel.
- [ ] Set the `DATABASE_URL` env var in Vercel to your Neon **prod** branch connection string.
- [ ] Ensure `prisma generate` runs during build (read the Prisma-on-Vercel doc — usually a
      `postinstall` script or a build command tweak).
- [ ] Run the migration against **prod** (`prisma migrate deploy`) — read the docs on how
      to do this safely for the production branch.
- [ ] **Done when:** the live Vercel URL shows your transactions page reading/writing the
      Neon prod branch.

**Manager note:** production behaves differently from localhost (env vars, connection
pooling, build step). Expect one or two deploy hiccups — that's normal and part of the
learning. Bring me the build log if it fails.

---

## Phase 1 exit checklist (all must be true)

- [ ] Neon `ledger` project with `dev` + prod branches.
- [ ] Prisma models `Category` + `Transaction`; first migration run and its SQL understood.
- [ ] Single Prisma client singleton in `src/lib/prisma.ts`.
- [ ] Placeholder user + default categories seeded.
- [ ] `formatMoney` / `parseMoney` helpers written and used.
- [ ] shadcn/ui installed; dark/light toggle works.
- [ ] `/transactions` reads real data (with empty state) and can add a transaction.
- [ ] Deployed to Vercel against the Neon prod branch; live URL works.
- [ ] Commits are small and Conventional; docs updated if any decision changed.

## What we deliberately DID NOT do in Phase 1 (don't scope-creep)

- ❌ Real auth / login → Phase 2
- ❌ tRPC / TanStack Query / Zod schemas → Phase 2
- ❌ Budgets, savings goals, recurring bills → Phase 3
- ❌ Charts / dashboard → Phase 3
- ❌ CSV import, AI, receipts → Phase 4+

## Gotchas / notes

- Pooled vs. direct Neon connection: read the Neon + Prisma docs; migrations sometimes
  want a direct URL while the app uses the pooled one.
- Next 16 / React 19 are new — if a shadcn or Prisma example assumes older versions,
  favor the official current docs and flag mismatches to your manager.
- Keep `amount` as `Int`. If you ever feel tempted by `Float`, re-read the money rules.

## Progress log

- _(not started)_
