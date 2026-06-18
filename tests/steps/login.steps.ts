import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

Given('I am on the login page', async ({ loginPage }) => {
  await loginPage.open();
});

When('I log in as {string} with password {string}', async ({ loginPage }, username: string, password: string) => {
  await loginPage.login(username, password);
});

Then('I should see the flash message {string}', async ({ loginPage }, message: string) => {
  await expect(loginPage.flash).toContainText(message);
});

Then('I should be on the secure area page', async ({ loginPage, page }) => {
  await expect(page).toHaveURL(/\/secure/);
  await expect(loginPage.logoutButton).toBeVisible();
});

Then('I should remain on the login page', async ({ page }) => {
  await expect(page).toHaveURL(/\/login/);
});
