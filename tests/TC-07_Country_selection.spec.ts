import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-07 Выбор страны', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  const countrySelector = page.locator('div[data-select="Все страны"]');
  await countrySelector.click();

  const allCountries = await page.locator('//div[@class="checkselect" and .//option[text()="Все страны"]]//span[text()="Выбрать все"]');
  await allCountries.click();
  
  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();

  const iframeCode = await basePage.getIframeCode();
   
  expect(iframeCode).toContain('event_country=on');

  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();
  
  await expect(basePage.iframePreview).toHaveAttribute('src', /event_country=/);

/* Ограничения

Выбор страны — автоматическая проверка сохранена, но доступен только вариант «Все страны».
В сгенерированном коде iframe вместо фактического значения страны отображается event_country=on.
Тест гарантирует, что виджет обрабатывает текущий выбор по умолчанию, но полная фильтрация по странам не автоматизирована, поскольку эта функция не реализована.
*/

})