import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-05 Опция "на всю ширину контейнера"', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

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