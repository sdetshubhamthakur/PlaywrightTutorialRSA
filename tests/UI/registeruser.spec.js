// tests/registration.spec.js
const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../../page-objects/RegistrationPage.js');

test.describe('Registration Form', () => {
  let registrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await page.goto('https://uibank.uipath.com/register-account'); 
  });

  test('should allow a user to register with valid details and land on success page', async ({ page }) => {
    const username = `johndoe${Date.now()}`;

    await registrationPage.completeRegistrationForm({
      email: `test${Date.now()}@mailinator.com`,
      password: 'Password123!',
      firstName: 'John',
      lastName: 'Doe',
      middleName: 'A',
      sex: 'male',
      title: 'mr',
      employmentStatus: 'Full-time',
      dateOfBirth: '01/15/90',
      maritalStatus: 'Single',
      numberOfDependents: '0',
      username: username,
      agreeToPrivacyPolicy: true,
    });

    await registrationPage.clickRegisterButton();

    // --- Assertions for successful registration ---

    // 1. Verify URL change
    await expect(page).toHaveURL(`https://uibank.uipath.com/register-account/success/${username}`);

    // 2. Verify content
    await expect(page.locator('h2')).toBeVisible();
    await expect(page.locator('h2')).toHaveText('Welcome To The UiBank Family!');

    await expect(page.locator('h5')).toBeVisible();
    await expect(page.locator('h5')).toHaveText('Before you can apply for an account we need you to verify your email!');

    await expect(page.locator('p.text-white')).toBeVisible();
    await expect(page.locator('p.text-white')).toHaveText('Check your inbox for a verification link.');
  });

  // ... (other tests)
});