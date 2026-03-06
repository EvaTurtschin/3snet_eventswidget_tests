import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-05 Проверка работы radio-button "на всю ширину контейнера"', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  // Активировать radio button "На всю ширину контейнера"
  await page.locator('.radio__square').first().click();

  // Нажать кнопку "Сгенерировать превью"
  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);
  // Ждем загрузки кода iframe
  await basePage.checkCodeTextareaVisible();

  const iframeCode = await basePage.getIframeCode();
   // Проверяем данные - В src обновлён параметр width="100%"
  expect(iframeCode).toContain(`width="100%"`);
  // Ждем загрузки превью
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();
  // Проверяем данные ширины 100%
  const widthLow = await basePage.getIframeAttribute('width');
  expect(widthLow).toBe("100%");

});