import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-12 Last selected color theme overwrites previous selections', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

// colorThemes 'purple', 'green', 'blue' , 'turquoise'

await page.locator(`//label[input[@value="purple"]]`).check();

await page.locator(`//label[input[@value="blue"]]`).check();

await page.locator(`//label[input[@value="turquoise"]]`).check();

await page.locator(`//label[input[@value="green"]]`).check();

const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
await basePage.generatePreviewWithRetry(generateBtn);

await basePage.checkCodeTextareaVisible();

const iframeCode = await basePage.getIframeCode();
   
expect(iframeCode).toContain('theme=green');

await basePage.checkPreviewVisible();
await basePage.waitForIframeAttached();

await expect(basePage.iframePreview).toHaveAttribute('src', /theme=green/);

})