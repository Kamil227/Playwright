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
    const expectedTransferReciver = "Chuck Demobankowy";

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

  test("successful mobile top-up", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/index.html");
    await page.getByTestId("login-input").fill("testerLO");
    await page.getByTestId("password-input").fill("password");
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_topup_receiver").selectOption("500 xxx xxx");
    await page.locator("#widget_1_topup_amount").fill("50");
    await page.getByRole("checkbox").check();
    //await page.locator('#uniform-widget_1_topup_agreement').click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByRole("button", { name: "Ok" }).click();

    await expect(page.locator("#show_messages")).toHaveText(
      "Doładowanie wykonane! 50,00PLN na numer 500 xxx xxx",
    );
  });
});
// await page.locator('#uniform-widget_1_topup_agreement > span').click();
//   await page.getByRole('button', { name: 'doładuj telefon' }).click();
//   await page.getByTestId('close-button').click();
//   await page.getByRole('link', { name: 'Doładowanie wykonane! 40,' }).click();
// });
