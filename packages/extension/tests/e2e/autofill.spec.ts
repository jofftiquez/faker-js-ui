import { test, expect } from './fixtures';
import { createServer, type Server } from 'node:http';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// The extension page's main world exposes the `chrome` runtime API; declared
// here just so the page.evaluate body type-checks in the Node test file.
declare const chrome: {
  tabs: {
    query (q: object): Promise<Array<{ id?: number; url?: string }>>;
    sendMessage (id: number, msg: unknown): Promise<unknown>;
  };
};

const dir = path.dirname(fileURLToPath(import.meta.url));
// The canonical v1 auto-fill fixture form.
const inputsHtml = readFileSync(path.resolve(dir, '../../../fakerjsui/inputs.html'), 'utf8');

let server: Server;
let formUrl: string;

test.beforeAll(async () => {
  server = createServer((_req, res) => {
    res.setHeader('content-type', 'text/html');
    res.end(inputsHtml);
  });
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const addr = server.address();
  const port = typeof addr === 'object' && addr ? addr.port : 0;
  formUrl = `http://localhost:${port}/inputs.html`;
});

test.afterAll(() => server?.close());

// Phase 6 gate: the content script fills the fixture form with type-appropriate
// values when the popup sends the fill message.
test('auto-fill populates the fixture form with type-appropriate values', async ({ context, extensionId }) => {
  const form = await context.newPage();
  await form.goto(formUrl, { waitUntil: 'domcontentloaded' });
  // Give the content script time to register its message listener.
  await form.waitForTimeout(500);

  // Drive the fill from an extension page (popup) via the messaging contract,
  // targeting the fixture tab — mirrors what the popup's Fill button does.
  const popup = await context.newPage();
  await popup.goto(`chrome-extension://${extensionId}/popup.html`);
  const count = await popup.evaluate(async () => {
    // `chrome` is the runtime API available in the extension page's main world.
    const tabs = await chrome.tabs.query({});
    const tab = tabs.find((t) => t.url?.includes('inputs.html'));
    if (!tab?.id) throw new Error('fixture tab not found');
    const res = (await chrome.tabs.sendMessage(tab.id, { type: 'fakerjsui:fill' })) as { count: number };
    return res.count;
  });

  expect(count).toBeGreaterThan(10);

  // Type-appropriate values landed in the right fields.
  await expect(form.locator('#firstName')).not.toHaveValue('');
  await expect(form.locator('#lastName')).not.toHaveValue('');
  await expect(form.locator('#username')).not.toHaveValue('');
  await expect(form.locator('#email')).toHaveValue(/@/);
  await expect(form.locator('#phone')).not.toHaveValue('');
  await expect(form.locator('#website')).toHaveValue(/^https?:\/\//);
  await expect(form.locator('#birthdate')).toHaveValue(/^\d{4}-\d{2}-\d{2}$/);
  await expect(form.locator('#city')).not.toHaveValue('');
  await expect(form.locator('#zipCode')).not.toHaveValue('');
  await expect(form.locator('#bio')).not.toHaveValue('');
  // Select got a non-empty option.
  expect(await form.locator('#country').inputValue()).not.toBe('');

  await form.close();
  await popup.close();
});
