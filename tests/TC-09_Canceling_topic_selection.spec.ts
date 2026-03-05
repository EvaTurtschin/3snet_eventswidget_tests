import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-09 Проверка функции отмены выбора тематики', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  const topicSelector = page.locator('div[data-select="Выбрать тематику"]');
  await topicSelector.click();

  const topicOption = page.locator(`//span[text()='Igaming']`);
  await topicOption.click();

  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();

  const iframeCode = await basePage.getIframeCode();
  expect(iframeCode).toContain('event_type=10964');

  const cancelBtn = page.locator('//div[contains(@class, "active") and @data-name="type"]');

  await cancelBtn.click();

  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();

  const newIframeCode = await basePage.getIframeCode();
  expect(newIframeCode).toContain('event_type=');


})