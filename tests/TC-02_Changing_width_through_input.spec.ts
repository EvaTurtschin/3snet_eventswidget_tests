import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-02 Изменение ширины через input', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  // Генерируем случайную ширину от 230 до 1020
  const randomWidth = Math.floor(Math.random() * (1020 - 230 + 1)) + 230;


  const widthInput = await page.locator('input[name="width"]');
  await widthInput.click();
  await widthInput.fill(randomWidth.toString());
  
  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();

  const iframeCode = await basePage.getIframeCode();
   
  expect(iframeCode).toContain(`width="${randomWidth}"`);
 
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();

  const width = await basePage.getIframeAttribute('width');
  expect(width).toBe(randomWidth.toString());
  
});