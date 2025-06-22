// pages/AccountCreateResultsPage.js

export class AccountCreateResultsPage {
  constructor(page) {
    this.page = page;

    // Locators for the header section
    this.backButton = page.locator('div.card-header a'); // Locates the back icon link
    this.congratulationsHeading = page.getByRole('heading', { name: 'Congratulations!', level: 1 });
    this.approvedMessage = page.getByText("You've been approved for a new account!");

    // Locators for account details
    this.accountIdLabel = page.getByText('Your new account id is:');
    this.accountIdSpan = page.locator('#accountId');
    this.accountNameLabel = page.getByText('Account Name:');
    this.accountNameSpan = page.locator('#accountName');

    // Locator for the navigation button
    this.viewYourAccountsButton = page.locator('#viewAccounts');
  }

  /**
   * Clicks the back button (arrow_back icon) to navigate.
   * @returns {Promise<void>}
   */
  async clickBackButton() {
    await this.backButton.click();
  }

  /**
   * Clicks the "View Your Accounts" button to navigate to the account summary.
   * @returns {Promise<void>}
   */
  async clickViewYourAccountsButton() {
    await this.viewYourAccountsButton.click();
  }

  /**
   * Retrieves the text of the "Congratulations!" heading.
   * @returns {Promise<string|null>} The text content.
   */
  async getCongratulationsHeadingText() {
    return this.congratulationsHeading.textContent();
  }

  /**
   * Retrieves the text of the approval message.
   * @returns {Promise<string|null>} The text content.
   */
  async getApprovedMessageText() {
    return this.approvedMessage.textContent();
  }

  /**
   * Retrieves the newly created account ID.
   * @returns {Promise<string|null>} The account ID text.
   */
  async getAccountId() {
    return this.accountIdSpan.textContent();
  }

  /**
   * Retrieves the newly created account name (nickname + type).
   * @returns {Promise<string|null>} The account name text.
   */
  async getAccountName() {
    return this.accountNameSpan.textContent();
  }

  /**
   * Checks if the Account Create Results page is visible.
   * @returns {Promise<boolean>} True if the congratulations heading is visible, false otherwise.
   */
  async isPageVisible() {
    return this.congratulationsHeading.isVisible();
  }
}
