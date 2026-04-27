import { Locator, Page } from "@playwright/test";

export class PaymentsPage {

  readonly transferReciver: Locator;

  constructor(page: Page) {
  
    this.transferReciver = page.locator("#widget_1_transfer_receiver");


  
}}
