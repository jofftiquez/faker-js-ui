import { test, expect } from './fixtures';

// Phase 5 gate: parameterized methods expose the argument UI and respect inputs.
test('param method opens the dialog and respects inputs (min=max=50 → 50)', async ({ context, extensionId }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.setItem('firstGenerate', 'true'));
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  // Number - Int has params → clicking opens the parameter dialog (not a direct generate).
  await page.getByRole('button', { name: /Number/ }).first().click();
  await page.locator('[data-method="Number - Int"]').click();
  await expect(page.getByTestId('parameter-dialog')).toBeVisible();

  await page.getByTestId('pf-min').fill('50');
  await page.getByTestId('pf-max').fill('50');
  await page.getByTestId('param-generate').click();

  await expect(page.getByText(/Int copied to clipboard/i)).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('50');

  await page.close();
});

test('Use Defaults generates with the default params', async ({ context, extensionId }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.setItem('firstGenerate', 'true'));
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  await page.getByTestId('method-search').fill('Password');
  await page.locator('[data-testid="search-results"] [data-method="Internet - Password"]').click();
  await expect(page.getByTestId('parameter-dialog')).toBeVisible();
  await page.getByTestId('param-defaults').click();

  await expect(page.getByText(/Password copied to clipboard/i)).toBeVisible();
  expect((await page.evaluate(() => navigator.clipboard.readText())).length).toBeGreaterThanOrEqual(8);

  await page.close();
});

test('bulk dialog respects params (int min=max=7 → [7,7,7])', async ({ context, extensionId }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.setItem('firstGenerate', 'true'));
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  await page.getByRole('button', { name: /Number/ }).first().click();
  await page.locator('[data-bulk="Number - Int"]').click();
  await expect(page.getByTestId('bulk-dialog')).toBeVisible();

  await page.getByTestId('pf-min').fill('7');
  await page.getByTestId('pf-max').fill('7');
  await page.getByTestId('bulk-count').fill('3');
  await page.getByTestId('bulk-generate').click();

  expect(JSON.parse(await page.evaluate(() => navigator.clipboard.readText()))).toEqual([7, 7, 7]);

  await page.close();
});
