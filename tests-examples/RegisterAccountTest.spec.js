import { test, expect } from '@playwright/test';

test('Register for account link click and page title validation', async ({ page }) => {
  // Navigate to the welcome page
  await page.goto('https://uibank.uipath.com/welcome');

  // Click the 'Register For Account' link
  // We can target it by its text content within an 'a' tag.
  await page.click('a:has-text("Register For Account")');

  // Validate the next page title
  await expect(page).toHaveTitle('UiBank-Register');
});