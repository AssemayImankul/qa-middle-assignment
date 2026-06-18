import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import path from 'node:path';
import { test } from './fixtures';

const { Given, When, Then } = createBdd(test);

Given('I am on the upload page', async ({ uploadPage }) => {
  await uploadPage.open();
});

When('I upload the file {string}', async ({ uploadPage }, relativePath: string) => {
  await uploadPage.uploadFile(path.resolve(process.cwd(), relativePath));
});

When('I submit the upload form without choosing a file', async ({ uploadPage }) => {
  await uploadPage.submitWithoutFile();
});

Then('I should see the upload confirmation {string}', async ({ uploadPage }, text: string) => {
  await expect(uploadPage.successHeading).toBeVisible();
  await expect(uploadPage.uploadedHeader).toHaveText(text);
});

Then('I should not see the upload confirmation', async ({ uploadPage }) => {
  await expect(uploadPage.successHeading).toHaveCount(0);
});
