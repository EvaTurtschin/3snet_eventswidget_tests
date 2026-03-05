import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';
import {loadTopics} from '@testData/csvReader';


test('TC-14 Проверка генерации превью с валидными данными без console ошибок', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  const topics = loadTopics();
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  const topicSelector = page.locator('div[data-select="Выбрать тематику"]');
  await topicSelector.click();

  const topicOption = page.locator(`//span[text()='${randomTopic.name}']`);
  await topicOption.click();
  //Закрываем выпадающий список
  await topicSelector.click();

  const countrySelector = page.locator('div[data-select="Все страны"]');
  await countrySelector.click();

  const allCountries = await page.locator('//div[@class="checkselect" and .//option[text()="Все страны"]]//span[text()="Выбрать все"]');
  await allCountries.click();
  //Закрываем выпадающий список
  await countrySelector.click();

  //Генерируем случайную ширину от 230 до 1020
  const randomWidth = Math.floor(Math.random() * (1020 - 230 + 1)) + 230;

  const widthInput = await page.locator('input[name="width"]');
  await widthInput.click();
  await widthInput.fill(randomWidth.toString());

  //Генерируем случайную высоту от 240 до 720
  const randomHeight = Math.floor(Math.random() * (720 - 240 + 1)) + 240;
  const heightInput = page.locator('input[name="height"]');
  await heightInput.click();
  await heightInput.fill(randomHeight.toString());

  // Список цветвых тем
  const colorThemes = ['purple', 'green', 'blue', 'turquoise'];

  // Генерируем случайную тему
  const randomColorTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)];
  console.log(`Selected theme in TC-14: ${randomColorTheme}`);
  await page.locator(`//label[input[@value="${randomColorTheme}"]]`).check();

  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });

  // Проверяем отсутствие ошибок
  await basePage.generatePreviewSafely(generateBtn);

  
})