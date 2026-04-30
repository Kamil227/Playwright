import { Locator, Page } from "@playwright/test";

export class PaymentsPage {
  readonly transferReciver: Locator;
  readonly transferAmount: Locator;
  readonly transferTitle: Locator;
  readonly executeButton: Locator;
  readonly modal: Locator;
  readonly okModalButton: Locator;
  readonly transferMessage: Locator;
  readonly phoneTransfer: Locator;
  readonly amount: Locator;
  readonly phoneTransferCheckbox: Locator;
  readonly phoneTransferButton: Locator;
  readonly phoneModal: Locator;
  readonly standardPayment: Locator;
  readonly standardPaymentTransferReciver: Locator;
  readonly bankAcount: Locator;
  readonly formTitle: Locator;
  readonly addButton: Locator;

  constructor(page: Page) {
    this.transferReciver = page.locator("#widget_1_transfer_receiver");
    this.transferAmount = page.locator("#widget_1_transfer_amount");
    this.transferTitle = page.locator("#widget_1_transfer_title");
    this.executeButton = page.getByRole("button", { name: "wykonaj" });
    this.modal = page.getByRole("dialog", { name: "Przelew wykonany" });
    this.okModalButton = page.getByRole("button", { name: "Ok" });
    this.transferMessage = page.locator("#show_messages");
    this.phoneTransfer = page.locator("#widget_1_topup_receiver");
    this.amount = page.locator("#widget_1_topup_amount");
    this.phoneTransferCheckbox = page.locator(
      "#uniform-widget_1_topup_agreement",
    );
    this.phoneTransferButton = page.getByRole("button", {
      name: "doładuj telefon",
    });
    this.phoneModal = page.getByRole("dialog", {
      name: "Doładowanie wykonane",
    });
    this.standardPayment = page.getByRole("link", { name: "płatności" });
    this.standardPaymentTransferReciver = page.locator(
      "#widget_4_transfer_receiver",
    );
    this.bankAcount = page.locator("#widget_2_transfer_account");
    this.formTitle = page.locator('#form_title')
    this.addButton = page.locator('span.showhide[data-target="form_address"]')
  }
}
