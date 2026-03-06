import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';
import {loadTopics} from '@testData/csvReader';

test('TC-08 Проверка выбора тематики', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');
  // Забираем из файла csv список тем и соответствующие им цифровые код-значения
  const topics = loadTopics();
  // Случайным образом выбираем тематику из списка
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  // Клик на свернутый список тематик
  const topicSelector = page.locator('div[data-select="Выбрать тематику"]');
  await topicSelector.click();
  // Клик на чек-бокс выбранной тематики
  const topicOption = page.locator(`//span[text()='${randomTopic.name}']`);
  await topicOption.click();
  // Нажать кнопку "Сгенерировать превью"
  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();
  // Получаем код iframe
  const iframeCode = await basePage.getIframeCode();
  // Проверяем данные в коде iframe соответствующие выбранной тематике
  expect(iframeCode).toContain(`event_type=${randomTopic.code}`);
  // Ждем загрузки превью
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();
  // Проверяем данные кода iframe на соответствие выбранной тематике
  const src = await basePage.iframePreview.getAttribute('src');
  expect(src).toContain(`event_type=${randomTopic.code}`);
  // Выводим в консоль информацию о выбранной в данном тесте тематике
  console.log(`Selected topic: ${randomTopic.name}, expected code: ${randomTopic.code}`);
});