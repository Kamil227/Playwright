import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import loginData from "../test_data/login.data.json";


test.describe("Find button", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/index.html");
  });

  test("Logowanie", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(loginData.valid.userId);
    await loginPage.loginInput.blur()
    await expect(loginPage.loginValidation).toBeHidden;

    
  });
});
