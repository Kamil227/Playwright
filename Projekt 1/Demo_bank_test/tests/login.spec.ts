import { test, expect } from "@playwright/test";

test.describe("successful login with username", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("login with correct credentials", async ({ page }) => {
    // Arrange
    const userId = "testerLO";
    const userPassword = "testelo1";
    const expectedUserName = "Jan Demobankowy";

    //Act
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    //Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    // Arrange
    const incorretUserId = "tester";
    const incorectLoginMessage = "identyfikator ma min. 8 znaków";
    //Act
    await page.getByTestId("login-input").fill(incorretUserId);
    await page.getByTestId("password-input").click();
    //Asert
    await expect(page.getByTestId("error-login-id")).toHaveText(
      incorectLoginMessage,
    );
  });
  test("unsuccessful login with too short password", async ({ page }) => {
    //Arange
    const userId = "testerLO";
    const incorectUserPassword = "tes";
    const incorectPasswordMessage = "hasło ma min. 8 znaków";
    //Act
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(incorectUserPassword);
    await page.getByTestId("password-input").blur();
    //Asert
    await expect(page.getByTestId("error-login-password")).toHaveText(
      incorectPasswordMessage,
    );
  });
});
