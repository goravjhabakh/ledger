# Ledger — 6-Month Roadmap

~8–10 hrs/week for ~6 months. Each phase adds **one new tech** and **one new concept**,
and ends with a **deployed, working, useful** app.

Rule: do not start a phase until the previous phase is deployed and verified.

---

## Phase 0 — Setup & Standards (Week 1)

**New tech:** git, Prettier · **Concept:** project hygiene

- [ ] Initialize git repo, first commit, push to GitHub (private).
- [ ] Add Prettier + configure format-on-save; confirm ESLint works.
- [ ] Confirm TypeScript strict mode is on.
- [ ] Read `context/` docs; understand the plan.
- [ ] Clean up default `create-next-app` boilerplate.
      **Done when:** clean repo on GitHub, formatting + lint working.

## Phase 1 — Database + first real data (Weeks 2–4)

**New tech:** Neon, Prisma, shadcn/ui · **Concept:** schema, migrations, CRUD

- [ ] Create Neon project with `dev` + `prod` branches.
- [ ] Install + configure Prisma; connect to Neon dev branch.
- [ ] Model `Category` + `Transaction` (money = integer minor units).
- [ ] Run first migration; inspect the generated SQL.
- [ ] Write `formatMoney` / `parseMoney` helpers.
- [ ] Install shadcn/ui; set up Tailwind theme + dark/light toggle.
- [ ] Build a basic page listing transactions from the DB (no auth yet — hardcode a user).
- [ ] Deploy to Vercel (connect Neon prod branch).
      **Done when:** deployed app reads/writes real transactions to Neon.

## Phase 2 — Typed API + Auth (Weeks 5–8)

**New tech:** tRPC + TanStack Query, Zod, Better-Auth (Google) · **Concept:** typesafe API, sessions

- [ ] Set up tRPC + TanStack Query.
- [ ] Move transaction reads/writes behind tRPC procedures.
- [ ] Define shared Zod schemas for transaction input; validate client + server.
- [ ] Add Better-Auth with Google OAuth.
- [ ] Scope all data to `userId`; verify no cross-user leaks.
- [ ] Full transaction CRUD UI with loading/empty/error states.
      **Done when:** real users log in with Google and manage their own private transactions.

## Phase 3 — The useful core + dashboard (Weeks 9–13)

**New tech:** Recharts · **Concept:** derived/computed data, aggregation

- [ ] Categories: user-created + seeded defaults.
- [ ] Category budgets (monthly limit + progress vs. limit).
- [ ] Recurring bills (flag + upcoming list).
- [ ] Savings goals (target + progress).
- [ ] Dashboard: income vs. expense, spending-by-category charts, budget status.
- [ ] Polish UX: empty states, mobile responsive, a11y pass.
      **Done when:** I'm using this daily for my own money. This is the real v1.

## Phase 4 — Data import (Weeks 14–17)

**New tech:** CSV parsing lib · **Concept:** parsing, validation, edge cases

- [ ] CSV upload: parse, map columns, preview, validate, import.
- [ ] Handle messy real bank CSVs (dates, signs, duplicates).
- [ ] (Optional) PDF statement import.
      **Done when:** I can import a real bank CSV and it lands as clean transactions.

## Phase 5 — AI insights (safely) (Weeks 18–21)

**New tech:** Vercel AI SDK + Gemini, Upstash Redis · **Concept:** external APIs, rate limiting, caching

- [ ] Google AI Studio key; wire Vercel AI SDK + Gemini.
- [ ] Upstash Redis: rate-limit AI calls + cache summaries (protect free quota).
- [ ] AI spending insights on the dashboard (plain-English summary).
      **Done when:** dashboard shows useful, rate-limited, cached AI insights.

## Phase 6 — Receipts (AI + media) (Weeks 22–25)

**New tech:** Cloudinary · **Concept:** file upload, image handling, AI extraction

- [ ] Cloudinary upload for receipt photos.
- [ ] Gemini extracts amount/merchant/date from the image.
- [ ] User confirms → creates a transaction.
      **Done when:** snap a receipt → confirm → transaction saved with image attached.

## Phase 7 — Stretch (only if time + interest) (Weeks 26+)

**New tech:** Inngest · **Concept:** background jobs / scheduled work

- [ ] Scheduled processing of recurring bills.
- [ ] Monthly AI summary emailed to the user.
- [ ] Add remaining login methods (email+password, GitHub).
- [ ] Portfolio polish: README, screenshots, live demo, write-up.
      **Done when:** background jobs run on schedule; project is portfolio-ready.

---

## Progress log (update as you go)

- _(nothing yet — Phase 0 not started)_
