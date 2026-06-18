import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Page Object for Dynamic Loading: https://the-internet.herokuapp.com/dynamic_loading */
export class DynamicLoadingPage extends BasePage {
  readonly startButton: Locator;
  readonly finishText: Locator;

  constructor(page: Page) {
    super(page);
    this.startButton = page.locator('#start button');
    this.finishText = page.locator('#finish');
  }

  async open(example: number = 1): Promise<void> {
    await this.goto(`/dynamic_loading/${example}`);
  }

  async start(): Promise<void> {
    await this.startButton.click();
  }
}
