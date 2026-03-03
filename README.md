# 3snet Calendar Widget Automation

Автоматизация тестирования [страницы генерации iframe-кода для виджета календаря мероприятий.](https://dev.3snet.info/eventswidget/)

## [🧪 Test Report](https://evaturtschin.github.io/3snet_eventswidget_tests/)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](playwright-report/index.html)

## 📚 Документация проекта

В репозитории присутствуют следующие артефакты:

- **Текст тестового задания** — исходное описание требований.
- **Test Cases** — перечень тест-кейсов с приоритетами и описанием шагов.
- **Bug Reports** — предусмотрено для зафиксированных дефектов (если выявлены в ходе тестирования).

Тест-кейсы и баг-репорты оформлены отдельно от автоматизированных тестов и отражают полный объём анализа функциональности.

## 📂 Структура проекта

>3snet_eventswidget_tests/                           
>│                            
>├─ Pages/ # Page Object классы                  
>│ └─ BasePage.ts                             
>│                             
>├─ TestData/ # Тестовые данные и фикстуры                          
>│                           
>├─ tests/ # Тесты (Playwright)                              
>│ ├─ TC-01_.spec.ts                                
>│ ├─ TC-02_.spec.ts                             
>│ └─ ...                                
>│                                              
>├─ playwright.config.ts # Конфигурация Playwright                                      
>├─ package.json                                    
>└─ README.md                                                           

- **Page Object** реализован в `BasePage.ts`, содержит локаторы и базовые методы для взаимодействия с элементами страницы.
- **Тесты** в `tests/` — отдельный файл на каждый тест-кейс.
- **TestData/** содержит все значения и фикстуры, используемые в тестах.

## ⚙️ Установка

1. Клонируйте репозиторий:

```bash
git clone <URL_REPO>
cd 3snet_eventswidget_tests
```

2. Установите зависимости:

```bash
npm install
```

3. Убедитесь, что Playwright браузеры установлены:

```bash
npx playwright install
```

## 🧪 Запуск тестов

-  Запуск всех тестов:

```bash
npx playwright test
```

-  Запуск конкретного теста:

```bash
npx playwright test tests/TC-04_Synchronizing_slider_and_input_widths.spec.ts
```

-  Запуск тестов с отчетом в консоли:

```bash
npx playwright test --reporter=list
```

## 📝 Техническое описание проекта

- Фреймворк: Playwright + TypeScript

- Архитектура: Page Object Model (POM)

- CI/CD: Возможность интеграции через GitHub Actions

- Структура тестов: каждый тест полностью самодостаточный и может выполняться отдельно.

- Покрытие автоматизации

     - Автоматизированы тест-кейсы, покрывающие:
         - генерацию iframe
         - валидацию размеров (min/max) Значения генерируются рандомно в пределах ограничений
         - синхронизацию slider ↔ input
         - граничные значения

     - Часть тест-кейсов исключена из автоматизации:
         - дублирующие проверки логики (не добавляют технической ценности заданию)
         - сценарии, выходящие за рамки тестового задания (Out of Scope)

    Причины исключения явно указаны в документе с тест-кейсами.


## ✅ Критерии оценки

- Все тесты запускаются и проходят без ошибок.

- Тесты покрывают функциональность генерации iframe, валидацию размеров, синхронизацию элементов.

- Проект самодостаточный: инструкции в README позволяют запустить его на любой машине с Node.js.

- Архитектура соответствует POM, код читаемый и структурированный.

## 🧪 Пример автоматизированного теста

Ниже пример теста на синхронизацию slider и input (установка ширины виджета календаря мероприятий):

```ts
test('TC-04 Синхронизация slider и input (ширина)', async ({ page }) => {
await page.goto('');

  const widthRange = page.locator('input[id="width-range"]');
  const widthInput = page.locator('input[name="width"]');

  const min = 230;
  const max = 1020;
  const step = 10;

  // ===== Проверка slider → input =====
  const sliderValue = Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;

  // slider округляет значение
  await widthRange.evaluate((el, value) => {
    (el as HTMLInputElement).value = value.toString();
    el.dispatchEvent(new Event('input'));
    el.dispatchEvent(new Event('change'));
  }, sliderValue);

  await expect(widthInput).toHaveValue(sliderValue.toString());

  // ===== Проверка input → slider =====
  const inputValue = Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;

  await widthInput.fill(inputValue.toString());
  await widthInput.press('Enter');

  // slider округляет значение
  const expectedSliderValue = Math.round(inputValue / step) * step;

  await expect(widthRange).toHaveValue(expectedSliderValue.toString());

  await expect(widthInput).toHaveValue(expectedSliderValue.toString());
});
```
## 📌 Примечания

- Тесты не требуют ручной перезагрузки страницы между шагами — все проверки происходят динамически.

- Значения слайдера корректно округляются по step и проверяются через Playwright expect.toHaveValue.

- Рандомизация значений используется для проверки стабильности синхронизации элементов.

- Все тесты используют рандомные значения для ширины, цветовой темы и тематик.

- При каждом запуске теста в консоль выводятся использованные значения (например, ширина, выбранная тема, код события), чтобы можно было точно видеть, с какими данными проходил тест. Это упрощает отладку и воспроизведение теста.

