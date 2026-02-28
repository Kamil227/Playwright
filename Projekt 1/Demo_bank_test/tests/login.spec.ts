import { test, expect } from "@playwright/test";
import { loginData, userId } from "../../../test_data/login.data";
import { LoginPage } from "../../../pages/login.page";

test.describe("successful login with username", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("login with correct credentials", async ({ page }) => {
    // Arrange
    const validUserId = loginData.userId;
    const userPassword = loginData.password;
    const expectedUserName = "Jan Demobankowy";

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(validUserId);
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
    await page.getByTestId("login-input").fill(incorrectUserId);
    await page.getByTestId("password-input").click();
    // Assert
    await expect(page.getByTestId("error-login-id")).toHaveText(
      incorrectLoginMessage,
    );
  });
  test("unsuccessful login with too short password", async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const incorrectUserPassword = "tes";
    const incorrectPasswordMessage = "hasło ma min. 8 znaków";
    // Act
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(incorrectUserPassword);
    await page.getByTestId("password-input").blur();
    // Assert
    await expect(page.getByTestId("error-login-password")).toHaveText(
      incorrectPasswordMessage,
    );
  });
});
