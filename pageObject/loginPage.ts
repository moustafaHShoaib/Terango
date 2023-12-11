import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.locator("a", {
      hasText: "Trengo",
    });
    this.emailField = page.locator(".mt-2").first();

    this.passwordField = page.locator(".mt-2").nth(1);
    this.loginButton = page.locator(".m-y-", { hasText: "Login" });
  }

  async gotoLoginPage() {
    await this.page.goto("https://app.trengo.com/auth/login");
    await this.page.waitForLoadState();
  }

  async enterEmailDetails(emailValue: string) {
    await this.emailField.click();
    await this.emailField.fill(emailValue);
  }

  async enterPasswordDetails(passwordValue: string) {
    await this.passwordField.click();
    await this.passwordField.fill(passwordValue);
  }
  async submitLoginDetails() {
    await this.loginButton.click();
    await this.page.waitForLoadState();
  }

  async PerformLogin(emailValue:string,passwordValue:string)
  {
    await this.emailField.click();
    await this.emailField.fill(emailValue);
    await this.passwordField.click();
    await this.passwordField.fill(passwordValue);
    await this.loginButton.click();
    await this.page.waitForLoadState();
    // make sure the landing page is the tickets page
    await expect(this.page).toHaveURL("https://app.trengo.com/tickets");
  }
}
