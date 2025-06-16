// tests/ui/login.spec.js

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';

test.describe('Login Functionality', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should allow a user to log in with valid credentials', async ({ page }) => {
    // For this example, we assume 'testuser' and 'password' are valid credentials.
    // In a real scenario, you might want to use environment variables or a fixture for this.
    await loginPage.login('UIBTEST002', 'password12');

    // After logging in, you should be redirected to accounts page.
    await expect(page).toHaveURL('/accounts');
  });

  test('should show an error message with invalid credentials', async ({ page }) => {
    await loginPage.login('invaliduser', 'invalidpassword');

    // Here you would assert that an error message is visible.
    // For example, let's say an element with the text 'Invalid credentials' appears.
    const errorMessage = page.locator('text=login failed');
    await expect(errorMessage).toBeVisible();
  });
});