import { test, expect } from '@playwright/test';

test.describe('DeleteModal', () => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/test-delete-modal`);
  });

  test('should not render when closed', async ({ page }) => {
    // By default the modal is closed
    await expect(page.locator('text=Remove Item')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Delete' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Cancel' })).toHaveCount(0);
  });

  
});
