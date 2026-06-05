import { test, expect } from './fixtures';

// Gate: the popup loads in the extension with the branded shell and zero
// console errors.
test('popup loads with branded shell and no console errors', async ({ context, extensionId }) => {
  const page = await context.newPage();

  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  await expect(page.getByTestId('popup-root')).toBeVisible();
  await expect(page.getByTestId('app-header')).toBeVisible();
  await expect(page.getByText('Faker.js UI')).toBeVisible();
  await expect(page.getByTestId('app-version')).toHaveText(/^v2\./);

  expect(errors, `unexpected console errors:\n${errors.join('\n')}`).toEqual([]);

  await page.close();
});
