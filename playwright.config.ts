import { defineConfig, devices } from '@playwright/test';

// require('dotenv').config(); для хранения URL, логинов, токенов

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

/* настройки для CI
  forbidOnly: !!process.env.CI, 
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
*/

  use: {
  baseURL: 'https://dev.3snet.info/eventswidget/',
  trace: 'on-first-retry',
  screenshot: 'only-on-failure'
  },

projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  //{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  //{ name: 'webkit', use: { ...devices['Desktop Safari'] } }
]

})