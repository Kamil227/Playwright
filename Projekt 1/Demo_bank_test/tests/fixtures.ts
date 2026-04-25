import { test as base, expect } from "@playwright/test";

type Fixtures = {
  appPage: void;
};

export const test = base.extend<Fixtures>({
  appPage: async ({ page }, use) => {
    await page.goto("https://demo-bank.vercel.app/index.html"); // korzysta z baseURL z configu
    await use();
  },
});

export { expect };
