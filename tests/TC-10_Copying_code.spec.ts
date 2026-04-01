import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-10 Checking the "Copy code" button', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  const codeCopyBtn = page.locator('button[id="code-copy-button"]');
  await codeCopyBtn.click();

  await expect(codeCopyBtn).toHaveText(/Скопировано/);

})