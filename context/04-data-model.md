# Ledger — Data Model (first draft)

This is a **living draft**. Prisma schema is the real source once built; keep this
in sync when the schema changes. Money fields are always **integer minor units**.

## Entities & relationships (high level)

```text
User 1───* Transaction
User 1───* Category
User 1───* Budget
User 1───* SavingsGoal
Category 1───* Transaction
Category 1───? Budget            (a budget belongs to one category)
```

- Every user-owned row has a `userId`. This is enforced everywhere so users can
  never see each other's data. (Auth is retrofit-hostile, so we bake `userId` in
  from the start.)

## Draft schema (conceptual — real Prisma comes in Phase 1/2)

### User

Managed largely by Better-Auth. Extra profile fields as needed.

- `id`, `email`, `name`, `image`, `createdAt`

### Category

- `id`
- `userId` → owner
- `name` (e.g. "Food", "Rent", "Salary")
- `type` enum: `INCOME` | `EXPENSE`
- `color` / `icon` (optional, for UI)
- `isDefault` (seeded defaults vs. user-created)

### Transaction

- `id`
- `userId` → owner
- `categoryId` → category
- `amount` **integer, minor units** (e.g. 1050 = ₹10.50), always positive
- `type` enum: `INCOME` | `EXPENSE`
- `date` when the money moved
- `note` optional text
- `isRecurring` boolean
- `recurringRule` optional (e.g. monthly on day N) — refine when building recurring
- `createdAt`, `updatedAt`

### Budget

- `id`
- `userId` → owner
- `categoryId` → which category this budget limits
- `amount` **integer minor units** — the monthly limit
- `period` enum: `MONTHLY` (only monthly for v1)
- progress is _computed_ (sum of transactions in period), not stored.

### SavingsGoal

- `id`
- `userId` → owner
- `name` (e.g. "Emergency fund")
- `targetAmount` **integer minor units**
- `currentAmount` **integer minor units** (or computed from contributions — decide when building)
- `deadline` optional date
- `createdAt`

## Open questions to resolve when we build (don't answer now)

- Recurring bills: store as a rule + generate instances, or a simple flag? (Lean simple first.)
- Savings goal contributions: separate table, or just edit `currentAmount`? (Lean simple first.)
- Do income transactions need a category, or a separate "source"? (Probably reuse Category with type=INCOME.)

## Money handling rules (non-negotiable)

- Store: integer minor units.
- Never do money math with floats.
- Convert only at the UI boundary via `formatMoney` / `parseMoney` helpers.
- Amounts stored positive; `type` (INCOME/EXPENSE) determines direction.
