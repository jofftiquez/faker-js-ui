# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo for the Faker.js UI project, containing:

- **`packages/fakerjsui`** (`@faker-js-ui/app`) - Quasar/Vue 3 application that serves as both a web SPA and Chrome browser extension
- **`packages/website`** (`@faker-js-ui/website`) - Nuxt 3 marketing website deployed to fakerjsui.org

## Monorepo Structure

```
faker-js-ui/
├── packages/
│   ├── fakerjsui/     # Main app (Quasar SPA + Chrome Extension)
│   └── website/       # Marketing website (Nuxt 3)
├── pnpm-workspace.yaml
├── package.json       # Root workspace config
└── CLAUDE.md
```

## Development Commands

```bash
# Install all dependencies (from root)
pnpm install

# Development
pnpm dev:app          # Run the Quasar app in SPA mode
pnpm dev:bex          # Run the Quasar app in browser extension mode
pnpm dev:website      # Run the Nuxt website

# Production builds
pnpm build:app        # Build the Quasar SPA
pnpm build:bex        # Build the Chrome extension
pnpm build:website    # Build the Nuxt website

# Linting
pnpm lint:app         # Lint the Quasar app
pnpm lint:website     # Lint the website

# Run commands in specific workspaces
pnpm --filter @faker-js-ui/app <command>
pnpm --filter @faker-js-ui/website <command>
```

## Package Details

### @faker-js-ui/app (packages/fakerjsui)

The main Faker.js UI application providing a visual interface for generating fake data.

**Key files:**
- `src/constants/faker.js` - Central Faker.js method registry
- `src/pages/IndexPage.vue` - Main UI with search, bulk generation, and export
- `src-bex/my-content-script.js` - Browser extension content script for form auto-fill

**Modes:**
- SPA Mode: Standalone web app
- BEX Mode: Chrome browser extension with form auto-fill

### @faker-js-ui/website (packages/website)

Marketing and documentation website for Faker.js UI.

**Key files:**
- `nuxt.config.js` - Nuxt configuration with Firebase deployment
- `src/` - Nuxt pages and components
- `tailwind.config.js` - Tailwind CSS configuration with DaisyUI

## Key Patterns

### Adding New Faker Methods

Add entries to the `fakerAPIs` array in `packages/fakerjsui/src/constants/faker.js`:
```javascript
{
  emoji: '...',
  api: 'apiName',     // Must match faker[apiName]
  methods: [
    {
      name: 'methodName',
      tags: ['searchable', 'terms'],
      params: [],
    }
  ],
  generateMethods: function () {
    return generateMethods(this.api, this.methods);
  }
}
```

### ESLint Configuration

Both packages use StandardJS style with semicolons:
- Semicolons required
- Space before function parentheses
- Trailing commas in multiline
