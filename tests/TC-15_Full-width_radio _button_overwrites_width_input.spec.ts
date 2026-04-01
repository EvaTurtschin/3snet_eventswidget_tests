import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-15 Activated "full-width" radio button overwrites previous width input"', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  // Generate a random width from 230 to 1020
  const randomWidth = Math.floor(Math.random() * (1020 - 230 + 1)) + 230;

  const widthInput = await page.locator('input[name="width"]');
  await widthInput.click();
  await widthInput.fill(randomWidth.toString());

  await page.locator('.radio__square').first().click();

  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();

  const iframeCode = await basePage.getIframeCode();
   
  expect(iframeCode).toContain(`width="100%"`);
 
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();

  const widthLow = await basePage.getIframeAttribute('width');
  expect(widthLow).toBe("100%");

});