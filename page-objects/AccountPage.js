// pages/AccountPage.js
export class AccountPage {
  constructor(page) {
    this.page = page;

    // Locators for the main welcome and account summary section
    this.welcomeMessageHeading = page.getByRole('heading', { name: 'Welcome!', level: 3 });
    this.accountSummaryParagraph = page.getByText('Here is your account summary:');
    this.applyForNewAccountButton = page.getByText('Apply For New Account');
    this.noAccountsMessage = page.getByText('No accounts at this time, apply for a new account today!');

    // Locators for the "How can we help?" section
    this.howCanWeHelpHeading = page.getByRole('heading', { name: 'How can we help?', level: 3 });

    // Locators for Payment Center card
    this.paymentCenterHeading = page.getByRole('heading', { name: 'Payment Center', level: 5 });
    this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });

    // Locators for Loan Center card
    this.loanCenterHeading = page.getByRole('heading', { name: 'Loan Center', level: 5 });
    this.applyForALoanLink = page.getByRole('link', { name: 'Apply For A Loan' }).first(); // Use .first() as both "Apply For A Loan" and "Loan Status" links have the same ID. This picks the first one encountered in the DOM.
    this.loanStatusLink = page.getByRole('link', { name: 'Loan Status' }); // This is specific enough by text.
  }

  /**
   * Retrieves the text of the main welcome message.
   * @returns {Promise<string|null>} The text content of the welcome message heading.
   */
  async getWelcomeMessageText() {
    return this.welcomeMessageHeading.textContent();
  }

  /**
   * Retrieves the text of the account summary paragraph.
   * @returns {Promise<string|null>} The text content of the account summary paragraph.
   */
  async getAccountSummaryText() {
    return this.accountSummaryParagraph.textContent();
  }

  /**
   * Clicks the "Apply For New Account" button.
   * @returns {Promise<void>}
   */
  async clickApplyForNewAccountButton() {
    await this.applyForNewAccountButton.click();
  }

  /**
   * Retrieves the text indicating no accounts are present.
   * @returns {Promise<string|null>} The text content of the no accounts message.
   */
  async getNoAccountsMessageText() {
    return this.noAccountsMessage.textContent();
  }

  /**
   * Retrieves the text of the "How can we help?" heading.
   * @returns {Promise<string|null>} The text content of the heading.
   */
  async getHowCanWeHelpHeadingText() {
    return this.howCanWeHelpHeading.textContent();
  }

  /**
   * Retrieves the text of the Payment Center heading.
   * @returns {Promise<string|null>} The text content of the heading.
   */
  async getPaymentCenterHeadingText() {
    return this.paymentCenterHeading.textContent();
  }

  /**
   * Clicks the "Transfer Funds" link.
   * @returns {Promise<void>}
   */
  async clickTransferFundsLink() {
    await this.transferFundsLink.click();
  }

  /**
   * Retrieves the text of the Loan Center heading.
   * @returns {Promise<string|null>} The text content of the heading.
   */
  async getLoanCenterHeadingText() {
    return this.loanCenterHeading.textContent();
  }

  /**
   * Clicks the "Apply For A Loan" link.
   * Note: There are two elements with `id="applyForLoan"`. This method clicks the first one found by text.
   * @returns {Promise<void>}
   */
  async clickApplyForALoanLink() {
    await this.applyForALoanLink.click();
  }

  /**
   * Clicks the "Loan Status" link.
   * @returns {Promise<void>}
   */
  async clickLoanStatusLink() {
    await this.loanStatusLink.click();
  }

  /**
   * Checks if the "No accounts at this time" message is visible, indicating a first-time user.
   * @returns {Promise<boolean>} True if the message is visible, false otherwise.
   */
  async isFirstTimeUserAccountPage() {
    return this.noAccountsMessage.isVisible();
  }
}