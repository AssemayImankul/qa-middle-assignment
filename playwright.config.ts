import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';


const bddTestDir = defineBddConfig({
  features: 'tests/features/**/*.feature', // сценарии
  steps: 'tests/steps/**/*.ts',            // переводчики
});

export default defineConfig({
  timeout: 30_000,
  expect: { timeout: 7_000 },
  retries: process.env.CI ? 1 : 0,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://the-internet.herokuapp.com',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      // Playwright specs 
      name: 'e2e',
      testDir: 'tests/e2e',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      // сценарии Gherkin 
      name: 'bdd',
      testDir: bddTestDir,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
