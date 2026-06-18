import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Page Object for Form Authentication: https://the-internet.herokuapp.com/login */
export class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly flash: Locator;
  readonly logoutButton: Locator;
  readonly secureAreaHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.submit = page.locator('button[type="submit"]');
    this.flash = page.locator('#flash');
    this.logoutButton = page.locator('a[href="/logout"]');
    this.secureAreaHeading = page.locator('.example h2');
  }

  async open(): Promise<void> {
    await this.goto('/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }
}
