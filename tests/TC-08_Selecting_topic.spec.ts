import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';
import {loadTopics} from '@testData/csvReader';

test('TC-08 Проверка выбора тематики', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  const topics = loadTopics();
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  const topicSelector = page.locator('div[data-select="Выбрать тематику"]');
  await topicSelector.click();

  const topicOption = page.locator(`//span[text()='${randomTopic.name}']`);
  await topicOption.click();

  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();

  const iframeCode = await basePage.getIframeCode();
  expect(iframeCode).toContain(`event_type=${randomTopic.code}`);

  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();

  const src = await basePage.iframePreview.getAttribute('src');
  expect(src).toContain(`event_type=${randomTopic.code}`);

  console.log(`Selected topic: ${randomTopic.name}, expected code: ${randomTopic.code}`);
});