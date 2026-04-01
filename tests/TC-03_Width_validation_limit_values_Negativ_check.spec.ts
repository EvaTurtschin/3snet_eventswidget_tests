import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-03 Validation of invalid width input values for preview - boundary values', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  // Click on the width input field
  const widthInput = await page.locator('input[name="width"]');
  await widthInput.click();

  // Generate a random width from 0 to 229
  const randomWidthLow = Math.floor(Math.random() * 230); 
  // Enter the generated invalid value
  await widthInput.fill(randomWidthLow.toString());
  
  // Click the 'Generate Preview' button
  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();
  
  // Get the iframe code data
  const iframeCodeLow = await basePage.getIframeCode();
  // Check that the width is equal to the default minimum value =230
  expect(iframeCodeLow).toContain(`width="230"`);
  // Wait for the preview to load
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();
  // Check that the width is equal to the default minimum value =230
  const widthLow = await basePage.getIframeAttribute('width');
  expect(widthLow).toBe("230");

  // Reload the page 
  await page.reload({ waitUntil: 'networkidle' }); 
  await expect(page.locator('input[name="width"]')).toBeVisible(); 
  await widthInput.click();

  // Generate a random width from 1021 to 99999
  const randomWidthHigh = Math.floor(Math.random() * (99999 - 1021 + 1)) + 1021;
  // Enter the generated invalid value
  await widthInput.fill(randomWidthHigh.toString());

  // Click the 'Generate Preview' button
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();

  const iframeCodeHigh = await basePage.getIframeCode();
  // Check that the width in the code is equal to the default maximum value =1020
  expect(iframeCodeHigh).toContain(`width="1020"`);
  // Wait for the preview to load
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();
  // Check that the width in the code is equal to the default maximum value =1020
  const widthHigh = await basePage.getIframeAttribute('width');
  expect(widthHigh).toBe("1020");
    
});