import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';
import {loadTopics} from '@testData/csvReader';

test('TC-08 Checking topic selection', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');
  // Retrieve from CSV file the list of topics and their corresponding digital code-values
  const topics = loadTopics();
  // Randomly select a topic from the list
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  // Click on the collapsed topic list
  const topicSelector = page.locator('div[data-select="Выбрать тематику"]');
  await topicSelector.click();
  // Click on the checkbox of the selected topic
  const topicOption = page.locator(`//span[text()='${randomTopic.name}']`);
  await topicOption.click();
  // Press the "Generate Preview" button
  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();
  // Get the iframe code
  const iframeCode = await basePage.getIframeCode();
  // Check the data in the iframe code corresponding to the selected topic
  expect(iframeCode).toContain(`event_type=${randomTopic.code}`);
  // Wait for the preview to load
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();
  // Check the iframe code data for correspondence to the selected topic
  const src = await basePage.iframePreview.getAttribute('src');
  expect(src).toContain(`event_type=${randomTopic.code}`);
  // Output to the console information about the topic selected in this test
  console.log(`Selected topic: ${randomTopic.name}, expected code: ${randomTopic.code}`);
});