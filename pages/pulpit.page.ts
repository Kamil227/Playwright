import { Locator, Page } from "@playwright/test";

export class PulpitPage {
  transferReciver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  transferButtom: Locator;
  topUpReceiverInput: Locator;
  topUpAmount: Locator;
  topUpAgreementCheckbox: Locator;
  topUpExecuteButton: Locator;
  moneyValueText: Locator;
  actionCloaseButton: Locator;
  messageText: Locator;
  userNameText: Locator;

  constructor(private page: Page) {
    this.transferReciver = this.page.locator("#widget_1_transfer_receiver");
    this.transferAmount = this.page.locator("#widget_1_transfer_amount");
    this.transferTitle = this.page.locator("#widget_1_transfer_title");
    this.transferButtom = this.page.getByRole("button", { name: "wykonaj" });
    this.actionCloaseButton = this.page.getByTestId("close-button");
    this.messageText = this.page.locator("#show_messages");

    this.topUpReceiverInput = this.page.locator("#widget_1_topup_receiver");
    this.topUpAmount = this.page.locator("#widget_1_topup_amount");
    this.topUpAgreementCheckbox = this.page.getByRole("checkbox");
    this.topUpExecuteButton = this.page.getByRole("button", {
      name: "doładuj telefon",
    });

    this.moneyValueText = this.page.locator("#money_value");
    this.userNameText = this.page.getByTestId("user-name");
  }
}
