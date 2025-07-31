import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should render login form correctly', async ({ page }) => {
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();
  });

  test('should show validation errors when fields are empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();
  });

  test('should allow user to input email and password', async ({ page }) => {
    await page.getByPlaceholder('Email').fill('test@example.com');
    await page.getByPlaceholder('Password').fill('password123');
    await expect(page.getByPlaceholder('Email')).toHaveValue('test@example.com');
    await expect(page.getByPlaceholder('Password')).toHaveValue('password123');
  });

  test('should trigger forgot password navigation', async ({ page }) => {
    await page.getByRole('button', { name: 'Forgot Password' }).click();
    await expect(page).toHaveURL(/.*\/request-reset-password/);
  });

  test('should trigger register navigation', async ({ page }) => {
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page).toHaveURL(/.*\/register/);
  });
});
