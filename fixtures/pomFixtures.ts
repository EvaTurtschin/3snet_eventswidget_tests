{
  "name": "playwright-pom-project",
  "version": "1.0.0",
  "description": "Playwright POM project with TypeScript",
  "author": "Evgenia Turtschin",
  "license": "ISC",

  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:debug": "pwsh -NoExit -Command 'npx playwright test --debug'"
  },
  
  "devDependencies": {
    "@playwright/test": "^1.48.2",
    "@types/node": "^20.6.3",
    "typescript": "^5.2.2"
  }
}
