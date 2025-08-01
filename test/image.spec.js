import { test, expect } from '@playwright/test';

test.describe('RightSidePanel Component', () => {
  test.beforeEach(async ({ page }) => {
    // Adjust URL to the page where your RightSidePanel renders
    await page.goto('/welcome');
  });

 

  test('should have the blue background with clip-path style', async ({ page }) => {
    const bgDiv = page.locator('div.bg-blue-500');
    await expect(bgDiv).toHaveCSS('clip-path', 'ellipse(100% 75% at 100% 50%)');
  });
});
