import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-03 Проверка невалидных значений ввода ширины превью - граничные значения', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  // Клик по полю ввода ширины
  const widthInput = await page.locator('input[name="width"]');
  await widthInput.click();

  // Генерируем случайную ширину от 0 до 229
  const randomWidthLow = Math.floor(Math.random() * 230); 
  // Вводим сгенерированное невалидное значение
  await widthInput.fill(randomWidthLow.toString());
  
  // Нажимаем кнопку 'Сгенерировать превью'
  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();
  
  // получаем данные кода iframe
  const iframeCodeLow = await basePage.getIframeCode();
  // Проверяем что ширина равна минимальному значению по дефолту =230
  expect(iframeCodeLow).toContain(`width="230"`);
  // Ждем загрузки превью
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();
  // Проверяем что ширина равна минимальному значению по дефолту =230
  const widthLow = await basePage.getIframeAttribute('width');
  expect(widthLow).toBe("230");

  // Обновляем страницу 
  await page.reload({ waitUntil: 'networkidle' }); 
  await expect(page.locator('input[name="width"]')).toBeVisible(); 
  await widthInput.click();

  // Генерируем случайную ширину от 1021 до 99999
  const randomWidthHigh = Math.floor(Math.random() * (99999 - 1021 + 1)) + 1021;
  // Вводим сгенерированное невалидное значение
  await widthInput.fill(randomWidthHigh.toString());

  // Нажимаем кнопку 'Сгенерировать превью'
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();

  const iframeCodeHigh = await basePage.getIframeCode();
  // Проверяем что ширина в коде равна максимальному значению по дефолту =1020
  expect(iframeCodeHigh).toContain(`width="1020"`);
  // Ждем загрузки превью
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();
  // Проверяем что ширина в коде равна максимальному значению по дефолту =1020
  const widthHigh = await basePage.getIframeAttribute('width');
  expect(widthHigh).toBe("1020");
    
});