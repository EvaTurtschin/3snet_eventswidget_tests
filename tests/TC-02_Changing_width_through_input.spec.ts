import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-02 Checking width change of preview through input', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  // Generate a random width from 230 to 1020
  const randomWidth = Math.floor(Math.random() * (1020 - 230 + 1)) + 230;

  // Click on the width input field
  const widthInput = await page.locator('input[name="width"]');
  await widthInput.click();
  await widthInput.fill(randomWidth.toString());
  
  // Click the 'Generate Preview' button
  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();
  // Get the iframe code
  const iframeCode = await basePage.getIframeCode();
  // Check that the iframe code data matches the entered value
  expect(iframeCode).toContain(`width="${randomWidth}"`);
  // Wait for the preview to load
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();
  // Check the data in the preview
  const width = await basePage.getIframeAttribute('width');
  expect(width).toBe(randomWidth.toString());
  
});