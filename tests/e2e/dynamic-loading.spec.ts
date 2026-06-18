import { test, expect } from '@playwright/test';
import { DynamicLoadingPage } from '../pages/DynamicLoadingPage';

test.describe('Dynamic Loading — /dynamic_loading', () => {
  test('TC-DYNLOAD-01 (positive): hidden element appears after async load', async ({ page }) => {
    const dyn = new DynamicLoadingPage(page);
    await dyn.open(1);
    await dyn.start();

    await expect(dyn.finishText).toHaveText('Hello World!', { timeout: 15_000 });
  });
});
