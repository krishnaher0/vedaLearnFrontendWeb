import { test, expect } from "@playwright/test";

test.describe("Welcome Screen", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/welcome");
  });

  test("should render welcome screen UI elements", async ({ page }) => {
    await expect(page.getByRole("img", { name: "VedaLearn Logo" })).toBeVisible();
    await expect(page.getByText("“Master The arts of learning”")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login as Learners" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Login as Tutors" })).toBeVisible();
  });

  test("should navigate to learner login on button click", async ({ page }) => {
    await page.getByRole("button", { name: "Login as Learners" }).click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("should navigate to tutor login on button click", async ({ page }) => {
    await page.getByRole("button", { name: "Login as Tutors" }).click();
    await expect(page).toHaveURL(/\/login\/teacher$/);
  });
});
