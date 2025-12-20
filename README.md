<p align="center"><img width="200px" src="./packages/fakerjsui/faker-js-ui-logo.png"></p>

# Faker.js UI

[Watch Demo Here](https://youtu.be/QYoqCh-wj_Q) | [Live App](https://app.fakerjsui.org) | [Website](https://fakerjsui.org)

Web App and Browser Extension for [Faker.js](https://fakerjs.dev/).

Now available in [Chrome Web Store](https://chrome.google.com/webstore/detail/fakerjs-ui/onahjokmphbfmdihclgeehajfnpkpaja)!

![Faker.js UI Screenshot](https://github.com/jofftiquez/fakerjsui.org/assets/8638243/785c2638-af34-4885-9b12-694545f611ed)

## GitAds Sponsored

[![Sponsored by GitAds](https://gitads.dev/v1/ad-serve?source=jofftiquez/faker-js-ui@github)](https://gitads.dev/v1/ad-track?source=jofftiquez/faker-js-ui@github)

## Monorepo Structure

This monorepo contains two packages:

| Package | Description | Tech Stack |
|---------|-------------|------------|
| [`@faker-js-ui/app`](./packages/fakerjsui) | Web App & Chrome Extension | Quasar, Vue 3 |
| [`@faker-js-ui/website`](./packages/website) | Marketing Website | Nuxt 3, Tailwind CSS, DaisyUI |

## Features

- [x] Generate fake data with one click
- [x] Copy to clipboard instantly
- [x] Bulk generation with JSON/CSV export
- [x] Auto-fill forms using appropriate Faker.js methods (Browser Extension)
- [x] Preview of copied/generated data
- [x] Add prompt for arguments so users can maximize the parameters for each method

## Development

### Prerequisites

- Node.js >= 18
- pnpm

### Installation

```bash
# Install dependencies
pnpm install
```

### Running the Apps

```bash
# Run the Quasar Web App (SPA)
pnpm dev:app

# Run the Quasar Browser Extension
pnpm dev:bex

# Run the Nuxt Website
pnpm dev:website
```

### Building for Production

```bash
# Build the Quasar SPA
pnpm build:app

# Build the Chrome Extension
pnpm build:bex

# Build the Nuxt Website
pnpm build:website
```

### Linting

```bash
# Lint the Quasar app
pnpm lint:app

# Lint the website
pnpm lint:website
```

### Working with Specific Packages

```bash
# Run any command in a specific workspace
pnpm --filter @faker-js-ui/app <command>
pnpm --filter @faker-js-ui/website <command>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

<!-- GitAds-Verify: 7459IOQGRJ65FIXT5MUEC5BSW38J216Z -->
