import { test, expect } from "@playwright/test";

test.describe("Pulpit tests", () => {

  const userId = "testerLO";
  
  test.beforeEach(async ({ page }) => {
    
    const url = "https://demo-bank.vercel.app/index.html";
    await page.goto(url);
    
    const userPassword = "testelo1";
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

  })

  test("test", async ({ page }) => {
    //Arrangeś

    const reciverId = "2";
    const transferAmount = "150";
    const transferTitle = "pizza";
    const expectedTransferReciver = "BUG Chuck Demobankowy";

    //Act
    await page.locator("#widget_1_transfer_receiver").selectOption(reciverId);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);
    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();

    //Asert
    await expect(page.locator("#show_messages")).toHaveText(
      `Przelew wykonany! ${expectedTransferReciver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test.only("successful mobile top-up", async ({ page }) => {
    //Arrange

    const topUpReciver = "500 xxx xxx";
    const topUpAmount = "50";
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReciver}`;

    //Act
    await page.locator("#widget_1_topup_receiver").selectOption(topUpReciver);
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByRole("button", { name: "Ok" }).click();

    await expect(page.locator("#show_messages")).toHaveText(expectedMessage);
  });
});
