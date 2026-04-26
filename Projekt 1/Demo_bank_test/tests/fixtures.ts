import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

type Fixtures = {
  appPage: void;
  loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
  appPage: async ({ page }, use) => {
    await page.goto("https://demo-bank.vercel.app/index.html"); // korzysta z baseURL z configu
    await use();
  },

  loginPage: async ({ page } , use)=> {
    const loginPage = new LoginPage(page)
    await use(loginPage)
  }, 
});

export { expect };
