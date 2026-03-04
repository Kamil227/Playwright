import { Locator, Page } from "@playwright/test";

export class LoginPage {
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  loginError: Locator;
  passwordError: Locator;
  transferReceiver: Locator;
  transferAccount: Locator;
  transferAmount: Locator;
  payButton: Locator;
  cloaseButton: Locator;
  receiverId: Locator;
  transferAmountWidget: Locator;
  transferTitle: Locator;
  doneButton: Locator;
  topUpReceiver: Locator;
  topUpAmount: Locator;
  checkbox: Locator;
  phoneButton: Locator;
  okButton: Locator;


  constructor(private page: Page) {
    this.loginInput = this.page.getByTestId("login-input");
    this.passwordInput = this.page.getByTestId("password-input");
    this.loginButton = this.page.getByTestId("login-button");
    this.loginError = this.page.getByTestId("error-login-id");
    this.passwordError = this.page.getByTestId("error-login-password");

    this.transferReceiver = this.page.getByTestId("transfer_receiver")
    this.transferAccount = this.page.getByTestId("form_account_to")
    this.transferAmount = this.page.getByTestId("form_amount")
    this.payButton = this.page.getByRole("button", { name: "wykonaj przelew" })
    this.cloaseButton = this.page.getByTestId("close-button")

    this.receiverId = this.page.locator("#widget_1_transfer_receiver")
    this.transferAmountWidget = this.page.locator("#widget_1_transfer_amount")
    this.transferTitle = this.page.locator("#widget_1_transfer_title")
    this.doneButton = this.page.getByRole("button", { name: "wykonaj" })


    this.topUpReceiver = this.page.locator("#widget_1_topup_receiver")
    this.topUpAmount = this.page.locator("#widget_1_topup_amount")
    this.checkbox = this.page.getByRole("checkbox")
    this.phoneButton = this.page.getByRole("button", { name: "doładuj telefon" })
    this.okButton = this.page.getByRole("button", { name: "Ok" })
  }
}
