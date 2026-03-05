import { test, expect } from '@playwright/test';


test('TC-04 Проверка синхронизация slider и ввода значения (ширина)', async ({ page }) => {
  await page.goto('');

  const widthRange = page.locator('input[id="width-range"]');
  const widthInput = page.locator('input[name="width"]');

  // Задаем шаги для слайдера
  const min = 230;
  const max = 1020;
  const step = 10;

  // Проверка slider → input
  // Генерируем случайное значение на слайдере ширины
  const sliderValue = Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;

  // slider округляет значение -> приводим данные в соответствие с числовым значением
  await widthRange.focus();
  // Заполняем полученное от слайдера значение в поле ввода ширины
  await widthRange.fill(sliderValue.toString());  
  // Сверяем данные
  await expect(widthInput).toHaveValue(sliderValue.toString());

  // Проверка input → slider
  // Генерируем случайное значение в валидном диапазоне
  const inputValue = Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;
  // Вводим значение в поле ввода ширины
  await widthInput.fill(inputValue.toString());
  // Нажимаем 'Enter'
  await widthInput.press('Enter');

  // slider округляет значение -> приводим данные в соответствие с числовым значением
  const expectedSliderValue = Math.round(inputValue / step) * step;

  // Сверяем данные
  await expect(widthRange).toHaveValue(expectedSliderValue.toString());
  
});