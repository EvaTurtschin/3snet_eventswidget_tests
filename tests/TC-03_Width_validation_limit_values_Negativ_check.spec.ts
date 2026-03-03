import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-03 Граничные значения ширины - негативные проверки', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  const widthInput = await page.locator('input[name="width"]');
  
  await widthInput.click();

    // Генерируем случайную ширину от 0 до 229
  const randomWidthLow = Math.floor(Math.random() * 230); 
  await widthInput.fill(randomWidthLow.toString());

  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();

  const iframeCodeLow = await basePage.getIframeCode();
   
  expect(iframeCodeLow).toContain(`width="230"`);
 
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();

  const widthLow = await basePage.getIframeAttribute('width');
  expect(widthLow).toBe("230");

  // Обновляем страницу 
  await page.reload({ waitUntil: 'networkidle' }); 
  await expect(page.locator('input[name="width"]')).toBeVisible(); 
  await widthInput.click();

   // Генерируем случайную ширину от 1021 до 99999
  const randomWidthHigh = Math.floor(Math.random() * (99999 - 1021 + 1)) + 1021;

  await widthInput.fill(randomWidthHigh.toString());

  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();

  const iframeCodeHigh = await basePage.getIframeCode();
   
  expect(iframeCodeHigh).toContain(`width="1020"`);
 
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();

  const widthHigh = await basePage.getIframeAttribute('width');
  expect(widthHigh).toBe("1020");
    
});