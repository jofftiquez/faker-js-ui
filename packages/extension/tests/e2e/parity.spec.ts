import { test, expect } from './fixtures';

// Phase 2 gate: branding is identical to v1. These are the deterministic,
// machine-checkable parts of "visually indistinguishable" — the exact brand
// tokens from v1's quasar.variables.scss / MainLayout.vue, asserted on the
// rendered DOM. A header screenshot artifact is captured for human side-by-side.
const PRIMARY = 'rgb(132, 59, 215)'; // #843bd7
const PAGE_BG = 'rgba(189, 233, 239, 0.5)';

test('branding matches v1 (colors, header, version badge, logo, font)', async ({ context, extensionId }) => {
  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  // Header: brand primary background, 70px tall (v1 MainLayout toolbar).
  const header = page.getByTestId('app-header');
  await expect(header).toBeVisible();
  await expect(header).toHaveCSS('background-color', PRIMARY);
  await expect(header).toHaveCSS('height', '70px');

  // App page background: pale cyan (v1 q-layout style).
  await expect(page.getByTestId('popup-root')).toHaveCSS('background-color', PAGE_BG);

  // Version badge: white background, primary text (v1 q-badge color/text-color).
  const badge = page.getByTestId('app-version');
  await expect(badge).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(badge).toHaveCSS('color', PRIMARY);

  // Logo present, 30px in compact/BEX mode (v1 isBex sizing).
  const logo = header.locator('img[alt="Faker.js UI logo"]');
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute('width', '30');

  // Structural parity with v1 MainLayout: GitHub-stars shield + open-in-new.
  const stars = header.locator('a[href*="github.com/jofftiquez/faker-js-ui"]');
  await expect(stars).toBeVisible();
  await expect(stars.locator('img')).toHaveAttribute(
    'src',
    /img\.shields\.io\/github\/stars\/jofftiquez\/faker-js-ui/,
  );
  await expect(header.locator('a[href*="app.fakerjsui.org"]')).toBeVisible();

  // Font is Roboto (v1 ships Roboto via Quasar).
  const fontFamily = await page
    .getByText('Faker.js UI')
    .evaluate((el) => getComputedStyle(el).fontFamily);
  expect(fontFamily.toLowerCase(), `actual font-family: ${fontFamily}`).toContain('roboto');

  // Artifact for human side-by-side against the v1 oracle.
  await page.setViewportSize({ width: 440, height: 240 });
  await page.screenshot({ path: 'test-results/v2-popup-header.png' });

  await page.close();
});
