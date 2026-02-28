import { test, expect } from "@playwright/test";
import { loginAsDefaultUser } from "./helpers/auth";

test.describe("Payment tests", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDefaultUser(page);
    await page.getByRole("link", { name: "płatności" }).click();
    await expect(page.getByTestId("transfer_receiver")).toBeVisible();
  });

  test("simple payment", async ({ page }) => {
    // Arrange
    const transferReceiver = "Jan Nowak";
    const transferAccount = "11 1111 1111 1111 1111 1111 1111";
    const transferAmount = "222";
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    // Act
    await page.getByTestId("transfer_receiver").fill(transferReceiver);
    await page.getByTestId("form_account_to").fill(transferAccount);
    await page.getByTestId("form_amount").fill(transferAmount);
    await page.getByRole("button", { name: "wykonaj przelew" }).click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator("#show_messages")).toContainText(expectedMessage);
  });
});
