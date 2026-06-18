import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import users from '../fixtures/users.json';

test.describe('Form Authentication — /login', () => {
  test('TC-LOGIN-01 (positive): valid credentials grant access to the Secure Area', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(users.valid.username, users.valid.password);

    await expect(login.flash).toContainText('You logged into a secure area!');
    await expect(login.secureAreaHeading).toHaveText('Secure Area');
    await expect(login.logoutButton).toBeVisible();
    await expect(page).toHaveURL(/\/secure/);
  });

  // Data-driven negative cases.
  // invalid input class (username / password / empty credentials).
  for (const data of users.invalid) {
    test(`TC-LOGIN — login (negative) [${data.case}]`, async ({ page }) => {
      const login = new LoginPage(page);
      await login.open();
      await login.login(data.username, data.password);

      await expect(login.flash).toContainText(data.error);
      await expect(login.logoutButton).toHaveCount(0);
      await expect(page).toHaveURL(/\/login/);
    });
  }
});
