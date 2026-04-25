import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly loginInput: Locator;
 

  constructor(page: Page) {
  
    this.loginInput = page.locator("#login_id");
  }

  
}
