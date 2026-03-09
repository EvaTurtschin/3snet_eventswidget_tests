import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';


test('TC-01 Генерация кода iframe и превью с дефолтными значениями', async ({ page }) => {
    const basePage = new BasePage(page);
    const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
    let iframeCode: string;

  await test.step('Открываем страницу https://dev.3snet.info/eventswidget/', async () => {
    await page.goto('');
  });
  
  // Не изменяя настройки, нажимаем на кнопку "Сгенерировать превью"
  await test.step('Не изменяя настройки, нажимаем на кнопку "Сгенерировать превью"', async () => {
    await basePage.generatePreviewWithRetry(generateBtn);
  });

  await test.step('Ожидаем генерацию кода в iframe', async () => {
    await basePage.checkCodeTextareaVisible();
  });

  await test.step('Получаем код iframe', async () => {
  iframeCode = await basePage.getIframeCode();
  });

 // Проверяем данные кода iframe на сответствие дефолтным значениям
  await test.step('Проверяем значение цветовой темы по дефолту в коде iframe', async () => {
  expect(iframeCode).toContain('theme=turquoise');
  });
  await test.step('Проверяем значение ширины по дефолту в коде iframe', async () => {
  expect(iframeCode).toContain('width="230"');
  });
  await test.step('Проверяем значение высоты по дефолту в коде iframe', async () => {
  expect(iframeCode).toContain('height="240"');
  });
  await test.step('Проверяем значение темы по дефолту в коде iframe', async () => {
  expect(iframeCode).toContain('event_type=');
  });
  await test.step('Проверяем значение страны по дефолту в коде iframe', async () => {
  expect(iframeCode).toContain('event_country=');
  });


  // Ждем генерации превью
  await test.step('Ждем загррузки превью', async () => {
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();
  });

  // Проверяем данные превью
  await test.step('Проверяем значение цветовой темы по дефолту в превью', async () => {
    await expect(basePage.iframePreview).toHaveAttribute('src', /theme=turquoise/);
  });
  await test.step('Проверяем значение ширины по дефолту в превью', async () => {
     await expect(basePage.iframePreview).toHaveAttribute('width', '230');
  });
  await test.step('Проверяем значение высоты по дефолту в превью', async () => {
     await expect(basePage.iframePreview).toHaveAttribute('height', '240');
  });
  await test.step('Проверяем значение темы по дефолту в превью', async () => {
     await expect(basePage.iframePreview).toHaveAttribute('src', /event_type=/);
  });
  await test.step('Проверяем значение страны по дефолту в превью', async () => {
     await expect(basePage.iframePreview).toHaveAttribute('src', /event_country=/);
  });

});