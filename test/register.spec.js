import { test, expect } from "@playwright/test";

test.describe("Register Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test("should render the register form correctly", async ({ page }) => {
    await expect(page.locator("text=Create Your Profile")).toBeVisible();
    await expect(page.getByPlaceholder("Enter your name")).toBeVisible();
    await expect(page.getByPlaceholder("Enter your age")).toBeVisible();
    await expect(page.getByPlaceholder("Enter your email")).toBeVisible();
    await expect(page.getByPlaceholder("Enter your password")).toBeVisible();
  });

 
});
