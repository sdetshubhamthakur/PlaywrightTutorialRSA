// pages/NewAccountPage.js

export class NewAccountPage {
  constructor(page) {
    this.page = page;

    // Locators for the header section
    this.backButton = page.locator('div.card-header a'); // Locates the 'back' link in the card header
    this.pageTitle = page.getByRole('heading', { name: 'Apply For A New Account', level: 1 });
    this.pageDescription = page.getByText('We need to gather some more details.');

    // Locators for the form fields
    this.accountNicknameInput = page.locator('#accountNickname');
    this.typeOfAccountDropdown = page.locator('#typeOfAccount');
    this.applyButton = page.getByRole('button', { name: 'Apply' });
  }

  /**
   * Clicks the back button to navigate to the previous page.
   * @returns {Promise<void>}
   */
  async clickBackButton() {
    await this.backButton.click();
  }

  /**
   * Fills the account nickname input field.
   * @param {string} nickname The desired nickname for the account.
   * @returns {Promise<void>}
   */
  async fillAccountNickname(nickname) {
    await this.accountNicknameInput.fill(nickname);
  }

  /**
   * Selects an account type from the dropdown.
   * @param {'checking' | 'savings'} accountType The type of account to select.
   * @returns {Promise<void>}
   */
  async selectTypeOfAccount(accountType) {
    // Playwright's selectOption can take the value of the option, or its label.
    // Here we use the value attribute of the <option> tag.
    await this.typeOfAccountDropdown.selectOption(accountType);
  }

  /**
   * Clicks the 'Apply' button to submit the new account application.
   * @returns {Promise<void>}
   */
  async clickApplyButton() {
    await this.applyButton.click();
  }

  /**
   * Completes the new account application form.
   * @param {string} nickname The nickname for the account.
   * @param {'checking' | 'savings'} accountType The type of account to open.
   * @returns {Promise<void>}
   */
  async applyForNewAccount(nickname, accountType) {
    await this.fillAccountNickname(nickname);
    await this.selectTypeOfAccount(accountType);
    await this.clickApplyButton();
  }

  /**
   * Checks if the "Apply For A New Account" page is visible.
   * Useful for asserting that navigation to this page was successful.
   * @returns {Promise<boolean>} True if the page title is visible, false otherwise.
   */
  async isPageVisible() {
    return this.pageTitle.isVisible();
  }
}
