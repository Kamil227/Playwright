import { test, expect } from "./fixtures";
import { LoginPage } from "../pages/login.page";
import loginData from "../test_data/login.data.json";

test.describe("Logowanie", () => {
  test.beforeEach(async ({  }) => {});
  test("Login - poprawnie", async ({ loginPage }) => {
    await loginPage.loginInput.fill(loginData.valid.userId);
    await loginPage.loginInput.blur();
    await expect(loginPage.loginValidation).toBeHidden();
  });

  test("Login - niepprawny", async ({ loginPage }) => {
    await loginPage.loginInput.fill(loginData.invalid.tooShortUserId);
    await loginPage.loginInput.blur();
    await expect(loginPage.loginValidation).toBeVisible();
  });

  test("Hasło - poprawne", async ({ loginPage }) => {
    await loginPage.loginPassowrd.fill(loginData.valid.userPassword)
    await loginPage.loginPassowrd.blur()
    await expect(loginPage.passwordValidation).toBeHidden()
  });

   test("Hasło - niepoprawne", async ({ loginPage }) => {
    await loginPage.loginPassowrd.fill(loginData.invalid.toShortPassword)
    await loginPage.loginPassowrd.blur()
    await expect(loginPage.passwordValidation).toBeVisible()
  });

  test("Login i hasło - puste", async ({ loginPage }) => {
    await loginPage.loginInput.click()
    await loginPage.loginPassowrd.click()
    await loginPage.loginPassowrd.blur()
    await expect(loginPage.emptyLoginAndPassword.first()).toBeVisible()
    await expect(loginPage.emptyLoginAndPassword.nth(1)).toBeVisible()

  });

  test("Logowanie - poprawne", async ({ loginPage, page }) => {
    await loginPage.loginInput.fill(loginData.valid.userId);
    await loginPage.loginPassowrd.fill(loginData.valid.userPassword)
    await loginPage.loginButton.click()
    await expect(page).toHaveURL('https://demo-bank.vercel.app/pulpit.html');
    await expect(loginPage.logOutButton).toBeVisible()
  });


});
