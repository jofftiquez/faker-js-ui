import { test, expect } from './fixtures';

// Phase 1 gate: the hello-world popup loads in the extension with branding
// intact and zero console errors.
test('popup loads with branding and no console errors', async ({ context, extensionId }) => {
  const page = await context.newPage();

  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  await expect(page.getByTestId('popup-root')).toBeVisible();
  await expect(page.getByText('Faker.js UI')).toBeVisible();
  await expect(page.getByTestId('popup-version')).toHaveText(/^v2\./);
  await expect(page.getByRole('link', { name: 'View on GitHub' })).toBeVisible();

  expect(errors, `unexpected console errors:\n${errors.join('\n')}`).toEqual([]);

  await page.close();
});
