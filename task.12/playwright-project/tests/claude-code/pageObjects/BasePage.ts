import type { Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async open(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async clickSignupLogin(): Promise<void> {
    await this.page.getByRole('link', { name: 'Signup / Login' }).click();
  }

  async clickDeleteAccount(): Promise<void> {
    await this.page.getByRole('link', { name: 'Delete Account' }).click();
  }

  getLoggedInAsLabel(): Locator {
    return this.page.getByText(/Logged in as/i);
  }
}
