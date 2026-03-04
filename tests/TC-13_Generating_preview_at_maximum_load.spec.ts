import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';


test('TC-13 Генерация превью при максимальной нагрузке < 2сек', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  const topicSelector = page.locator('div[data-select="Выбрать тематику"]');
  await topicSelector.click();

  const allTopics = page.locator(`//div[@class="checkselect" and .//option[text()="Выбрать тематику"]]//span[text()="Выбрать все"]`);
  await allTopics.click();
  //Закрываем выпадающий список
  await topicSelector.click();

  const countrySelector = page.locator('div[data-select="Все страны"]');
  await countrySelector.click();

  const allCountries = await page.locator('//div[@class="checkselect" and .//option[text()="Все страны"]]//span[text()="Выбрать все"]');
  await allCountries.click();
  //Закрываем выпадающий список
  await countrySelector.click();

  const widthInput = page.locator('input[name="width"]');
  await widthInput.click();
  await widthInput.fill('1020');

  const heightInput = page.locator('input[name="height"]');
  await heightInput.click();
  await heightInput.fill('720');

  await page.locator('#width-range').fill('1020');
  await page.locator('#height-range').fill('720');

  await page.locator(`//label[input[@value="purple"]]`).check();
  await page.locator(`//label[input[@value="blue"]]`).check();
  await page.locator(`//label[input[@value="turquoise"]]`).check();
  await page.locator(`//label[input[@value="green"]]`).check();

  const codeCopyBtn = page.locator('button[id="code-copy-button"]');
  await codeCopyBtn.click();

  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  
   // Измеряем время
  const start = Date.now();
  await basePage.generatePreviewWithRetry(generateBtn);
  const end = Date.now();
  
  const generationTime = (end - start) / 1000;
  expect(generationTime).toBeLessThan(2.0); // < 2 сек
  
  console.log(`⏱️ Generation time in TC-13: ${generationTime}s`);


})