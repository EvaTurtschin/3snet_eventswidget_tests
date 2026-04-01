# 3snet Calendar Widget Automation

Automation testing of the [iframe code generation page for the event calendar widget.](https://dev.3snet.info/eventswidget/)


## 📚 Project Documentation

The repository contains the following artifacts:

- **Project Task Text** — original description of requirements.
- **Test Cases** — list of test cases with priorities and step descriptions.
- **Bug Reports** — intended for recorded defects (if any are found during testing).

Test cases and bug reports are maintained separately from automated tests and reflect a full analysis of functionality.

## 📂 Project Structure

>3snet_eventswidget_tests/                                           
>│                                                
>├─ documentation                                         
>│    ├─ project task.md                                                                       
>│    ├─ bug-reports.md                                                                     
>│    └─ Test-Cases                                                                                        
>│       ├─ TC-01_.md                                                                           
>│       └─...                                                           
>│                                                
>├─ Pages/ # Page Object Classes                                                
>│    └─ BasePage.ts                                    
>│                                                 
>├─ TestData/ # Test data and fixtures                        
>│    ├─ csvReader.ts                                                                       
>│    └─ topics.csv                                                                
>│                                                
>├─ tests/ # Tests (Playwright)                                     
>│    ├─ TC-01_.spec.ts                                
>│    ├─ TC-02_.spec.ts                             
>│    ├─                                         
>│    └─...                                  
>│                                                   
>├─ server/                    ← NEW! Test management web interface                                    
>│    └─ server.js              Server + UI + Playwright JSON report parser                            
>│                                              
>├─ public/                    ← NEW! HTML/JS interface                             
>│    └─ index.html             Main page with "Run Test" button                                      
>│                                                                                              
>├─ test-history.json          ← NEW! Persistent run history (50 entries)>                                  
>│                                                                         
>├─ fixtures                                                             
>│    └─pomFixtures.ts                                                              
>├─ .gitignore                                                             
>├─ playwright.config.ts # Playwright configuration                                                            
>├─ package.json                                                         
>├─ tsconfig.json                                                            
>└─ README.md                                                                                 

- **Tests** in `tests/` — separate file for each test case.
- **Page Object** is implemented in `BasePage.ts`, containing locators and base methods for interacting with page elements.
- **TestData/** contains all values and fixtures used in the tests.

## ⚙️ Installation

1. Clone the repository:

```bash
git clone <URL_REPO>
cd 3snet_eventswidget_tests
```

2. Install dependencies:

```bash
npm install
```

3. Ensure Playwright browsers are installed:

```bash
npx playwright install
```

## 🚀 Running Tests

-  Running all tests:

```bash
npx playwright test
```

-  Running a specific test:

```bash
npx playwright test tests/TC-04_Synchronizing_slider_and_input_widths.spec.ts
```

## 🚀 Running Tests with Report in Console:

```bash
npx playwright test --reporter=list
```

- Run the web interface

    - Variant A : Direct launch (recommended for development)


```bash
node server/server.js
```
- 
    - Variant B: Through npm scripts (convenient for production)

```bash
npm run app
```

## 🌐 Open in browser:  ***[Browser Link](http://localhost:3000)***

- #### *Web Interface Features:*
```bash
"Run Test" button → results in a table + run history
```

## 📝 Technical Description of the Project

- Framework: Playwright + TypeScript

- Architecture: Page Object Model (POM) with retry logic.

- CI/CD: Integrable via GitHub Actions.

- Test structure: each test is fully self-contained and can run independently.

- Data-Driven: expandable TestData folder ready for CSV usage.

- Smart waits: custom timeouts + waitFor() utilities

- Randomized test data for stable regression analysis

- Path Aliases (@pages/BasePage)

- Web Interface Test UI

   - **server/server.js + public/index.html** — full-featured web interface:

   - **"Run Test" button** → `npx playwright test --reporter=html,json`
   - **Detailed table** → parses `playwright-report.json` (TC-01, TC-02... status/time)  
   - **Run history** → `test-history.json` (date + result + details)
   - **HTML report** → `/report/index.html` (official Playwright)
   - **Persistent storage** → F5/server restart = history is NOT lost
   - **Logic:** Run → Details → Close → New row in history (at the top)

- Automation Coverage:

     - Automated test cases cover:
         - iframe generation
         - size validation (min/max) — values generated randomly within limits
         - slider ↔ input synchronization
         - boundary values
         - prevention of invalid input
         - cancel actions
         - logic overrides
         - no console errors on successful generation
         - generation speed with maximum input (input data required ideally)

     - Some test cases are excluded from automation:
         - duplicate logic checks (no added technical value)
         - scenarios beyond the task scope (Out of Scope)

    Reasons for exclusion are clearly indicated in the test case document.

## 🧪 Example Automated Test

Example of a test for changing preview width via input:

```ts
import { test, expect } from '@playwright/test';
import BasePage from '@pages/BasePage';

test('TC-02 Checking width change of preview through input', async ({ page }) => {
  const basePage = new BasePage(page);
  await page.goto('');

  // Generate a random width from 230 to 1020
  const randomWidth = Math.floor(Math.random() * (1020 - 230 + 1)) + 230;

  // Click on the width input field
  const widthInput = await page.locator('input[name="width"]');
  await widthInput.click();
  await widthInput.fill(randomWidth.toString());
  
  // Click the 'Generate Preview' button
  const generateBtn = page.getByRole('button', { name: 'Сгенерировать превью' });
  await basePage.generatePreviewWithRetry(generateBtn);

  await basePage.checkCodeTextareaVisible();
  // Get the iframe code
  const iframeCode = await basePage.getIframeCode();
  // Check that the iframe code data matches the entered value
  expect(iframeCode).toContain(`width="${randomWidth}"`);
  // Wait for the preview to load
  await basePage.checkPreviewVisible();
  await basePage.waitForIframeAttached();
  // Check the data in the preview
  const width = await basePage.getIframeAttribute('width');
  expect(width).toBe(randomWidth.toString());
  
});
```
## 📌 Notes

- Tests do not require manual page reloads between steps — all checks are dynamic.
- Slider values are rounded according to step and verified via Playwright expect.toHaveValue.
- Randomization is used to check element synchronization stability.
- All tests use random values for width, color theme, and topics.
- During each test run, console outputs used values (e.g., width, selected topic, event code) to allow precise debugging and reproduction.
- For topic selection test (TC-08), topics.csv is used with "topic name — event code" pairs for data-driven verification.

