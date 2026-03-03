import { Locator, Page, expect } from "@playwright/test";

export default class BasePage {
    readonly page: Page;

    // Константы элементов
    readonly codeTextarea: Locator;
    readonly preview: Locator;
    readonly iframePreview: Locator;

    // Таймауты
    readonly defaultTimeout = 10000;

    constructor(page: Page) {
        this.page = page;
        this.codeTextarea = page.locator("textarea[id='code']");
        this.preview = page.locator("div[id='preview']");
        this.iframePreview = this.preview.locator("iframe[id='3snet-frame']");
    }

    async navigateTo(path: string) {
        await this.page.goto(path);
    }

    async checkCodeTextareaVisible() {
    await expect(this.codeTextarea).toBeVisible({ timeout: this.defaultTimeout });
    }

    async checkPreviewVisible() {
    await expect(this.preview).toBeVisible({ timeout: this.defaultTimeout });
    }

    async waitForIframeAttached() {
    await this.iframePreview.waitFor({ state: 'attached', timeout: this.defaultTimeout });
    await expect(this.iframePreview).toBeVisible({ timeout: this.defaultTimeout });
    }

    // Метод, возвращающий текст iframe
    async getIframeCode(): Promise<string> {
    await expect(this.codeTextarea).toBeVisible();
    return await this.codeTextarea.inputValue();
    }

    async getIframeAttribute(attr: string): Promise<string | null> {
    await this.waitForIframeAttached();
    return await this.iframePreview.getAttribute(attr);
    }

    // генерация превью с retry logic - снижает риск падений на долгой операции
  async generatePreviewWithRetry(buttonLocator: Locator, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        await buttonLocator.click();
        await this.checkCodeTextareaVisible();
        await this.waitForIframeAttached();
        return; // всё прошло успешно
      } catch (e) {
        if (i === retries - 1) throw e; 
        await new Promise(r => setTimeout(r, delay)); 
      }
    }

    // Пример заготовки под заполнение форм из CSV
    /* async fillFormFromCSV(data: { [key: string]: string }) {
    //     for (const field in data) {
    //         await this.page.locator(`input[name="${field}"]`).fill(data[field]);
    //     }
       }*/

  }
}