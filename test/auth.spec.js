import { test, expect } from "@playwright/test";

test.describe("Login Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login"); // Make sure your router points this route to <LoginForm />
  });

  test("should render login form correctly", async ({ page }) => {
    await expect(page.getByPlaceholder("Email")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Forgot Password" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Register" })).toBeVisible();
  });

  test("should show validation errors when fields are empty", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("should allow user to type email and password", async ({ page }) => {
    await page.getByPlaceholder("Email").fill("test@example.com");
    await page.getByPlaceholder("Password").fill("password123");

    await expect(page.getByPlaceholder("Email")).toHaveValue("test@example.com");
    await expect(page.getByPlaceholder("Password")).toHaveValue("password123");
  });

  test("should navigate to forgot password screen", async ({ page }) => {
    await page.getByRole("button", { name: "Forgot Password" }).click();
    await expect(page).toHaveURL(/\/request-reset-password/);
  });

  test("should navigate to register screen", async ({ page }) => {
    await page.getByRole("button", { name: "Register" }).click();
    await expect(page).toHaveURL(/\/register/);
  });
});
