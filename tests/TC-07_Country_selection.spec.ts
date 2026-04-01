import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-07 Country selection check', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');
  // Click on the collapsed country list "All countries"
  const countrySelector = page.locator('div[data-select="Все страны"]');
  await countrySelector.click();
  // Click on the checkbox "Select all" in the dropdown list
  const allCountries = page.locator('//div[@class="checkselect" and @data-select="Все страны"]//span[text()="Выбрать все"]'); 
  await allCountries.click();
  // Press the "Generate preview" button
  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();
  // Get the iframe code
  const iframeCode = await basePage.getIframeCode();
  // Check that the iframe code data corresponds to event_country=0
  expect(iframeCode).toContain('event_country=on');
  // Wait for preview to load
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();
  // Check preview data
  await expect(basePage.iframePreview).toHaveAttribute('src', /event_country=/);

/* Restrictions

Country selection — automatic check is saved, but only the "All countries" option is available.
In the generated iframe code, instead of the actual country value, event_country=on is displayed.
The test ensures that the widget handles the current default selection, but full country filtering is not automated, as this feature is not implemented.
*/

})