import { test, expect } from './fixtures';
import { readFileSync } from 'node:fs';

// Phase 4 gate: bulk count produces correct rows; JSON & CSV exports match v1 shape.
test('bulk generate copies a JSON array of the requested size', async ({ context, extensionId }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.setItem('firstGenerate', 'true'));
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  await page.getByRole('button', { name: /Person/ }).first().click();
  await page.locator('[data-bulk="Person - First Name"]').click();
  await expect(page.getByTestId('bulk-dialog')).toBeVisible();

  await page.getByTestId('bulk-count').fill('4');
  await page.getByTestId('bulk-generate').click();

  await expect(page.getByText(/Generated 4 ×/i)).toBeVisible();
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  const arr = JSON.parse(clip);
  expect(Array.isArray(arr)).toBe(true);
  expect(arr).toHaveLength(4);

  await page.close();
});

test('bulk JSON and CSV downloads match v1 shape', async ({ context, extensionId }) => {
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.setItem('firstGenerate', 'true'));
  await page.goto(`chrome-extension://${extensionId}/popup.html`);
  await page.getByRole('button', { name: /Internet/ }).first().click();

  // JSON
  await page.locator('[data-bulk="Internet - Email"]').click();
  await page.getByTestId('bulk-count').fill('3');
  const [jsonDl] = await Promise.all([
    page.waitForEvent('download'),
    page.getByTestId('bulk-json').click(),
  ]);
  expect(jsonDl.suggestedFilename()).toBe('fakerui.json');
  const jsonArr = JSON.parse(readFileSync(await jsonDl.path(), 'utf8'));
  expect(jsonArr).toHaveLength(3);
  expect(jsonArr.every((v: unknown) => typeof v === 'string' && (v as string).includes('@'))).toBe(true);

  // CSV
  await page.locator('[data-bulk="Internet - Email"]').click();
  await page.getByTestId('bulk-count').fill('3');
  const [csvDl] = await Promise.all([
    page.waitForEvent('download'),
    page.getByTestId('bulk-csv').click(),
  ]);
  expect(csvDl.suggestedFilename()).toBe('fakerui.csv');
  const csv = readFileSync(await csvDl.path(), 'utf8').trim();
  expect(csv.split('\n')).toHaveLength(3);

  await page.close();
});
