import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-06 Checking color theme selection for preview generation', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

// List of color themes for selection not default
const colorThemes = ['purple', 'green', 'blue'];

// Generate a random selection of color theme from the list of non-default
const randomColorTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)];
// Output to console information about the selected color theme in this check
console.log(`Selected theme in TC-06: ${randomColorTheme}`);
// Activate the radio-button of the selected color theme
await page.locator(`//label[input[@value="${randomColorTheme}"]]`).check();
// Click the "Generate Preview" button
const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
await basePage.generatePreviewWithRetry(generateBtn);

await basePage.checkCodeTextareaVisible();
 // Get the iframe code
const iframeCode = await basePage.getIframeCode();
 // Check the color theme specified in the iframe code
expect(iframeCode).toContain(randomColorTheme);
  // Wait for preview to load
await basePage.checkPreviewVisible();
await basePage.waitForIframeAttached();
// Check the color theme in the preview
const src = await basePage.iframePreview.getAttribute('src');
expect(src).toContain(randomColorTheme);

})