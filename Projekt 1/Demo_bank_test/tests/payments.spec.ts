import { test, expect } from "./fixtures";
import loginData from "../test_data/login.data.json";
import clientsData from "../test_data/clients.data.json";


test.describe("Payments", () => {
  test.beforeEach(async ({ appPage, loginPage, page }) => {
    await loginPage.loginInput.fill(loginData.valid.userId);
    await loginPage.loginPassowrd.fill(loginData.valid.userPassword);
    await loginPage.loginButton.click();

    await expect(page).toHaveURL("https://demo-bank.vercel.app/pulpit.html");
    await expect(loginPage.logOutButton).toBeVisible();
  });

  test("Wybranie odbiorcy przelewu", async ({ paymentPage }) => {
    await paymentPage.transferReciver.selectOption(clientsData.usersPayment.userPayment);
    await expect(paymentPage.transferReciver.locator("option:checked")
    ).toHaveText(clientsData.usersPayment.userPayment);  });
});
