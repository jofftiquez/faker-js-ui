import { test, expect } from './fixtures';

// Phase 3 gate: search + grouped browser generate values, copy to clipboard,
// and show the preview toast — with no console errors / deprecation warnings.
test('search and accordion generate → copy → toast', async ({ context, extensionId }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const page = await context.newPage();

  const errors: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(e.message));

  // Skip the first-generate dialog so it can't intercept clicks in this test.
  await page.addInitScript(() => localStorage.setItem('firstGenerate', 'true'));
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  // --- search → generate ---
  await page.getByTestId('method-search').fill('email');
  const results = page.getByTestId('search-results');
  await expect(results).toBeVisible();
  await results.locator('button', { hasText: 'Email' }).first().click();

  await expect(page.getByText(/copied to clipboard/i)).toBeVisible();
  const emailClip = await page.evaluate(() => navigator.clipboard.readText());
  expect(emailClip).toContain('@');

  // --- grouped browser → generate ---
  await page.getByRole('button', { name: /Person/ }).first().click();
  await page.locator('[data-method="Person - First Name"]').click();
  await expect(page.getByText(/First Name copied to clipboard/i)).toBeVisible();
  const nameClip = await page.evaluate(() => navigator.clipboard.readText());
  expect(nameClip.length).toBeGreaterThan(0);

  expect(errors, `console errors:\n${errors.join('\n')}`).toEqual([]);
  await page.close();
});

test('first generate shows the review prompt', async ({ context, extensionId }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const page = await context.newPage();

  await page.addInitScript(() => localStorage.removeItem('firstGenerate'));
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  await page.getByTestId('method-search').fill('uuid');
  await page.getByTestId('search-results').locator('button').first().click();
  await expect(page.getByText(/copied to clipboard/i)).toBeVisible();

  // Review dialog appears ~2s after the first generate.
  await expect(page.getByTestId('review-dialog')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText(/We love feedback/i)).toBeVisible();

  await page.close();
});

test('an array-returning method is copied as pretty JSON', async ({ context, extensionId }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.setItem('firstGenerate', 'true'));
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  await page.getByTestId('method-search').fill('nearby');
  await page
    .getByTestId('search-results')
    .locator('[data-method="Location - Nearby GPS Coordinate"]')
    .click();

  await expect(page.getByText(/copied to clipboard/i)).toBeVisible();
  const arr = JSON.parse(await page.evaluate(() => navigator.clipboard.readText()));
  expect(Array.isArray(arr)).toBe(true);
  expect(arr).toHaveLength(2);

  await page.close();
});

test('search keyboard navigation and empty state', async ({ context, extensionId }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.setItem('firstGenerate', 'true'));
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  // Empty state for a non-matching query.
  await page.getByTestId('method-search').fill('zzzznotathing');
  await expect(page.getByTestId('search-no-results')).toBeVisible();

  // Keyboard: type → Enter selects the active (first) result. Wait for the
  // specific result so we don't race the debounce (the dropdown was already
  // open from the empty-query case above).
  await page.getByTestId('method-search').fill('First Name');
  await expect(page.locator('[data-testid="search-results"] [data-method="Person - First Name"]')).toBeVisible();
  await page.getByTestId('method-search').press('Enter');
  await expect(page.getByText(/copied to clipboard/i)).toBeVisible();
  expect((await page.evaluate(() => navigator.clipboard.readText())).length).toBeGreaterThan(0);

  await page.close();
});
