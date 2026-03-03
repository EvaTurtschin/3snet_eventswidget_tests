import { test, expect } from '@playwright/test';
import BasePage from './Pages/BasePage';

test('TC-08 Выбор тематики', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  const topicSelector = page.locator('div[data-select="Выбрать тематику"]');
  await topicSelector.click();

  // Список тематик с соответствием кода
  const topics: Record<string, string> = {
    'Affiliate': '10958',
    'Blockchain': '10963',
    'Development': '10961',
    'Igaming': '10964',
    'Internet Marketing': '10960',
    'SEO': '10959',
    'Финтех': '10962'
  };

  // Берем случайную тему
  const topicNames = Object.keys(topics);
  const randomTopic = topicNames[Math.floor(Math.random() * topicNames.length)];
  const eventTypeCode = topics[randomTopic];

  const topicOption = page.locator(`//span[text()='${randomTopic}']`);
  await topicOption.click();

  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();

  const iframeCode = await basePage.getIframeCode();
  expect(iframeCode).toContain(`event_type=${eventTypeCode}`);

  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();

  const src = await basePage.iframePreview.getAttribute('src');
  expect(src).toContain(`event_type=${eventTypeCode}`);

  console.log(`Selected topic: ${randomTopic}, expected code: ${eventTypeCode}`);

})