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
    await page.goto("https://demo-bank.vercel.app/index.html");
    await page.getByTestId("login-input").fill("tester");
    await page.getByTestId("password-input").click();

    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków",
    );

  });
  test("unsuccessful login with too short password", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/index.html");
    await page.getByTestId("login-input").fill("tester11");
    await page.getByTestId("password-input").fill('12345');
    await page.getByTestId("password-input").blur()

    await expect(page.getByTestId("error-login-password")).toHaveText(
      "hasło ma min. 8 znaków",
    );
  });

});
