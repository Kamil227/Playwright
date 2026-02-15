import { test, expect } from "@playwright/test";

test.describe("Pulpit tests", () => {
  test("test", async ({ page }) => {
    //Arrange
    const url = "https://demo-bank.vercel.app/index.html";
    const userId = "testerLO";
    const userPassword = "testelo1";

    const reciverId = "2";
    const transferAmount = "150";
    const transferTitle = "pizza";
    const expectedTransferReciver = "BUG Chuck Demobankowy";

    //Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
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
    const url = "https://demo-bank.vercel.app/index.html";
    const userId = "testerLO";
    const userPassword = "testelo1"; 

    const widgetReciver = "500 xxx xxx"
    const widgetAmount = "50"
    const showMessages = `Doładowanie wykonane! ${widgetAmount},00PLN na numer ${widgetReciver}`

    //Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_topup_receiver").selectOption(widgetReciver);
    await page.locator("#widget_1_topup_amount").fill(widgetAmount);
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByRole("button", { name: "Ok" }).click();

    await expect(page.locator("#show_messages")).toHaveText(
      showMessages
    );
  });
});
