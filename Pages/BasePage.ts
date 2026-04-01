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
  }

  async generatePreviewSafely(generateBtn: Locator, retries = 3): Promise<void> {
    const errors: string[] = [];
    
    // Ловим ошибки ДО клика
    this.page.on('console', (msg) => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        errors.push(msg.text());
      }
    });
    
    // Генерируем превью с retry
    await this.generatePreviewWithRetry(generateBtn, retries);
    
    // Проверяем результат
    await this.checkCodeTextareaVisible();
    await this.checkPreviewVisible();
    await this.waitForIframeAttached();
    
    // ожидаем ошибки = 0
    if (errors.length === 0) {
      console.log('✅ Console: 0 errors while Preview generation');
    } else {
      console.error('🚨 Console errors:', errors.join('\n'));
      throw new Error(`Found ${errors.length} console errors`);
    }
  }
  
}