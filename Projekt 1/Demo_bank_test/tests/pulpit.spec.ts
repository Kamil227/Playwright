import { test, expect } from "@playwright/test";
import { loginData } from "../../../test_data/login.data";
import { LoginPage } from "../../../pages/login.page";
import { PulpitPage } from "../../../pages/pulpit.page";

test.describe("Pulpit tests", () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expertedUserName = "Jan Demobankowy";

    pulpitPage = new PulpitPage(page);

    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    await expect(page.getByTestId("user-name")).toHaveText(expertedUserName);
  });

  test("quick payment with correct data", async ({ page }) => {
    // Arrange

    const receiverId = "2";
    const transferAmount = "150";
    const transferTitle = "pizza";
    const expectedTransferReceiver = "Chuck Demobankowy";

    // Act
    await pulpitPage.executeQuickPayment(
      receiverId,
      transferAmount,
      transferTitle,
    );

    // Assert
    await expect(pulpitPage.messageText).toContainText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test("successful mobile top-up", async ({ page }) => {
    // Arrange

    const topUpReceiver = "500 xxx xxx";
    const topUpAmount = "50";
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    // Act

    await pulpitPage.executeMobileTopUp(topUpReceiver, topUpAmount);

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
    await pulpitPage.executeMobileTopUp(topUpReceiver, topUpAmount);

    await expect(pulpitPage.moneyValueText).toHaveText(String(expectedBalance));
  });
});
