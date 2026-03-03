import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';


test('TC-01 Генерация iframe с дефолтными значениями', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');
  
  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();

  const iframeCode = await basePage.getIframeCode();
   
  expect(iframeCode).toContain('theme=turquoise');
  expect(iframeCode).toContain('width="230"');
  expect(iframeCode).toContain('height="240"');
  expect(iframeCode).toContain('frameborder="0"');

  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();

  await expect(basePage.iframePreview).toHaveAttribute('src', /theme=turquoise/);
  await expect(basePage.iframePreview).toHaveAttribute('width', '230');
  await expect(basePage.iframePreview).toHaveAttribute('height', '240');
  await expect(basePage.iframePreview).toHaveAttribute('frameborder', '0');

});