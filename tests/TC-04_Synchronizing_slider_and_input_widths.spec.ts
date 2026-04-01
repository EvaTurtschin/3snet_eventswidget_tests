import { test, expect } from '@playwright/test';


test('TC-04 Checking synchronization of slider and input value (width)', async ({ page }) => {
  await page.goto('');

  const widthRange = page.locator('input[id="width-range"]');
  const widthInput = page.locator('input[name="width"]');

  // Set steps for the slider
  const min = 230;
  const max = 1020;
  const step = 10;

  // Check slider → input
  // Generate a random value on the width slider
  const sliderValue = Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;

  // slider rounds the value -> bring the data in line with the numerical value
  await widthRange.focus();
  // Fill the value obtained from the slider into the width input field
  await widthRange.fill(sliderValue.toString());  
  // Check the input field data for correspondence to the width slider value
  await expect(widthInput).toHaveValue(sliderValue.toString());

  // Check input → slider
  // Generate a random value in the valid range
  const inputValue = Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;
  // Enter the value in the width input field
  await widthInput.fill(inputValue.toString());
  // Press 'Enter'
  await widthInput.press('Enter');

  // slider rounds the value -> bring the data in line with the numerical value
  const expectedSliderValue = Math.round(inputValue / step) * step;

  // Check the slider data for correspondence to the width input field
  await expect(widthRange).toHaveValue(expectedSliderValue.toString());
  
});