import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-06 Выбор цветовой темы', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

// Список тем
const colorThemes = ['purple', 'green', 'blue'];

// Берем случайную тему
const randomColorTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)];

console.log(`Selected theme in TC-06: ${randomColorTheme}`);

await page.locator(`//label[input[@value="${randomColorTheme}"]]`).check();

const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
await basePage.generatePreviewWithRetry(generateBtn);

await basePage.checkCodeTextareaVisible();

const iframeCode = await basePage.getIframeCode();
   
expect(iframeCode).toContain(randomColorTheme);

await basePage.checkPreviewVisible();
await basePage.waitForIframeAttached();

const src = await basePage.iframePreview.getAttribute('src');
expect(src).toContain(randomColorTheme);

})