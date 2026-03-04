import { test, expect } from "@playwright/test";
import { loginData } from "../../../test_data/login.data";
import { LoginPage } from "../../../pages/login.page";

test.describe("Pulpit tests", () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expertedUserName = "Jan Demobankowy";

    await page.goto("/");
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await expect(page.getByTestId("user-name")).toHaveText(expertedUserName);
  });

  test("quick payment with correct data", async ({ page }) => {
    // Arrange

    const receiverId = "2";
    const transferAmount = "150";
    const transferTitle = "pizza";
    const expectedTransferReceiver = "Chuck Demobankowy";

    // Act
    const loginPage = new LoginPage(page);

    await loginPage.receiverId.selectOption(receiverId);
    await loginPage.transferAmountWidget.fill(transferAmount);
    await loginPage.transferTitle.fill(transferTitle);
    await loginPage.doneButton.click();
    await loginPage.cloaseButton.click();

    // Assert
    await expect(page.locator("#show_messages")).toContainText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test("successful mobile top-up", async ({ page }) => {
    // Arrange

    const topUpReceiver = "500 xxx xxx";
    const topUpAmount = "50";
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    // Act

    const loginPage = new LoginPage(page)
    await loginPage.topUpReceiver.selectOption(topUpReceiver);
    await loginPage.topUpAmount.fill(topUpAmount);
    await loginPage.checkbox.check();
    await loginPage.phoneButton.click();
    await loginPage.okButton.click();


    await expect(page.locator("#show_messages")).toContainText(expectedMessage);
  });

  test("correct balance after successful mobile top-up", async ({ page }) => {
    // Arrange

    const topUpReceiver = "500 xxx xxx";
    const topUpAmount = "50";
    const initialBalance = await page.locator("#money_value").innerText();
    const initialBalanceValue = Number(initialBalance.replace(/[^\d.-]/g, ""));
    const expectedBalance = initialBalanceValue - Number(topUpAmount);

    // Act
    const loginPage = new LoginPage(page)
    await loginPage.topUpReceiver.selectOption(topUpReceiver);
    await loginPage.topUpAmount.fill(topUpAmount);
    await loginPage.checkbox.check();
    await loginPage.phoneButton.click();
    await loginPage.okButton.click();

    await expect(page.locator("#money_value")).toHaveText(
      String(expectedBalance),
    );
  });
});
