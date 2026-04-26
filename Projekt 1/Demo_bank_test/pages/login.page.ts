import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly loginInput: Locator;
  readonly loginValidation: Locator;
  readonly loginPassowrd: Locator;
  readonly passwordValidation: Locator;
  readonly emptyLoginAndPassword: Locator;
  readonly loginButton: Locator;
  readonly logOutButton: Locator;

  constructor(page: Page) {
  
    this.loginInput = page.locator("#login_id");
    this.loginValidation = page.locator("#error_login_id");
    this.loginPassowrd = page.locator('#login_password');
    this.passwordValidation = page.locator('#error_login_password');
    this.emptyLoginAndPassword = page.getByText('pole wymagane')
    this.loginButton = page.getByRole('button', {name: 'zaloguj się'})
    this.logOutButton = page.locator('#log_out')
  }

  
}
