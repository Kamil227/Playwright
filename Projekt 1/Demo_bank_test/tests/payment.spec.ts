import { test, expect } from "@playwright/test";
import { loginData } from "../../../test_data/login.data";
import { LoginPage } from "../../../pages/login.page";

test.describe("Payment tests", () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto("/");
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await page.getByRole("link", { name: "płatności" }).click();
  });

  test("simple payment", async ({ page }) => {
    // Arrange

    const transferReceiver = "Jan Nowak";
    const transferAccount = "11 1111 1111 1111 1111 1111 1111";
    const transferAmount = "222";
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.transferReceiver.fill(transferReceiver);
    await loginPage.transferAccount.fill(transferAccount);
    await loginPage.transferAmount.fill(transferAmount);
    await loginPage.payButton.click();
    await loginPage.cloaseButton.click();

    // Assert
    await expect(page.locator("#show_messages")).toContainText(expectedMessage);
  });
});
