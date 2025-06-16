// page-objects/LoginPage.js

export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.forgotPasswordLink = page.locator('a[href="/password-request"]');
    this.registerForAccountLink = page.locator('a[href="/register-account"]');

    // Locators for the "Important Notice" dialog
    this.privacyDialog = page.locator('mat-dialog-content');
    this.agreeButton = page.locator('button:has-text("I agree to the Privacy Policy")');
  }

  /**
   * Navigates to the login page.
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Logs in a user.
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();

    // After clicking Sign In, wait for the dialog to appear and click "I agree"
    await this.privacyDialog.waitFor({ state: 'visible' });
    await this.agreeButton.click();
  }
}