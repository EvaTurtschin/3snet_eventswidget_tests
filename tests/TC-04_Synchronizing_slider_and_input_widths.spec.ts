import { test, expect } from '@playwright/test';
import BasePage from './Pages/BasePage';

test('TC-04 Синхронизация slider и input (ширина)', async ({ page }) => {
  await page.goto('');

  const widthRange = page.locator('input[id="width-range"]');
  const widthInput = page.locator('input[name="width"]');

  const min = 230;
  const max = 1020;
  const step = 10;

  // ===== Проверка slider → input =====
  const sliderValue = Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;

  // slider округляет значение
  await widthRange.evaluate((el, value) => {
    (el as HTMLInputElement).value = value.toString();
    el.dispatchEvent(new Event('input'));
    el.dispatchEvent(new Event('change'));
  }, sliderValue);

  await expect(widthInput).toHaveValue(sliderValue.toString());

  // ===== Проверка input → slider =====
  const inputValue = Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;

  await widthInput.fill(inputValue.toString());
  await widthInput.press('Enter');

  // slider округляет значение
  const expectedSliderValue = Math.round(inputValue / step) * step;

  await expect(widthRange).toHaveValue(expectedSliderValue.toString());

  await expect(widthInput).toHaveValue(expectedSliderValue.toString());
});