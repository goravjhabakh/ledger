# Phase 2 — Finance Core (Dashboard + Transactions)

> **Goal:** build the actual heart of Ledger — a protected dashboard where the logged-in
> user can create, read, update, and delete transactions, organized by categories, with
> proper empty/loading/error states. By the end, the app is genuinely useful and deployed.
>
> **Your job:** write the code. **Manager's job:** guide, review, unblock.
> **Golden rule (still true):** read the official docs for each new concept before coding.

**New tech:** Next.js Server Actions, `revalidatePath`, shadcn sidebar/table/select/dialog
**New concept:** CRUD scoped to a user, server mutations, cache revalidation, app shell
**Estimated time:** ~3–4 weeks (~25–30 hrs)

---

## Context: where we are

- Auth is DONE (email/password, modals, session, navbar, landing). This was originally
  "Phase 2" in the roadmap; we merged it forward.
- DB schema already has `Category`, `Transaction`, `Budget`, `SavingsGoal` tables with
  `userId` foreign keys to the real `user` table.
- **Decision:** transactions are scoped to the **real logged-in user** (`session.user.id`),
  NOT a placeholder. Every query/mutation filters by `userId`.
- **Decision (deferred):** default categories on signup are SKIPPED for now (needs
  color/icon design work). Users create their own categories. Revisit later.
- **Decision:** we use **Server Actions** for writes (not tRPC yet). tRPC comes in a
  later phase — we build the plainer way first so we feel why tRPC helps.

## How to work through this phase

1. One task at a time; respect each "Done when."
2. Reuse your existing patterns: RHF + Zod + shadcn `Field` for forms, `Spinner` in
   buttons, `sonner` toasts. You already know these from auth — this phase reuses them.
3. **Commit after every numbered task.** No more giant end-of-phase commits.
4. Stuck >20 min → bring the error + the doc section you read.

## Official docs to read this phase

- Next.js Server Actions: <https://nextjs.org/docs/app/getting-started/updating-data>
- Next.js `revalidatePath`: <https://nextjs.org/docs/app/api-reference/functions/revalidatePath>
- Next.js Server Components / fetching: <https://nextjs.org/docs/app/getting-started/fetching-data>
- Next.js route groups & layouts: <https://nextjs.org/docs/app/building-your-application/routing>
- shadcn Sidebar: <https://ui.shadcn.com/docs/components/sidebar>
- shadcn Table / Data Table: <https://ui.shadcn.com/docs/components/table>
- Prisma CRUD: <https://www.prisma.io/docs/orm/prisma-client/queries/crud>

---

## Tasks (do in order)

### 2.0 — Fix the auth URL bug (carryover, do first)

- [ ] When the auth modal closes, strip `?auth=` from the URL using
      `router.replace(pathname, { scroll: false })` so `router.refresh()` after signup
      doesn't re-open the modal.
- [ ] Test: Get Started → sign up → modal closes, URL is clean `/`, no reopen.
- [ ] **Done when:** signing up/in leaves you on a clean `/` with no lingering modal.

### 2.1 — Dashboard app shell (protected layout)

**Read first:** shadcn Sidebar docs; Next.js layouts.

- [ ] Add sidebar: `pnpm dlx shadcn@latest add sidebar`
- [ ] Create `src/app/dashboard/layout.tsx`:
      - call `requireUser()` (redirects to `/?auth=signin` if not logged in),
      - render `SidebarProvider` + sidebar (nav: Overview, Transactions; Budgets/Goals
        as disabled "coming soon" for now) + a content area for `children`.
- [ ] Create `src/app/dashboard/page.tsx` — a simple "Overview" placeholder for now
      (real widgets come in the charts phase).
- [ ] Put the user menu / sign-out in the sidebar footer (or keep top nav — your choice,
      just be consistent).
- [ ] **Done when:** logged-in users see a dashboard shell at `/dashboard`; logged-out
      users get redirected to sign in.

### 2.2 — Categories: schema is ready, build minimal CRUD

Users need at least one category before they can add a transaction, so build this first.

**Read first:** Prisma CRUD docs; you already have the `Category` model.

- [ ] Zod schema `src/schemas/category.ts`: `name` (min 1), `type` (INCOME | EXPENSE).
      (Skip color/icon for now — optional in DB.)
- [ ] Server Actions `src/app/dashboard/categories/actions.ts` (`"use server"`):
      `createCategory`, `deleteCategory` — always scope by `userId` from `requireUser()`.
      `revalidatePath` after each.
- [ ] Page `src/app/dashboard/categories/page.tsx`: list the user's categories, a form
      (Dialog) to add one, delete with confirm (`alert-dialog`).
- [ ] Handle the unique constraint (`userId, name, type`) — show a friendly error if a
      duplicate is attempted.
- [ ] **Done when:** you can add, list, and delete your own categories; they persist in Neon.

### 2.3 — Transactions: read path

**Read first:** Next.js Server Components / data fetching.

- [ ] Add components: `pnpm dlx shadcn@latest add table badge empty`
- [ ] Page `src/app/dashboard/transactions/page.tsx` (Server Component):
      - `const user = await requireUser()`
      - query `prisma.transaction.findMany({ where: { userId: user.id },
        include: { category: true }, orderBy: { date: "desc" } })`
      - render a `Table`: date, category, type (Badge income/expense), amount
        (via `formatMoney`), note.
- [ ] **Empty state** with the `empty` component when there are no transactions
      (Definition of Done requires empty/loading/error states).
- [ ] Add a `loading.tsx` (skeleton) for the route.
- [ ] **Done when:** `/dashboard/transactions` lists the logged-in user's transactions,
      with a proper empty state.

### 2.4 — Transactions: write path (add)

**Read first:** Next.js Server Actions + `revalidatePath`.

- [ ] Add components: `pnpm dlx shadcn@latest add select textarea popover calendar`
      (calendar+popover = date picker).
- [ ] Zod schema `src/schemas/transaction.ts`: `amount` (string, validated so
      `parseMoney` can handle it), `type`, `categoryId`, `date`, `note` (optional).
- [ ] Server Action `createTransaction` (`"use server"`):
      - `requireUser()`, validate with the schema, `parseMoney(amount)` → minor units,
        `prisma.transaction.create({ data: { ...userId } })`, then `revalidatePath`.
- [ ] Form component (RHF + Zod + Field, in a Dialog): amount input, type select,
      category select (populated from the user's categories), date picker, note textarea.
      Reuse your auth-form patterns (Spinner, disabled while submitting, toast).
- [ ] Guard: if the user has no categories yet, prompt them to create one first.
- [ ] **Done when:** submitting the form inserts a transaction that appears in the list
      and in Neon (verify in Prisma Studio).

### 2.5 — Transactions: edit & delete

- [ ] `updateTransaction` and `deleteTransaction` Server Actions (scoped by `userId` —
      never let a user edit/delete a row that isn't theirs; check ownership in the query).
- [ ] Edit: pre-filled Dialog form. Delete: `alert-dialog` confirm.
- [ ] **Done when:** full CRUD works and is user-scoped.

**Manager note:** the ownership check matters — `where: { id, userId: user.id }` on
update/delete so someone can't tamper with another user's data by guessing an id.

### 2.6 — Money edge cases & polish

- [ ] Verify `parseMoney` / `formatMoney` round-trip correctly in the form (e.g.
      "10.50" → stored 1050 → displayed ₹10.50).
- [ ] Sensible defaults (date = today), keyboard accessibility, mobile layout of the table.
- [ ] **Done when:** the transactions experience feels clean on desktop and mobile.

### 2.7 — Deploy to Vercel

**Read first:** Vercel Next.js deploy; Prisma deploy-to-Vercel notes.

- [ ] Import repo to Vercel; set env vars: `DATABASE_URL`, `BETTER_AUTH_SECRET`,
      `BETTER_AUTH_URL` (= your Vercel URL).
- [ ] Ensure `prisma generate` runs on build; run `prisma migrate deploy` against prod.
- [ ] Test the full loop in production: sign up → add category → add transaction → see it.
- [ ] **Done when:** the live URL supports real auth + transaction CRUD against Neon.

---

## Phase 2 exit checklist (all must be true)

- [ ] Auth URL bug fixed (no sticky modal).
- [ ] Protected `/dashboard` shell with sidebar; redirects when logged out.
- [ ] Category create/list/delete, user-scoped.
- [ ] Transaction full CRUD, user-scoped, money stored as integer minor units.
- [ ] Empty + loading states present.
- [ ] Ownership enforced on every mutation (`where: { id, userId }`).
- [ ] Deployed to Vercel; full loop works in production.
- [ ] Committed in small Conventional commits throughout.

## What we deliberately DON'T do in Phase 2

- ❌ tRPC / TanStack Query → later phase (Server Actions for now).
- ❌ Budgets, savings goals UI → Phase 3.
- ❌ Charts / analytics dashboard → Phase 3.
- ❌ Default categories on signup → deferred (needs color/icon design).
- ❌ CSV import, AI, receipts → later phases.

## Gotchas / notes

- Every Prisma query/mutation MUST filter by `userId`. This is your data-isolation
  guarantee. Get it wrong and users see each other's money.
- Server Actions run on the server — never trust client input; always re-validate with
  Zod inside the action.
- Notice how much manual type-wiring the Server Actions need (form → action → DB). Feel
  that friction — it's exactly what tRPC removes in a later phase.
- `revalidatePath` is what makes the list refresh after a mutation. If the UI doesn't
  update, you probably forgot it.

## Progress log

- _(not started)_
