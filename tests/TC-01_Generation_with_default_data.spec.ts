import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';


test('TC-01 Generation of iframe code and preview with default values', async ({ page }) => {
  const basePage = new BasePage(page);
  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  let iframeCode: string;

  await test.step('Open the page https://dev.3snet.info/eventswidget/', async () => {
  await page.goto('');
  });
  
  // Without changing settings, click the "Generate Preview" button
  await test.step('Without changing settings, click the "Generate Preview" button', async () => {
  await basePage.generatePreviewWithRetry(generateBtn);
  });

  await test.step('Wait for iframe code generation', async () => {
  await basePage.checkCodeTextareaVisible();
  });

  await test.step('Get the iframe code', async () => {
  iframeCode = await basePage.getIframeCode();
  });

 // Check that the iframe code matches default values
  await test.step('Check the default color theme value in the iframe code', async () => {
  expect(iframeCode).toContain('theme=turquoise');
  });
  await test.step('Check the default width value in the iframe code', async () => {
  expect(iframeCode).toContain('width="230"');
  });
  await test.step('Check the default height value in the iframe code', async () => {
  expect(iframeCode).toContain('height="240"');
  });
  await test.step('Check the default event type value in the iframe code', async () => {
  expect(iframeCode).toContain('event_type=');
  });
  await test.step('Check the default country value in the iframe code', async () => {
  expect(iframeCode).toContain('event_country=');
  });


  // Wait for preview generation
  await test.step('Wait for preview loading', async () => {
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();
  });

  // Check preview data
  await test.step('Check the default color theme value in the preview', async () => {
  await expect(basePage.iframePreview).toHaveAttribute('src', /theme=turquoise/);
  });
  await test.step('Check the default width value in the preview', async () => {
   await expect(basePage.iframePreview).toHaveAttribute('width', '230');
  });
  await test.step('Check the default height value in the preview', async () => {
   await expect(basePage.iframePreview).toHaveAttribute('height', '240');
  });
  await test.step('Check the default event type value in the preview', async () => {
   await expect(basePage.iframePreview).toHaveAttribute('src', /event_type=/);
  });
  await test.step('Check the default country value in the preview', async () => {
   await expect(basePage.iframePreview).toHaveAttribute('src', /event_country=/);
  });

});