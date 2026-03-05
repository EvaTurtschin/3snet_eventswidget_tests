
import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-16 После активации radio-button "на всю ширину контейнера" невозможен ввод значений в поле ширины блока"', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  await page.locator('.radio__square').first().click();

  const widthInput = page.locator('input[name="width"]');
  await expect(widthInput).toBeDisabled();

})