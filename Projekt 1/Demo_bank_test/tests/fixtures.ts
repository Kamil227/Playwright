import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { PaymentsPage } from "../pages/payments.page";

type Fixtures = {
  appPage: void;
  loginPage: LoginPage;
  paymentPage: PaymentsPage;
};

export const test = base.extend<Fixtures>({
  appPage: async ({ page }, use) => {
    await page.goto("https://demo-bank.vercel.app/index.html"); // korzysta z baseURL z configu
    await use();
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  paymentPage: async ({ page }, use) => {
    const paymentPage = new PaymentsPage(page);
    await use(paymentPage);
  },
});

export { expect };
