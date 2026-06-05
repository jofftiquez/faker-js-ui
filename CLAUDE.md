# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Every agent MUST read this file at the start of every phase.** The v2 standing
> constraints below are non-negotiable and override default behavior.

## Project Overview

Monorepo for the **Faker.js UI** project. A visual interface for generating fake data,
shipped as a web SPA **and** a cross-browser extension.

- **`packages/fakerjsui`** (`@faker-js-ui/app`) — **v1 (legacy)** Quasar/Vue 3 app + Chrome
  extension (Quasar BEX). **Kept building as the visual-parity oracle until the v2 cutover
  (Phase 7). Do not delete or break it.**
- **`packages/extension`** (`@faker-js-ui/extension`) — **v2 (new)** WXT + Vue 3 + TS
  extension. Created in Phase 1. This is where new work happens.
- **`packages/website`** (`@faker-js-ui/website`) — Nuxt 3 marketing site (fakerjsui.org).
  **Deferred** to optional Phase 8.

## v2 migration — standing constraints (READ FIRST)

We are migrating to **v2 (`2.0.0`)** on the **`v2` branch** (never `main` until ready).
This is a **migration, not a rewrite**: preserve every v1 feature, the UI/UX, colors,
branding, and logo. A feature regression or visual drift is a failed migration.

**Target stack (v2):**

| Concern | Decision |
|---|---|
| Extension framework | **WXT** (Vite-based, MV3, cross-browser). Replaces Quasar BEX. |
| Targets | **Chrome/Edge (Chromium) + Firefox (Gecko)**, both **MV3**. No Safari. |
| UI layer | **Vue 3 (`<script setup>`) + TypeScript, strict.** |
| UI components | **Tailwind CSS + shadcn-vue** (Reka UI primitives). **Quasar is dropped** — reproduce the v1 look pixel-for-pixel. |
| Fake data | **`@faker-js/faker@10`**, imported from the **`/locale/en` single entrypoint**. |
| Package manager | **pnpm** workspace (unchanged). |
| Tests | **Playwright e2e** — the per-phase gate. |

**Hard rules (a reviewer rejects any violation):**

1. **`browser.*` only — never `chrome.*`.** This is what makes Firefox work from one
   codebase. WXT provides the polyfill.
2. **No hand-written background service worker.** Let WXT generate the background/manifest
   per browser.
3. **faker v10 correctness.** Methods are invoked dynamically by string, so a removed
   method fails at call time, not build time. Every registry entry must be proven to exist
   via a programmatic audit (`typeof faker[api][method] === 'function'`). Known v8→v10
   removals/renames to fix:
   - `faker.random.*` — **module removed** → `string.alpha`/`alphanumeric`/`numeric`, `lorem.word`/`words`.
   - `faker.datatype.*` — only `boolean` survives → `number.*`, `string.*`.
   - `faker.image.*` legacy (animals, business, cats, city, fashion, food, image, imageUrl, nature, nightlife, people, sports, technics, transport) — **removed** → keep `avatar`, `dataUri`, `url`, `urlLoremFlickr`, `urlPicsumPhotos`, `urlPlaceholder`.
   - `faker.company.bs*` + `suffixes` — **removed** → `buzz*` equivalents.
   - `faker.internet.userName` → **`username`** (also used by auto-fill).
   - `faker.internet.avatar`/`color` → `image.avatar` / `color.rgb`.
4. **Branding is non-negotiable.** Brand tokens (must match v1 exactly):
   - primary `#843bd7`, secondary `#5de6d8`, accent `#b884f4`
   - dark `#1D1D1D`, dark-page `#121212`
   - positive `#6ecb84`, negative `#ce5a68`, info `#3bacc3`, warning `#eabb3c`
   - app background `rgba(189, 233, 239, 0.5)` (pale cyan); header `bg-primary`, white text, 70px
   - Logo: `packages/fakerjsui/src/assets/images/faker-js-ui-logo.png`. Fonts: Roboto + Material Icons.
5. **Visual parity with v1 is an acceptance criterion**, verified by Playwright screenshot
   comparison against the v1 build (the oracle).
6. **The auto-fill content script is the signature feature.** Protect it. Logic ports
   cleanly; replace the Quasar `$q.bex` bridge with WXT messaging.

## Working method

- **Agent teams, max 3 concurrent agents — never more.** Per phase: **Implementer**
  (migration code), **E2E author** (Playwright specs written against the acceptance text),
  **Reviewer/Integrator** (features + visual parity + the hard rules above, then integrates).
  Parallelize only within a phase where sub-tasks are independent; phases run in order.
- **Playwright e2e is the gate.** A phase is done only when its e2e spec is green on the
  Chrome build (cross-browser phases also on Firefox). Drive the extension via a Playwright
  persistent context with the unpacked build loaded. Auto-fill is tested against
  `packages/fakerjsui/inputs.html`.
- **GitHub is the source of truth for progress** — not local TODOs or chat. One milestone
  per phase (`v2 — Phase N`); issues per task + a dedicated e2e issue per phase, with
  acceptance criteria as the definition of done. Commits/PRs reference issues (`Fixes #NN`).
  An issue closes only when merged **and** its phase e2e is green; a milestone closes when
  all its issues do. Tracker is (re)seeded by `scripts/bootstrap-tracker.sh`.
- **Confirm before destructive changes.** Present plans/decisions and wait for go-ahead
  before large-scale edits.

## Phased plan

| Phase | Goal | e2e acceptance |
|---|---|---|
| 0 | Scan, decisions, `v2` branch, tracker, this file | Findings + decisions + branch + milestones/issues + CLAUDE.md |
| 1 | WXT scaffold (`packages/extension`): Vue 3 + TS + Tailwind + shadcn-vue, MV3, `browser.*` | Chrome **and** Firefox load a hello-world popup, no console errors; dev/build/zip scripts |
| 2 | UI shell + branding parity | v2 popup/SPA visually indistinguishable from v1 (screenshot) |
| 3 | Generate + preview + copy on faker@10 | every v1 method generates; copy works; no faker deprecation warnings |
| 4 | Bulk generation + JSON/CSV export | bulk rows correct; JSON & CSV match v1 shape |
| 5 | Per-method argument prompts | param UI matches v1 and respects inputs |
| 6 | Auto-fill, cross-browser | fixture form filled with type-appropriate values on Chrome + Firefox |
| 7 | Cross-browser package & parity | `wxt zip -b chrome`/`-b firefox` + Firefox sources zip + `gecko.id`; full suite green both engines; store assets |
| 8 | (optional) Website upgrade | Nuxt latest still builds; shared tokens reconciled |

## Development Commands

```bash
pnpm install            # install all workspace deps (from root)

# v1 legacy app (parity oracle — keep working)
pnpm dev:app            # Quasar SPA
pnpm dev:bex            # Quasar browser-extension mode
pnpm build:app          # build Quasar SPA
pnpm build:bex          # build Quasar extension
pnpm lint:app

# v2 extension (Phase 1+, packages/extension)
pnpm --filter @faker-js-ui/extension dev          # WXT dev (Chrome)
pnpm --filter @faker-js-ui/extension dev:firefox  # WXT dev (Firefox)
pnpm --filter @faker-js-ui/extension build        # build
pnpm --filter @faker-js-ui/extension zip          # package zip(s)
pnpm --filter @faker-js-ui/extension test:e2e     # Playwright gate

# website (deferred)
pnpm dev:website
pnpm build:website
```

## Key v1 files (reference for the migration)

- `packages/fakerjsui/src/constants/faker.js` — the method registry (becomes a typed TS registry in v2).
- `packages/fakerjsui/src/pages/IndexPage.vue` — search, grouped lists, bulk gen, export, copy/preview.
- `packages/fakerjsui/src/components/ParameterDialog.vue` / `ParameterField.vue` — per-method argument prompts.
- `packages/fakerjsui/src/layouts/MainLayout.vue` — header/logo/version badge/branding.
- `packages/fakerjsui/src-bex/my-content-script.js` — auto-fill field→method mapping (signature feature).
- `packages/fakerjsui/inputs.html` — ready-made auto-fill fixture form (reuse for Playwright).
- `packages/fakerjsui/src/css/quasar.variables.scss` — brand color tokens.

## Conventions

- **ESLint:** v1 packages use StandardJS-with-semicolons (semicolons required, space before
  function parens, trailing commas in multiline). v2 (`packages/extension`) uses TypeScript
  with WXT's recommended lint; keep the semicolon + trailing-comma house style for continuity.
- **Adding a faker method (v2):** add a typed entry to the registry in `packages/extension`,
  and the programmatic audit must confirm `faker[api][method]` exists in faker@10.
