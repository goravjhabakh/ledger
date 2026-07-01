# Ledger — Project Overview

> This `context/` folder is the **single source of truth** for the project.
> If code and these docs disagree, we fix one of them on purpose — never drift silently.

## One-liner

A personal finance tracker where you log income/expenses (manually, via CSV/PDF,
or by snapping a receipt), set category budgets and savings goals, track recurring
bills, and get plain-English AI insights about your spending.

## Who it's for

- **Primary user:** me (the builder). I will use it for my own money — dogfooding.
- **Also:** other people can sign up and get their own private accounts (multi-user).

## Why this project

- Goal is to **learn the stack deeply**, not to ship fast or chase users.
- Finance has a clean CRUD core that is useful even with **zero AI**, which de-risks
  the whole thing: we can ship a real, working app before touching Gemini.
- It naturally justifies every piece of the target tech stack (see `02-tech-stack.md`).

## Guiding principles (read these before every phase)

1. **One project, built in phases.** Not five half-apps. Each phase adds _one_ new
   piece of tech and _one_ new concept.
2. **Every phase ends deployed and useful.** No 6-month "it'll work when it's done."
   I should be using it myself by ~week 4.
3. **No tool without a problem.** A technology only enters the codebase when there is
   a concrete need for it. No bolting things on to look impressive.
4. **Scope is the enemy.** When in doubt, cut. See the cut list in `03-features-scope.md`.
5. **Learn the plumbing.** We wire things ourselves (no all-in-one template) so I
   understand _why_ each layer exists.
6. **Money is exact.** All money stored as integer minor units. Never floats. Ever.

## Constraints

- **Time:** ~8–10 hrs/week for ~6 months (~200–240 hours total).
- **Skill:** starting mostly new to all layers (React, backend, DB, TS).
- **Budget:** free / free-tier services only.
- **Currency:** single currency for v1 (multi-currency is out of scope).

## Working name

**Ledger** (can be renamed later; it's a one-line change in `package.json` + these docs).
