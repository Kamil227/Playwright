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
  readonly phoneTransferAmount: Locator;
  readonly phoneTransferCheckbox: Locator;
  readonly phoneTransferButton: Locator;
  readonly phoneModal: Locator;

  constructor(page: Page) {
  
    this.transferReciver = page.locator("#widget_1_transfer_receiver");
    this.transferAmount = page.locator('#widget_1_transfer_amount');
    this.transferTitle = page.locator('#widget_1_transfer_title');
    this.executeButton = page.getByRole('button', {name: 'wykonaj'});
    this.modal = page.getByRole('dialog', {name: 'Przelew wykonany'})
    this.okModalButton = page.getByRole('button', {name: 'Ok'})
    this.transferMessage = page.locator('#show_messages')
    this.phoneTransfer = page.locator('#widget_1_topup_receiver')
    this.phoneTransferAmount = page.locator('#widget_1_topup_amount')
    this.phoneTransferCheckbox = page.locator('#uniform-widget_1_topup_agreement')
    this.phoneTransferButton = page.getByRole('button', {name: 'doładuj telefon'})
    this.phoneModal = page.getByRole('dialog', {name: 'Doładowanie wykonane'})




  
}}
