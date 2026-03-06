import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-06 Проверка выбора цветовой темы для генерации превью', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

// Список цветовых тем для выбора не дефолтной
const colorThemes = ['purple', 'green', 'blue'];

// Генерируем случайный выбор цветовой темы из списка недефолтных
const randomColorTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)];
// Выводим в консоль информацию о выбранной в этой проверке цветовой теме
console.log(`Selected theme in TC-06: ${randomColorTheme}`);
// Активируем radio-button выбранной цветовой темы
await page.locator(`//label[input[@value="${randomColorTheme}"]]`).check();
// Нажать кнопку "Сгенерировать превью"
const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
await basePage.generatePreviewWithRetry(generateBtn);

await basePage.checkCodeTextareaVisible();
 // Получаем код iframe
const iframeCode = await basePage.getIframeCode();
 //  Проверяем цветовую тему прописанную в коде iframe
expect(iframeCode).toContain(randomColorTheme);
  // Ждем загрузки превью
await basePage.checkPreviewVisible();
await basePage.waitForIframeAttached();
// Проверяем цветовую тему в превью
const src = await basePage.iframePreview.getAttribute('src');
expect(src).toContain(randomColorTheme);

})