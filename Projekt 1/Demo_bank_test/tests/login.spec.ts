import { test, expect } from "@playwright/test";

test.describe("successful login with sername", () => {
  test("login with correct credentials", async ({ page }) => {
    // Arrange
    const url = "https://demo-bank.vercel.app/index.html";
    const userId = "testerLO";
    const userPassword = "testelo1";
    const expectexUserName = "Jan Demobankowy";

    //Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    //Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectexUserName);
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    // Arrange
    const url = "https://demo-bank.vercel.app/index.html";
    const errorUserId = "tester";
    const errorLoginMessege = "identyfikator ma min. 8 znaków";
    //Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(errorUserId);
    await page.getByTestId("password-input").click();
    //Asert
    await expect(page.getByTestId("error-login-id")).toHaveText(
      errorLoginMessege,
    );
  });
  test("unsuccessful login with too short password", async ({ page }) => {
    //Arange
    const url = "https://demo-bank.vercel.app/index.html";
    const userId = "testerLO";
    const errorUserPassword = "tes";
    const errorPasswordMessege = "hasło ma min. 8 znaków";
    //Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(errorUserPassword);
    await page.getByTestId("password-input").blur();
    //Asert
    await expect(page.getByTestId("error-login-password")).toHaveText(
      errorPasswordMessege,
    );
  });
});
