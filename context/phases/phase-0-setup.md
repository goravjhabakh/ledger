# Phase 0 — Setup & Standards

> **Goal:** a clean, professional foundation before any feature work.
> **Your job:** write the code / run the commands. **Manager's job:** guide, review, unblock.
> **Rule:** don't move to Phase 1 until every "Done when" box is checked and committed.

**New tech this phase:** git remote (GitHub), Prettier
**New concept:** project hygiene — tooling, formatting, clean git history
**Estimated time:** ~1 week (~8–10 hrs), likely less.

---

## Pre-flight: what's ALREADY good (verified by analysis)

You inherited a healthy `create-next-app` scaffold. Don't redo these:

- ✅ **TypeScript is already strict** — `tsconfig.json` has `strict`, `noUncheckedIndexedAccess`,
  `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`. Excellent. Just verify.
- ✅ **ESLint configured** — Next core-web-vitals + TypeScript rules.
- ✅ **`@/*` path alias** → `./src/*` already set.
- ✅ **`.env*` gitignored** — secrets are safe.
- ✅ **Git initialized**, first commit exists.

## What's MISSING / needs cleaning (this phase's work)

- ❌ Prettier not installed.
- ❌ No GitHub remote (repo is local only).
- ⚠️ Boilerplate welcome page, default metadata, unused SVGs, default README.
- ⚠️ `globals.css` line 25 sets `font-family: Arial` which overrides the Geist font — a
  boilerplate bug to fix while cleaning.
- ⚠️ Git identity is a work email (`gorav.jhabakh@sscinc.com`). Consider a personal email
  for a portfolio repo (optional, your call).

---

## Tasks (do in order)

### 0.1 — Decide git identity & create GitHub repo

- [ ] Decide: keep work email or set a personal one for this repo. - To set per-repo: `git config user.email "you@personal.com"` (and `user.name`).
- [ ] Create a **new empty private repo** on GitHub named `ledger` (no README/gitignore —
      we already have them).
- [ ] Add it as a remote and push: - `git remote add origin <url>` - `git branch -M main` - `git push -u origin main`
- [ ] **Done when:** repo is on GitHub, `git remote -v` shows origin, `main` is pushed.

### 0.2 — Install & configure Prettier

- [ ] Install as dev deps: `prettier`, `prettier-plugin-tailwindcss`
      (the plugin auto-sorts Tailwind classes — a nice consistency win for v4).
- [ ] Create `.prettierrc` (or `.prettierrc.json`) with a small, explicit config
      (e.g. `semi`, `singleQuote` false, `printWidth`, and the tailwind plugin).
- [ ] Create `.prettierignore` (ignore `.next`, `node_modules`, `pnpm-lock.yaml`, `build`, `out`).
- [ ] Add scripts to `package.json`: - `"format": "prettier --write ."` - `"format:check": "prettier --check ."`
- [ ] Configure your editor for **format-on-save** (VS Code: set Prettier as default
      formatter, enable formatOnSave).
- [ ] **Done when:** `pnpm format` runs clean and reformats files; format-on-save works.

### 0.3 — Verify ESLint + TypeScript still pass

- [ ] Run `pnpm lint` — should pass.
- [ ] Run `pnpm exec tsc --noEmit` — should pass (verifies strict TS with no errors).
- [ ] Confirm Prettier and ESLint don't fight (they shouldn't — Prettier formats,
      ESLint lints; no `eslint-config-prettier` needed unless a conflict appears).
- [ ] **Done when:** both commands pass with no errors.

### 0.4 — Clean the boilerplate

- [ ] `src/app/page.tsx` → replace the welcome page with a minimal placeholder
      (e.g. a centered "Ledger" heading). Keep it tiny; real UI is Phase 1.
- [ ] `src/app/layout.tsx` → update `metadata.title` / `metadata.description` to Ledger.
      Keep the Geist font setup.
- [ ] `src/app/globals.css` → remove the `font-family: Arial` override on `body`
      (let Geist apply). Leave the rest for now; real theming (manual dark/light
      toggle) is a Phase 1 task with shadcn.
- [ ] Delete unused assets in `public/` (`next.svg`, `vercel.svg`, `file.svg`,
      `globe.svg`, `window.svg`) and remove any imports referencing them.
- [ ] **Done when:** `pnpm dev` shows a clean minimal page, no boilerplate, no broken imports.

### 0.5 — Rewrite README

- [ ] Replace default README with a short Ledger intro: what it is, tech stack summary,
      link to `context/` docs, how to run locally (`pnpm install`, `pnpm dev`).
- [ ] **Done when:** README describes Ledger, not create-next-app.

### 0.6 — (Optional now) `.env.example`

- [ ] Create an empty `.env.example` placeholder. We'll fill it in Phase 1 when Neon
      adds `DATABASE_URL`. Skippable until then.

### 0.7 — Commit cleanly

- [ ] Stage and commit in logical chunks using Conventional Commits, e.g.: - `chore: add prettier config and scripts` - `chore: remove create-next-app boilerplate` - `docs: rewrite readme for ledger`
- [ ] Push to GitHub.
- [ ] **Done when:** GitHub shows the clean state; `git log` reads clearly.

---

## Phase 0 exit checklist (all must be true)

- [ ] Code is on a private GitHub repo; `main` pushed.
- [ ] Prettier installed, configured, format-on-save working, `pnpm format` clean.
- [ ] `pnpm lint` and `pnpm exec tsc --noEmit` both pass.
- [ ] Boilerplate removed; `pnpm dev` shows a minimal clean page.
- [ ] README describes Ledger.
- [ ] Commits follow Conventional Commits; history is tidy.

## What we deliberately DID NOT do in Phase 0 (don't scope-creep)

- ❌ shadcn/ui install → Phase 1
- ❌ Dark/light toggle + theming → Phase 1 (needs shadcn)
- ❌ Prisma / Neon / any DB → Phase 1
- ❌ Husky / lint-staged commit hooks → later (roadmap says "added later, not day one")
- ❌ Any feature code

## Notes / gotchas

- Node 25 + Next 16 + React 19 are cutting-edge; if a tool warns about versions, tell me.
- Windows line-ending (LF↔CRLF) warnings on commit are harmless; we can add a
  `.gitattributes` later if they get noisy.

## Progress log

- 0.2 DONE — Prettier + prettier-plugin-tailwindcss installed; `.prettierrc`,
  `.prettierignore`, and scripts (`format`, `format:check`, `typecheck`) added.
- 0.3 DONE — `pnpm lint`, `pnpm typecheck`, `pnpm format` all pass clean.
- 0.4 DONE — replaced boilerplate `page.tsx` with minimal Ledger placeholder;
  updated `layout.tsx` metadata; removed `font-family: Arial` override in
  `globals.css`; deleted unused SVGs from `public/`.
- 0.5 DONE — README rewritten for Ledger.
- 0.1 TODO (needs you) — create private GitHub repo + push. Cannot be done for you.
- 0.7 TODO — commit (deliberately not committed yet, per instruction).
