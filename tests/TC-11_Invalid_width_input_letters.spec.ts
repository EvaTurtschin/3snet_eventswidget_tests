import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';


test('TC-11 Check invalid width input values (letters)', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  const widthInput = page.locator('input[name="width"]');
  await widthInput.click();

  await widthInput.fill('oiuzcftz');
    
  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();

  const iframeCode = await basePage.getIframeCode();
   
  expect(iframeCode).toContain('width="230"');
 
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();

  await expect(basePage.iframePreview).toHaveAttribute('width', '230');
  
});