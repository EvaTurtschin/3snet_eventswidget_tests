import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-07 Проверка выбора страны', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');
  // Клик на свернутый список стран "Все страны"
  const countrySelector = page.locator('div[data-select="Все страны"]');
  await countrySelector.click();
  // Клик на чек-бокс "Выбрать все" в выпадающем списке
  const allCountries = await page.locator('//div[@class="checkselect" and .//option[text()="Все страны"]]//span[text()="Выбрать все"]');
  await allCountries.click();
  // Нажать кнопку "Сгенерировать превью"
  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();
  // Получаем код iframe
  const iframeCode = await basePage.getIframeCode();
  // Проверяем данные в коде iframe соответствующие event_country=0
  expect(iframeCode).toContain('event_country=on');
  // Ждем загрузки превью
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();
  // Проверяем данные превью
  await expect(basePage.iframePreview).toHaveAttribute('src', /event_country=/);

/* Ограничения

Выбор страны — автоматическая проверка сохранена, но доступен только вариант «Все страны».
В сгенерированном коде iframe вместо фактического значения страны отображается event_country=on.
Тест гарантирует, что виджет обрабатывает текущий выбор по умолчанию, но полная фильтрация по странам не автоматизирована, поскольку эта функция не реализована.
*/

})