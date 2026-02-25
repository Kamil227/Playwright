import { test, expect } from "@playwright/test";
import { loginData } from "../../../test_data/login.data";

test.describe("Payment tests", () => {
  //test describe to taka nazwa grupy testów. Samo test describe to funkcja playwrihta

  test.beforeEach(async ({ page }) => {
    // |async mówi o tym ze bede uywał await| () => funkcja strzałkowa
    const userId = loginData.userId;
    const userPassword = loginData.password;

    await page.goto("/"); // ulr jest w configu playwrighta
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
    await page.getByRole("link", { name: "płatności" }).click();
  });

  test("simple payment", async ({ page }) => {

    //Arrange
    const transferReciver = "Jan Nowak";
    const transferAccount = "11 1111 1111 1111 1111 1111 1111";
    const transferAmount = "222";
    const expextedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

      //Act
    await page.getByTestId("transfer_receiver").fill(transferReciver);
    await page.getByTestId("form_account_to").fill(transferAccount);
    await page.getByTestId("form_amount").fill(transferAmount);
    await page.getByRole("button", { name: "wykonaj przelew" }).click();
    await page.getByTestId("close-button").click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expextedMessage)
  });
});
