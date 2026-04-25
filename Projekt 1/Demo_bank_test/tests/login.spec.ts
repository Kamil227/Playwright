import { test, expect } from "./fixtures";
import { LoginPage } from "../pages/login.page";
import loginData from "../test_data/login.data.json";

test.describe("Logowanie", () => {
  test.beforeEach(async ({ appPage }) => {});
  test("Login - poprawnie", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(loginData.valid.userId);
    await loginPage.loginInput.blur();
    await expect(loginPage.loginValidation).toBeHidden();
  });

  test("Login - niepprawny", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(loginData.invalid.tooShortUserId);
    await loginPage.loginInput.blur();
    await expect(loginPage.loginValidation).toBeVisible();
  });
});
