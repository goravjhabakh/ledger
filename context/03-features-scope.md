# Ledger — Features & Scope

The most important document. Scope creep is what kills side projects.
**When in doubt, cut.**

## v1 — In scope (the useful core, no AI)

These make the app genuinely useful even before any AI exists.

- **Auth:** sign up / log in (Google first). Each user's data is private.
- **Transactions:** add / edit / delete income and expense entries.
  - fields: amount (minor units), type (income/expense), category, date, note.
- **Categories:** predefined + user-created categories (e.g. Food, Rent, Salary).
- **Category budgets:** set a monthly limit per category; see progress vs. limit.
- **Recurring bills:** mark a transaction as recurring (rent, subscriptions);
  see upcoming bills.
- **Savings goals:** define a goal (name + target amount) and track progress toward it.
- **Dashboard:** summary of income vs. expenses, spending by category (charts),
  budget status, upcoming bills.
- **Good UX baseline:** loading states, empty states, error states, dark/light mode,
  mobile responsive, accessible by default.

## v2 — Planned (data in, faster)

- **CSV import:** upload a bank CSV, map columns, review, import transactions.
- **PDF import:** extract transactions from a bank statement PDF (harder; may lean on AI).

## v3 — Planned (AI + media)

- **AI insights:** plain-English summaries ("you spent 40% more on dining this month").
- **Receipt scanning:** snap/upload a receipt photo → AI extracts a single transaction
  (amount, merchant, date) → user confirms. Uses Cloudinary + Gemini.

## Stretch (only if time + interest remain)

- **Recurring bill automation:** scheduled processing of recurring bills. (Inngest)
- **Monthly summary email:** AI-generated monthly recap emailed to the user. (Inngest)
- Additional login methods (email+password, GitHub) get added across v1→v2.

## Explicitly OUT of scope (the cut list)

Cutting these is a _feature_, not a limitation. Say no on purpose.

- ❌ **Split / shared expenses** (roommates, Splitwise-style). A whole app on its own.
- ❌ **Multi-currency.** Single currency only. Multiplies complexity everywhere.
- ❌ **Bank account syncing / Plaid-style live connections.** Costs money, huge scope.
- ❌ **Investments / portfolio / net worth tracking.** Different problem domain.
- ❌ **Forecasting / predictions beyond simple AI summaries.**
- ❌ **Mobile native app.** Responsive web only.
- ❌ **Teams / organizations / roles.** Single-user accounts only.

## Definition of done (per feature)

A feature is "done" only when it has:

1. Working create/read/update/delete as relevant.
2. Input validation (Zod) on both client and server.
3. Loading, empty, and error states in the UI.
4. Data scoped to the logged-in user (no data leaks between users).
5. Deployed to Vercel and manually verified in production.
