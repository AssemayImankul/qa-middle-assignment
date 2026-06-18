import { test as base } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage';
import { UploadPage } from '../pages/UploadPage';

type PageObjects = {
  loginPage: LoginPage;
  uploadPage: UploadPage;
};


export const test = base.extend<PageObjects>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  uploadPage: async ({ page }, use) => {
    await use(new UploadPage(page));
  },
});
