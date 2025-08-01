import { test, expect } from '@playwright/test';

test.describe('Admin Sidebar', () => {
  test.beforeEach(async ({ page }) => {
    // Replace with your actual page URL where Sidebar renders
    await page.goto('/admin/dashboard');
  });

  test('renders all navigation items with correct labels', async ({ page }) => {
    const navItems = [
      "Dashboard",
      "Courses",
      "Learnings",
      "Payment History",
      "Teachers",
      "Students",
      "Plans",
    ];

    for (const label of navItems) {
      await expect(page.locator(`a:has-text("${label}")`)).toBeVisible();
    }
  });

  test('active navigation item has active styles', async ({ page }) => {
    const activeLink = page.locator('a', { hasText: 'Dashboard' });
    await expect(activeLink).toHaveClass(/bg-gradient-to-r/);
  });

  test('clicking navigation items navigates correctly', async ({ page }) => {
    // Assuming your app uses client-side routing, clicking should change URL path
    await page.click('a:has-text("Courses")');
    await expect(page).toHaveURL(/\/admin\/courses/);

    await page.click('a:has-text("Teachers")');
    await expect(page).toHaveURL(/\/admin\/teacher/);
  });

  test('footer displays correct text', async ({ page }) => {
    await expect(page.locator('text=VedLingo © 2025')).toBeVisible();
    await expect(page.locator('text=Powered by')).toBeVisible();
  });
});
