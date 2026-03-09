import { Locator, Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.components";

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
  sideMenu: SideMenuComponent;

  constructor(private page: Page) {
    this.sideMenu = new SideMenuComponent(this.page);
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

  async transfer(receiverId: string, transferAmount:string, transferTitle: string,) { Promise<void>
    await this.transferReciver.selectOption(receiverId);
    await this.transferAmount.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);
    await this.transferButtom.click();
    await this.actionCloaseButton.click();
  }

  async transferMobile(topUpReceiver: string, topUpAmount:string) { Promise<void>
    await this.topUpReceiverInput.selectOption(topUpReceiver);
    await this.topUpAmount.fill(topUpAmount);
    await this.topUpAgreementCheckbox.check();
    await this.topUpExecuteButton.click();
  }
}
