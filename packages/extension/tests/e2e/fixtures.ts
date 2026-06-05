import { test as base, chromium, type BrowserContext } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));

/** Built, unpacked Chromium MV3 extension (produced by `wxt build`). */
export const EXTENSION_PATH = path.resolve(dir, '../../.output/chrome-mv3');

/**
 * Loads the unpacked extension into a Chromium persistent context and exposes
 * its generated extension id. Uses `channel: 'chromium'` so the full
 * (extension-capable) Chromium is used, which supports the new headless mode.
 */
export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  // eslint-disable-next-line no-empty-pattern
  context: async ({}, use) => {
    const context = await chromium.launchPersistentContext('', {
      channel: 'chromium',
      args: [
        `--disable-extensions-except=${EXTENSION_PATH}`,
        `--load-extension=${EXTENSION_PATH}`,
      ],
    });
    await use(context);
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    // The MV3 service worker can be spun down; bound the wait and wake it by
    // opening a page if it hasn't registered yet, so the fixture fails clearly
    // instead of hanging until the test timeout.
    let [background] = context.serviceWorkers();
    if (!background) {
      background = await context
        .waitForEvent('serviceworker', { timeout: 15_000 })
        .catch(() => undefined);
    }
    if (!background) {
      const wake = await context.newPage();
      await wake.goto('about:blank');
      [background] = context.serviceWorkers();
      if (!background) {
        background = await context.waitForEvent('serviceworker', { timeout: 15_000 });
      }
      await wake.close();
    }
    const extensionId = background.url().split('/')[2] ?? '';
    await use(extensionId);
  },
});

export const expect = test.expect;
