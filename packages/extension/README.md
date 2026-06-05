# @faker-js-ui/extension (v2)

Cross-browser (Chrome/Edge + Firefox) MV3 extension for Faker.js UI, built with
**WXT + Vue 3 + TypeScript + Tailwind CSS + shadcn-vue**.

This package supersedes the v1 Quasar app (`packages/fakerjsui`), which is kept
as the visual-parity oracle until the v2 cutover (Phase 7).

## Standing constraints

See the root [`CLAUDE.md`](../../CLAUDE.md). In short: `browser.*` only (never
`chrome.*`); no hand-written background (WXT generates it); `@faker-js/faker@10`
from the `/locale/en` entrypoint; brand tokens and visual parity are
non-negotiable; Playwright e2e is the per-phase gate.

## Commands

```bash
pnpm --filter @faker-js-ui/extension dev          # WXT dev (Chromium)
pnpm --filter @faker-js-ui/extension dev:firefox  # WXT dev (Firefox)
pnpm --filter @faker-js-ui/extension build        # build (Chromium, MV3)
pnpm --filter @faker-js-ui/extension build:firefox
pnpm --filter @faker-js-ui/extension zip          # package zip
pnpm --filter @faker-js-ui/extension zip:firefox  # package zip + sources (AMO)
pnpm --filter @faker-js-ui/extension compile      # vue-tsc type-check
pnpm --filter @faker-js-ui/extension test:e2e     # Playwright gate
```

Build output lands in `.output/chrome-mv3/` and `.output/firefox-mv3/`.

## Layout

```
entrypoints/
  popup/            # the popup UI (Vue 3 SPA)
  background.ts     # WXT-generated background
assets/tailwind.css # Tailwind v4 + shadcn theme tokens (brand palette)
components/ui/      # shadcn-vue components (copied source)
lib/utils.ts        # cn() class helper
public/             # static assets (logo, icons)
tests/e2e/          # Playwright specs (the gate)
```
