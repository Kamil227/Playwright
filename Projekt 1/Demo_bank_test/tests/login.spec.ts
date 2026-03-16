import { test, expect } from "@playwright/test";
import { loginData, userId } from "../../../test_data/login.data";
import { LoginPage } from "../../../pages/login.page";
import { PulpitPage } from "../../../pages/pulpit.page";

test.describe("successful login with username", { tag: "@login" }, () => {
  let loginPage: LoginPage; // zmienna globalna odnosi sie do tego - loginPage = new LoginPage(page);

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    loginPage = new LoginPage(page); // To odnosi sie do tego wyrzej let loginPage
  });

  test(
    "login with correct credentials",
    {
      tag: ["@login", "@smoke"],
    },
    async ({ page }) => {
      // Arrange
      const userId = loginData.userId;
      const userPassword = loginData.userPassword;
      const expectedUserName = "Jan Demobankowy";

      // Act
      await loginPage.login(userId, userPassword); // to jest funkcja ktora dodalem w login page ts jako login

      // Assert
      const pulpitPage = new PulpitPage(page);
      await expect(pulpitPage.userNameText).toHaveText(expectedUserName);
    },
  );

  test("unsuccessful login with too short username @login", async ({
    page,
  }) => {
    // Arrange
    const incorrectUserId = "tester";
    const incorrectLoginMessage = "identyfikator ma min. 8 znaków";
    // Act

    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.passwordInput.click();

    // Assert
    await expect(loginPage.loginError).toHaveText(incorrectLoginMessage);
  });
  test("unsuccessful login with too short password @login", async ({
    page,
  }) => {
    // Arrange
    const userId = loginData.userId;
    const incorrectUserPassword = "tes";
    const incorrectPasswordMessage = "hasło ma min. 8 znaków";
    // Act

    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(incorrectUserPassword);
    await loginPage.passwordInput.blur();

    // Assert
    await expect(loginPage.passwordError).toHaveText(incorrectPasswordMessage);
  });
});
