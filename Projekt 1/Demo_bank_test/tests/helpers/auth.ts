import { expect, Page } from "@playwright/test";
import { loginData } from "../../../../test_data/login.data";

export async function loginAsDefaultUser(page: Page) {
  await page.goto("/");
  await page.getByTestId("login-input").fill(loginData.userId);
  await page.getByTestId("password-input").fill(loginData.password);
  await page.getByTestId("login-button").click();
  await expect(page.getByTestId("user-name")).toBeVisible();
}
