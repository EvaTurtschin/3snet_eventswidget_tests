# 3snet Calendar Widget Automation

Автоматизация тестирования [страницы генерации iframe-кода для виджета календаря мероприятий.](https://dev.3snet.info/eventswidget/)


## 📚 Документация проекта

В репозитории присутствуют следующие артефакты:

- **Текст тестового задания** — исходное описание требований.
- **Test Cases** — перечень тест-кейсов с приоритетами и описанием шагов.
- **Bug Reports** — предусмотрено для зафиксированных дефектов (если будут выявлены в ходе тестирования).

Тест-кейсы и баг-репорты оформлены отдельно от автоматизированных тестов и отражают полный объём анализа функциональности.

## 📂 Структура проекта

>3snet_eventswidget_tests/                                           
>│                                                
>├─ documentation                                         
>│    ├─ project task.md                                                                       
>│    ├─ bug-reports.md                                                                       
>│    └─ Test-Cases                                                                
>│       ├─ TC-01_.md                                
>│       ├─ TC-02_.md                             
>│       ├─                                              
>│       └─...                                   
>│                                                
>├─ Pages/ # Page Object классы                                                
>│    └─ BasePage.ts                                    
>│                                                 
>├─ TestData/ # Тестовые данные и фикстуры                        
>│    ├─ csvReader.ts                                                                       
>│    └─ topics.csv                                                                
>│                                                
>├─ tests/ # Тесты (Playwright)                                     
>│    ├─ TC-01_.spec.ts                                
>│    ├─ TC-02_.spec.ts                             
>│    ├─                                         
>│    └─...                                  
>│                                                   
>├─ server/                    ← НОВОЕ! Веб-интерфейс управления тестами
>│    └─ server.js              Сервер + UI + парсер JSON отчетов Playwright
>│                                              
>├─ public/                    ← НОВОЕ! HTML/JS интерфейс
>│    ├─ index.html             Главная страница с кнопкой "Запуск Теста"             
>│    └─ styles.css                                  
>│                                                   
>├─ test-history.json          ← НОВОЕ! Постоянная история запусков (50 записей)>
>│                                                                         
>├─ fixtures                                                             
>│    └─pomFixtures.ts                                                              
>├─ .gitignore                                                             
>├─ playwright.config.ts # Конфигурация Playwright                                                            
>├─ package.json                                                         
>├─ tsconfig.json                                                            
>└─ README.md                                                                                 

- **Тесты** в `tests/` — отдельный файл на каждый тест-кейс.
- **Page Object** реализован в `BasePage.ts`, содержит локаторы и базовые методы для взаимодействия с элементами страницы.
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

## 🚀 Запуск тестов

-  Запуск всех тестов:

```bash
npx playwright test
```

-  Запуск конкретного теста:

```bash
npx playwright test tests/TC-04_Synchronizing_slider_and_input_widths.spec.ts
```

## 🚀 Запуск тестов с отчетом в консоли:

```bash
npx playwright test --reporter=list
```

- Запустить веб-интерфейс

    - Вариант A : Прямой запуск (рекомендуется для разработки)


```bash
node server/server.js
```
- 
    - Вариант B: Через npm скрипты (удобно для продакшена)

```bash
npm run app
```

  - Open in browser:  ***[Browser Link](http://localhost:3000)***

- #### *Функции веб-интерфейса:*
```bash
Кнопка "Запуск Теста" → результаты в таблице + история запусков
```

## 📝 Техническое описание проекта

- Фреймворк: Playwright + TypeScript

- Архитектура: Page Object Model (POM) с retry logic

- CI/CD: Возможность интеграции через GitHub Actions

- Поддерживаемая структура тестов: каждый тест полностью самодостаточный и может выполняться отдельно.

- Data-Driven: расширяемая папка TestData, готовая к работе с CSV

- Умные ожидания: Пользовательские тайм-ауты + утилиты waitFor()

- Рандомизированные тестовые данные для стабильности регрессионного анализа

- Path Aliases (@pages/BasePage)

- Веб-интерфейс Test UI

   - **server/server.js + public/index.html** — полнофункциональный веб-интерфейс:

   - **Кнопка "Запуск Теста"** → `npx playwright test --reporter=html,json`
   - **Детальная таблица** → парсинг `playwright-report.json` (TC-01, TC-02... статус/время)  
   - **История запусков** → `test-history.json` (дата + результат + Подробно)
   - **HTML отчет** → `/report/index.html` (официальный Playwright)
   - **Постоянное сохранение** → F5/перезапуск сервера = история НЕ теряется
   - **Логика:** Запуск → Детали → Закрыть → Новая строка в истории (сверху)

- Покрытие автоматизации

     - Автоматизированы тест-кейсы, покрывающие:
         - генерацию iframe
         - валидацию размеров (min/max) Значения генерируются рандомно в пределах ограничений
         - синхронизацию slider ↔ input
         - граничные значения
         - проверка невозможности ввода
         - отмены
         - переопределение логики
         - отсутствие ошибок в консоли при успешной генерации
         - скорость генерации при максимальном вводе данных (в идеале нужны вводные)

     - Часть тест-кейсов исключена из автоматизации:
         - дублирующие проверки логики написания кода (не добавляют технической ценности заданию)
         - сценарии, выходящие за рамки тестового задания (Out of Scope)

    Причины исключения явно указаны в документе с тест-кейсами.


## ✅ Критерии оценки

- Все тесты запускаются и проходят без ошибок.

- Тесты покрывают функциональность генерации iframe, валидацию размеров, синхронизацию элементов.

- Проект самодостаточный: инструкции в README позволяют запустить его на любой машине с Node.js.

- Архитектура соответствует POM, код читаемый и структурированный.

- Веб-интерфейс Test UI — кнопка запуска → таблица результатов + история

- Парсинг JSON отчетов — точное соответствие Playwright (учитывает retries/workers)

- Постоянная история — сохраняется между перезапусками (test-history.json)

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

- Для теста выбора тематики (TC-08) используется CSV-файл topics.csv с парами «название темы — код события» для дата-драйвен проверки.

