# @faker-js-ui/app — ⚠️ DEPRECATED (v1)

> **This package is the legacy v1 app (Quasar/Vue 3 + Quasar BEX).** It has been
> superseded by **[`@faker-js-ui/extension`](../extension)** (v2: WXT + Vue 3 +
> TypeScript + Tailwind + shadcn-vue, cross-browser MV3). Faker.js was migrated
> from v8 to **faker@10** in v2.
>
> v1 is retained only as the **visual-parity oracle** during the v2 migration and
> for reference. It will be removed once v2 is published to the stores. **Do not
> add features here** — all new work goes to `packages/extension`.

## What moved to v2

| v1 (this package) | v2 (`packages/extension`) |
|---|---|
| Quasar BEX build | WXT (MV3, Chrome + Firefox) |
| `chrome.*` background, `$q.bex` bridge | WXT-generated background, `browser.*` messaging |
| `@faker-js/faker@8` | `@faker-js/faker@10` (`/locale/en`) |
| Quasar components | Tailwind + shadcn-vue (same look) |
| `src/constants/faker.js` | typed `lib/faker/registry.ts` (audited vs faker@10) |
| `src-bex/my-content-script.js` | `lib/autofill.ts` + `entrypoints/content.ts` |

## Modes (legacy)

- SPA: `bun run _legacy_dev:app`
- BEX: `bun run _legacy_dev:bex`

The reusable fixture form `inputs.html` lives here and is used by the v2
auto-fill e2e.
