import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-05 Checking the radio-button "full width container" functionality', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  // Activate the radio button "Full width container"
  await page.locator('.radio__square').first().click();

  // Click the "Generate Preview" button
  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);
  // Wait for iframe code to load
  await basePage.checkCodeTextareaVisible();

  const iframeCode = await basePage.getIframeCode();
   // Check data - In src, the width parameter is updated to "100%"
  expect(iframeCode).toContain(`width="100%"`);
  // Wait for preview to load
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();
  // Check width data 100%
  const widthLow = await basePage.getIframeAttribute('width');
  expect(widthLow).toBe("100%");

});