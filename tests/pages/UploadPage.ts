import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Page Object for File Upload: https://the-internet.herokuapp.com/upload */
export class UploadPage extends BasePage {
  readonly fileInput: Locator;
  readonly submit: Locator;
  readonly uploadedHeader: Locator;
  readonly uploadedFiles: Locator;
  readonly successHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.fileInput = page.locator('#file-upload');
    this.submit = page.locator('#file-submit');
    this.uploadedHeader = page.locator('.example h3');
    this.uploadedFiles = page.locator('#uploaded-files');
    this.successHeading = page.getByRole('heading', { name: 'File Uploaded!' });
  }

  async open(): Promise<void> {
    await this.goto('/upload');
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.fileInput.setInputFiles(filePath);
    await this.submit.click();
  }

  async submitWithoutFile(): Promise<void> {
    await this.submit.click();
  }
}
