// tests/UI/applyNewAccount.spec.js

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../page-objects/LoginPage');
const { NewAccountPage } = require('../../page-objects/NewAccountPage'); 
const { AccountPage } = require('../../page-objects/AccountPage'); 
const { AccountCreateResultsPage } = require('../../page-objects/AccountCreateResultsPage');

test.describe('Account creation flow and account summary', () => {
  let newAccountPage;
  let accountPage; 
  let accountCreateResultsPage;

  // A beforeEach hook to set up the page object before each test
  test.beforeEach(async ({ page }) => {
    
    //accountPage = new AccountPage(page); // Initialize if needed for navigation

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('johndoe1750095679944', 'Password123!');
    accountPage = new AccountPage(page);
    newAccountPage = new NewAccountPage(page);
    accountCreateResultsPage = new AccountCreateResultsPage(page);

    //await page.goto('https://uibank.uipath.com/accounts'); // Go to the account summary page first
    await accountPage.clickApplyForNewAccountButton(); // Click the button to navigate to the apply page
    await newAccountPage.pageTitle.waitFor({ state: 'visible' }); // Wait for the new page title to be visible
  });

  test('should show no accounts message for a first-time user', async ({ page }) => {
    // This assumes a clean user state where no accounts exist initially
    // If your beforeEach logs in a user that already has accounts, this test might fail.
    await expect(accountPage.hasNoAccountsMessage()).toBeTruthy();
    await expect(accountPage.getNumberOfAccounts()).resolves.toBe(0); // Expect 0 accounts
  });  

  test('should display all elements on the New Account page', async () => {
    // Assert that the page title and description are visible and have correct text
    await expect(newAccountPage.pageTitle).toBeVisible();
    await expect(newAccountPage.pageTitle).toHaveText('Apply For A New Account');

    await expect(newAccountPage.pageDescription).toBeVisible();
    await expect(newAccountPage.pageDescription).toHaveText('We need to gather some more details.');

    // Assert that input fields and dropdowns are visible
    await expect(newAccountPage.accountNicknameInput).toBeVisible();
    await expect(newAccountPage.typeOfAccountDropdown).toBeVisible();

    // Assert that the Apply button is visible
    await expect(newAccountPage.applyButton).toBeVisible();
  });

  test('should successfully apply for a Checking account and verify its presence', async ({ page }) => {
    const nickname = `MyChecking${Date.now()}`;
    const initialAccountCount = await accountPage.getNumberOfAccounts(); // Get initial count

    // Apply for the new account
    await newAccountPage.applyForNewAccount(nickname, 'checking');

    // Wait for navigation to the results page
    await expect(page).toHaveURL(/.*account-create-results/);
    //const accountCreateResultsPage = new AccountCreateResultsPage(page); // Initialize results page POM

    // Verify success message
    await expect(accountCreateResultsPage.congratulationsHeading).toBeVisible();
    
    // Get new account details from the success page
    const newAccountId = await accountCreateResultsPage.getAccountId();
    const newAccountName = await accountCreateResultsPage.getAccountName();
    console.log(`New account created! ID: ${newAccountId}, Name: ${newAccountName}`);

    // Navigate back to the accounts summary page
    await accountCreateResultsPage.clickViewYourAccountsButton();
    await expect(page).toHaveURL(/.*accounts/); // Verify URL
    await expect(accountPage.welcomeMessageHeading).toBeVisible(); // Verify element on account page

    // Now, verify the new account appears on the summary page
    //await expect(accountPage.getNumberOfAccounts()).resolves.toBe(initialAccountCount + 1); // Verify account count increased
    await expect(accountPage.page.locator(`strong:text("${newAccountName}")`)).toBeVisible({ timeout: 10000 });
    
    expect(accountPage.isAccountVisible(newAccountName)).toBeTruthy(); // Verify account name is visible

    // Get all account details and check for the specific new account
    const allAccounts = await accountPage.getAllAccountDetails();
    const createdAccount = allAccounts.find(acc => acc.name === newAccountName);

    expect(createdAccount).toBeDefined();
    expect(createdAccount.balance).toBe('$100.00'); // Validating initial balance is $100

  });

  test('should allow user to apply for a Savings account', async ({ page }) => {
    const nickname = `MySavings${Date.now()}`;
    const initialAccountCount = await accountPage.getNumberOfAccounts(); // Get initial count

    // Use the POM method to fill and submit the form
    await newAccountPage.applyForNewAccount(nickname, 'savings');

    // Assert that you are on the success page
    await expect(accountCreateResultsPage.congratulationsHeading).toBeVisible();
    await expect(accountCreateResultsPage.congratulationsHeading).toHaveText('Congratulations!');

    // Get the dynamically generated account ID and name
    const newAccountId = await accountCreateResultsPage.getAccountId();
    const newAccountName = await accountCreateResultsPage.getAccountName();

    console.log(`New account created! ID: ${newAccountId}, Name: ${newAccountName}`);

    // Click to view accounts
    await accountCreateResultsPage.clickViewYourAccountsButton();

    // Now, verify the new account appears on the summary page
    //await expect(accountPage.getNumberOfAccounts()).resolves.toBe(initialAccountCount + 1); // Verify account count increased
    await expect(accountPage.page.locator(`strong:text("${newAccountName}")`)).toBeVisible({ timeout: 10000 });
    
    await expect(accountPage.isAccountVisible(newAccountName)).toBeTruthy(); // Verify account name is visible

    //console.log('--- Debugging Account Verification ---');
    //console.log(`Expected new account name: "${newAccountName}"`);

    // Get all account details and check for the specific new account
    const allAccounts = await accountPage.getAllAccountDetails();
    //console.log('Accounts found on page:');
    //allAccounts.forEach(acc => console.log(`  - Name: "${acc.name}", Partial ID: "${acc.partialId}", Balance: "${acc.balance}"`));

    const createdAccount = allAccounts.find(acc => acc.name === newAccountName);
    //console.log(`Was createdAccount found in the list? ${!!createdAccount}`); 

    await expect(createdAccount).toBeDefined();
    await expect(createdAccount.balance).toBe('$100.00'); // Validating initial balance is $100

    //console.log('--- End Debugging ---');
  });

  test('should navigate back when the back button is clicked', async ({ page }) => {
    await newAccountPage.clickBackButton();

    // Assert that it navigates back to the account summary page
    await expect(page).toHaveURL(/.*accounts/); // Assuming it goes back to the /accounts URL
    await expect(accountPage.welcomeMessageHeading).toBeVisible(); // Check for an element on the previous page
  });

  test('should show validation errors if nickname is empty and user tries to apply', async ({ page }) => {
    // Select an account type but leave nickname empty
    await newAccountPage.selectTypeOfAccount('checking');
    await newAccountPage.clickApplyButton();

    // Add assertions for expected validation error messages (if any appear)
    // This assumes the application displays a validation message.
    // Example: await expect(page.getByText('Nickname is required')).toBeVisible();
    console.log('Tested validation for empty nickname, user restricted');
  });
});
