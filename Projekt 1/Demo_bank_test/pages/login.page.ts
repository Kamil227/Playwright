import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly loginInput: Locator;
  readonly loginValidation: Locator;
 

  constructor(page: Page) {
  
    this.loginInput = page.locator("#login_id");
    this.loginValidation = page.locator("#error_login_id")
  }

  
}
