import { test, expect } from "@playwright/test";
import { loginData, userId } from "../../../test_data/login.data";
import { LoginPage } from "../../../pages/login.page";

test.describe("successful login with username", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("login with correct credentials", async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = "Jan Demobankowy";

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    // Arrange
    const incorrectUserId = "tester";
    const incorrectLoginMessage = "identyfikator ma min. 8 znaków";
    // Act

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.passwordInput.click();

    // Assert
    await expect(loginPage.loginError).toHaveText(incorrectLoginMessage);
  });
  test("unsuccessful login with too short password", async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const incorrectUserPassword = "tes";
    const incorrectPasswordMessage = "hasło ma min. 8 znaków";
    // Act

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(incorrectUserPassword);
    await loginPage.passwordInput.blur();

    // Assert
    await expect(loginPage.passwordError).toHaveText(incorrectPasswordMessage);
  });
});
