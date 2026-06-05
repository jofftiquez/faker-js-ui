<p align="center"><img width="200px" src="./packages/fakerjsui/faker-js-ui-logo.png"></p>

# Faker.js UI

[Watch Demo Here](https://youtu.be/QYoqCh-wj_Q) | [Live App](https://app.fakerjsui.org) | [Website](https://fakerjsui.org)

Cross-browser extension and UI for [Faker.js](https://fakerjs.dev/) — generate fake data, copy it, bulk-export it, and auto-fill forms.

Available in the [Chrome Web Store](https://chrome.google.com/webstore/detail/fakerjs-ui/onahjokmphbfmdihclgeehajfnpkpaja).

![Faker.js UI Screenshot](https://github.com/jofftiquez/fakerjsui.org/assets/8638243/785c2638-af34-4885-9b12-694545f611ed)

## Monorepo structure

| Package | Description | Tech Stack |
|---------|-------------|------------|
| [`@faker-js-ui/extension`](./packages/extension) | **v2** — cross-browser MV3 extension (Chrome + Firefox) | **WXT, Vue 3, TypeScript, Tailwind, shadcn-vue, faker@10** |
| [`@faker-js-ui/app`](./packages/fakerjsui) | **v1 (deprecated)** — Quasar SPA + Chrome extension; kept as the parity oracle | Quasar, Vue 3, faker@8 |
| [`@faker-js-ui/website`](./packages/website) | Marketing website | Nuxt 3, Tailwind, DaisyUI |

> **v2** lives in `packages/extension`. See its [README](./packages/extension/README.md)
> and the root [`CLAUDE.md`](./CLAUDE.md) for the standing constraints.

## Features

- [x] Generate fake data with one click (search or browse by category)
- [x] Copy to clipboard instantly, with a preview
- [x] Per-method argument prompts (length, ranges, casing, dates, …)
- [x] Bulk generation with JSON/CSV export
- [x] Auto-fill forms with type-appropriate Faker data (Chrome + Firefox)

## Development (v2 extension)

This monorepo uses **[Bun](https://bun.sh)** workspaces.

```bash
bun install

bun run dev:ext            # WXT dev (Chromium)
bun run dev:ext:firefox    # WXT dev (Firefox)
bun run build:ext          # build Chrome MV3
bun run build:ext:firefox  # build Firefox MV3
bun run zip:ext            # package both zips (+ Firefox AMO sources zip)
bun run test:ext           # vitest unit + Playwright e2e gate
```

Build output lands in `packages/extension/.output/`:

- **Chrome/Edge:** load `chrome-mv3/` unpacked (`chrome://extensions` → Load unpacked),
  or install `faker-js-ui-<version>-chrome.zip`.
- **Firefox:** `bun --filter @faker-js-ui/extension start:firefox` (web-ext), or load
  `firefox-mv3/` via `about:debugging`. AMO submission uses the
  `faker-js-ui-<version>-firefox.zip` + `-sources.zip`.

### Website

```bash
bun run dev:website
bun run build:website
```

## Contributing

Contributions welcome — please target `packages/extension`.

## License

MIT

<!-- GitAds-Verify: 7459IOQGRJ65FIXT5MUEC5BSW38J216Z -->
