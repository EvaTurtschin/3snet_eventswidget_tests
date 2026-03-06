import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';


test('TC-01 Генерация кода iframe и превью с дефолтными значениями', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');
  
  // Не изменяя настройки, нажимаем на кнопку "Сгенерировать превью"
  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();

  // Получаем данные кода iframe
  const iframeCode = await basePage.getIframeCode();
  // Проверяем данные кода iframe на сответствие дефолтным значениям
  expect(iframeCode).toContain('theme=turquoise');
  expect(iframeCode).toContain('width="230"');
  expect(iframeCode).toContain('height="240"');
  expect(iframeCode).toContain('frameborder="0"');

  // Ждем генерации превью
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();
  // Проверяем данные превью
  await expect(basePage.iframePreview).toHaveAttribute('src', /theme=turquoise/);
  await expect(basePage.iframePreview).toHaveAttribute('width', '230');
  await expect(basePage.iframePreview).toHaveAttribute('height', '240');
  await expect(basePage.iframePreview).toHaveAttribute('frameborder', '0');

});