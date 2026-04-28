import { test, expect } from "./fixtures";
import loginData from "../test_data/login.data.json";
import clientsData from "../test_data/clients.data.json";
import paymenstData from "../test_data/payments.data.json";

test.describe("Payments", () => {
  const reciveAmount = paymenstData.payments.reciveAmount;
  const revicer = clientsData.usersPayment.userPayment;
  const transferTitle = paymenstData.payments.paymentTitle;
  const showMessage = paymenstData.payments.paymentMessage;

  const paymentMessage = (showMessage: string, revicer: string, reciveAmount: string, transferTitle: string) => `${showMessage } ${revicer } - ${reciveAmount } - ${transferTitle}`; 

  test.beforeEach(async ({ appPage, loginPage, page }) => {
    await loginPage.loginInput.fill(loginData.valid.userId);
    await loginPage.loginPassowrd.fill(loginData.valid.userPassword);
    await loginPage.loginButton.click();

    await expect(page).toHaveURL("https://demo-bank.vercel.app/pulpit.html");
    await expect(loginPage.logOutButton).toBeVisible();
  });

  test("Wybranie odbiorcy przelewu", async ({ paymentPage }) => {
    await paymentPage.transferReciver.selectOption(
      clientsData.usersPayment.userPayment,
    );
    await expect(
      paymentPage.transferReciver.locator("option:checked"),
    ).toHaveText(revicer);
  });
  test("Wpisanie kwoty", async ({ paymentPage }) => {
    await paymentPage.transferAmount.fill(reciveAmount);
    await paymentPage.transferAmount.blur();
  });
  test("Tytuł przelewu", async ({ paymentPage }) => {
    await paymentPage.transferTitle.fill(transferTitle);
    await paymentPage.transferTitle.blur();
  });

  test("Pełna płatność", async ({ paymentPage }) => {
    await paymentPage.transferReciver.selectOption(
      clientsData.usersPayment.userPayment,
    );
    await expect(
      paymentPage.transferReciver.locator("option:checked"),
    ).toHaveText(revicer);

    await paymentPage.transferAmount.fill(reciveAmount);

    await paymentPage.transferTitle.fill(transferTitle);

    await paymentPage.executeButton.click()

    await expect (paymentPage.modal).toContainText(revicer)
    await expect (paymentPage.modal).toContainText(reciveAmount)
    await expect (paymentPage.modal).toContainText(transferTitle)

    await paymentPage.okModalButton.click()
    await expect(paymentPage.transferMessage).toHaveText(paymentMessage)



  });
});
