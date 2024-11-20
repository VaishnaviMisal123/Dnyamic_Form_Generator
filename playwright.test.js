// playwright.test.js

const { test, expect } = require('@playwright/test');

test.describe('Form and API tests', () => {
  test('should validate JSON structure', async ({ page }) => {
    const response = await page.request.get('https://your-api-endpoint.com/data');
    const jsonData = await response.json();
    expect(jsonData).toHaveProperty('id');
  });

  test('should generate form fields dynamically', async ({ page }) => {
    await page.goto('https://your-website.com/form');
    const fieldCountBefore = await page.locator('form input').count();
    await page.click('#generateFieldsButton');
    const fieldCountAfter = await page.locator('form input').count();
    expect(fieldCountAfter).toBeGreaterThan(fieldCountBefore);
  });

  test('should validate form and submit', async ({ page }) => {
    await page.goto('https://your-website.com/form');
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'johndoe@example.com');
    await page.fill('#email', '');
    await page.click('#submitButton');
    const errorMessage = await page.locator('.error-message');
    await expect(errorMessage).toContainText('Email is required');
    await page.fill('#email', 'johndoe@example.com');
    await page.click('#submitButton');
    const successMessage = await page.locator('.success-message');
    await expect(successMessage).toContainText('Form submitted successfully');
  });

  test('should be responsive on different devices', async ({ page }) => {
    await page.emulate(devices['iPhone 11']);
    await page.goto('https://your-website.com');
    const mobileView = await page.locator('header').isVisible();
    expect(mobileView).toBeTruthy();
  });

  test('should handle server errors gracefully', async ({ page }) => {
    await page.route('https://your-api-endpoint.com/data', (route) => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      });
    });
    await page.goto('https://your-website.com');
    await page.click('#loadDataButton');
    const errorMessage = await page.locator('.error-message');
    await expect(errorMessage).toContainText('Internal Server Error');
  });
});
