
import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-16 After activating the "full width of container" radio button, it is impossible to enter values in the block width field"', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  await page.locator('.radio__square').first().click();

  const widthInput = page.locator('input[name="width"]');
  await expect(widthInput).toBeDisabled();

})