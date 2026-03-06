import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-02 Проверка изменение ширины превью через input', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  // Генерируем случайную ширину от 230 до 1020
  const randomWidth = Math.floor(Math.random() * (1020 - 230 + 1)) + 230;

  // Клик на поле ввода ширины
  const widthInput = await page.locator('input[name="width"]');
  await widthInput.click();
  await widthInput.fill(randomWidth.toString());
  
  // Нажимаем кнопку 'Сгенерировать превью'
  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();
  // Получаем код iframe
  const iframeCode = await basePage.getIframeCode();
  // Проверяем данные в коде iframe на соответствие введенному значению
  expect(iframeCode).toContain(`width="${randomWidth}"`);
  // Ждем загрузки превью
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();
  // Проверяем данные в прьевью
  const width = await basePage.getIframeAttribute('width');
  expect(width).toBe(randomWidth.toString());
  
});