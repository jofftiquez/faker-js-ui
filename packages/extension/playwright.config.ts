import { defineConfig } from '@playwright/test';

// Playwright is the per-phase gate (see root CLAUDE.md). The extension is
// driven via a Chromium persistent context with the unpacked build loaded.
export default defineConfig({
  testDir: './tests/e2e',
  // Builds the unpacked extension if it is missing (see tests/global-setup.ts).
  globalSetup: './tests/global-setup.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [['list']],
  timeout: 30_000,
  expect: { timeout: 10_000 },
});
