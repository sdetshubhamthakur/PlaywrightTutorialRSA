// pages/RegistrationPage.js
export class RegistrationPage {
  constructor(page) {
    this.page = page;
    // Locators for each UI element
    this.backButton = page.locator('div.back-container a');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.middleNameInput = page.locator('#middleName');
    this.sexDropdown = page.locator('#sex');
    this.titleDropdown = page.locator('#title');
    this.employmentStatusDropdown = page.locator('#employmentStatus');
    this.dateOfBirthInput = page.locator('#age');
    this.maritalStatusDropdown = page.locator('#maritalStatus');
    this.numberOfDependentsInput = page.locator('#numberOfDependents');
    this.usernameInput = page.locator('#username');
    this.privacyPolicyCheckbox = page.locator('#agreeCheckbox');
    this.privacyPolicyLink = page.getByRole('link', { name: 'Privacy Policy' });
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  /**
   * Fills the email address input field.
   * @param {string} email The email address to enter.
   */
  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  /**
   * Fills the password input field.
   * @param {string} password The password to enter.
   */
  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  /**
   * Fills the first name input field.
   * @param {string} firstName The first name to enter.
   */
  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  /**
   * Fills the last name input field.
   * @param {string} lastName The last name to enter.
   */
  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  /**
   * Fills the middle name or initial input field.
   * @param {string} middleName The middle name or initial to enter.
   */
  async fillMiddleName(middleName) {
    await this.middleNameInput.fill(middleName);
  }

  /**
   * Selects an option from the sex dropdown.
   * @param {string} sexValue The value of the sex option to select (e.g., 'male', 'female').
   */
  async selectSex(sexValue) {
    await this.sexDropdown.selectOption(sexValue);
  }

  /**
   * Selects an option from the title dropdown.
   * @param {string} titleValue The value of the title option to select (e.g., 'mr', 'ms', 'mrs').
   */
  async selectTitle(titleValue) {
    await this.titleDropdown.selectOption(titleValue);
  }

  /**
   * Selects an option from the employment status dropdown.
   * @param {string} employmentStatusValue The value of the employment status option to select (e.g., 'Full-time', 'Part-time', 'Unemployed').
   */
  async selectEmploymentStatus(employmentStatusValue) {
    await this.employmentStatusDropdown.selectOption(employmentStatusValue);
  }

  /**
   * Fills the date of birth input field.
   * @param {string} dob The date of birth in MM/DD/YY format.
   */
  async fillDateOfBirth(dob) {
    await this.dateOfBirthInput.fill(dob);
  }

  /**
   * Selects an option from the marital status dropdown.
   * @param {string} maritalStatusValue The value of the marital status option to select (e.g., 'Single', 'Married', 'Divorced', 'Widowed').
   */
  async selectMaritalStatus(maritalStatusValue) {
    await this.maritalStatusDropdown.selectOption(maritalStatusValue);
  }

  /**
   * Fills the number of dependents input field.
   * @param {string} numberOfDependents The number of dependents.
   */
  async fillNumberOfDependents(numberOfDependents) {
    await this.numberOfDependentsInput.fill(numberOfDependents);
  }

  /**
   * Fills the username input field.
   * @param {string} username The username to enter.
   */
  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  /**
   * Clicks the back button.
   */
  async clickBackButton() {
    await this.backButton.click();
  }

  /**
   * Checks the privacy policy agreement checkbox.
   */
  async checkPrivacyPolicyAgreement() {
    await this.privacyPolicyCheckbox.check();
  }

  /**
   * Clicks the privacy policy link.
   */
  async clickPrivacyPolicyLink() {
    await this.privacyPolicyLink.click();
  }

  /**
   * Clicks the Register button.
   */
  async clickRegisterButton() {
    await this.registerButton.click();
  }

  /**
   * Completes the entire registration form with provided data.
   * @param {object} data An object containing all registration details.
   * @param {string} [data.email]
   * @param {string} [data.password]
   * @param {string} [data.firstName]
   * @param {string} [data.lastName]
   * @param {string} [data.middleName]
   * @param {string} [data.sex]
   * @param {string} [data.title]
   * @param {string} [data.employmentStatus]
   * @param {string} [data.dateOfBirth]
   * @param {string} [data.maritalStatus]
   * @param {string} [data.numberOfDependents]
   * @param {string} [data.username]
   * @param {boolean} [data.agreeToPrivacyPolicy]
   */
  async completeRegistrationForm(data) {
    if (data.email) await this.fillEmail(data.email);
    if (data.password) await this.fillPassword(data.password);
    if (data.firstName) await this.fillFirstName(data.firstName);
    if (data.lastName) await this.fillLastName(data.lastName);
    if (data.middleName) await this.fillMiddleName(data.middleName);
    if (data.sex) await this.selectSex(data.sex);
    if (data.title) await this.selectTitle(data.title);
    if (data.employmentStatus) await this.selectEmploymentStatus(data.employmentStatus);
    if (data.dateOfBirth) await this.fillDateOfBirth(data.dateOfBirth);
    if (data.maritalStatus) await this.selectMaritalStatus(data.maritalStatus);
    if (data.numberOfDependents) await this.fillNumberOfDependents(data.numberOfDependents);
    if (data.username) await this.fillUsername(data.username);
    if (data.agreeToPrivacyPolicy) await this.checkPrivacyPolicyAgreement();
  }
}