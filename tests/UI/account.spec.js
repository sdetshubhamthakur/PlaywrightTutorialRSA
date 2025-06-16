// tests/UI/account.spec.js (example test file)

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../page-objects/LoginPage');
const { AccountPage } = require('../../page-objects/AccountPage');


test.describe('First Time User Account Page', () => {
  let accountPage;

  test.beforeEach(async ({ page }) => {
    
    //await page.goto('https://uibank.uipath.com/accounts'); 
    // Alternatively, perform login steps here:
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('johndoe1750095679944', 'Password123!');
    accountPage = new AccountPage(page);
  });

  test('should display welcome message and no accounts message for first-time user', async ({ page }) => {
    await expect(accountPage.welcomeMessageHeading).toBeVisible();
    await expect(accountPage.welcomeMessageHeading).toHaveText('Welcome!');

    await expect(accountPage.accountSummaryParagraph).toBeVisible();
    await expect(accountPage.accountSummaryParagraph).toHaveText('Here is your account summary:');

    await expect(accountPage.noAccountsMessage).toBeVisible();
    await expect(accountPage.noAccountsMessage).toHaveText('No accounts at this time, apply for a new account today!');

    await expect(accountPage.applyForNewAccountButton).toBeVisible();
    await expect(accountPage.applyForNewAccountButton).toHaveText('Apply For New Account');
  });

  test('should display "How can we help?" section with relevant links', async ({ page }) => {
    await expect(accountPage.howCanWeHelpHeading).toBeVisible();
    await expect(accountPage.howCanWeHelpHeading).toHaveText('How can we help?');

    await expect(accountPage.paymentCenterHeading).toBeVisible();
    await expect(accountPage.paymentCenterHeading).toHaveText('Payment Center');
    await expect(accountPage.transferFundsLink).toBeVisible();

    await expect(accountPage.loanCenterHeading).toBeVisible();
    await expect(accountPage.loanCenterHeading).toHaveText('Loan Center');
    await expect(accountPage.applyForALoanLink).toBeVisible();
    await expect(accountPage.loanStatusLink).toBeVisible();
  });

  test('should navigate to apply for new account page when button is clicked', async ({ page }) => {
    await accountPage.clickApplyForNewAccountButton();
    // Check URL of the navigated page
    await expect(page).toHaveURL('https://uibank.uipath.com/accounts/account-apply');
  });

  test('should navigate to transfer funds page when link is clicked', async ({ page }) => {
    await accountPage.clickTransferFundsLink();
    // Check URL of the navigated page
    await expect(page).toHaveURL('https://uibank.uipath.com/accounts/transfer-money');
  });

  test('should navigate to apply for a loan page when link is clicked', async ({ page }) => {
    await accountPage.clickApplyForALoanLink();
    // Check URL of the navigated page
    await expect(page).toHaveURL('https://uibank.uipath.com/loans');
  });

  test('should navigate to loan status page when link is clicked', async ({ page }) => {
    await accountPage.clickLoanStatusLink();
    // Check URL of the navigated page
    await expect(page).toHaveURL('https://uibank.uipath.com/loans/lookup');
  });
});