import { expect, test } from "@playwright/test";

test("navigates from dashboard to settings and back", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Workday countdown" })).toBeVisible();

  await page.getByRole("link", { name: "Open settings" }).click();
  await expect(page.getByRole("heading", { name: "Schedule settings" })).toBeVisible();

  await page.getByRole("link", { name: "Cancel" }).click();
  await expect(page.getByRole("heading", { name: "Workday countdown" })).toBeVisible();
});

