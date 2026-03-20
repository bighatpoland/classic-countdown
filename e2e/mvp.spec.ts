import { expect, test } from "@playwright/test";

test("user can complete minimum viable day from Today page", async ({ page }) => {
  await page.goto("/today");

  await expect(page.getByRole("heading", { name: "Plan dnia" })).toBeVisible();
  await page.getByRole("button", { name: "Przelacz na minimum viable day" }).click();

  await page.getByRole("button", { name: "Zrobione" }).first().click();
  await page.getByRole("button", { name: "Zrobione" }).first().click();
  await page.getByRole("button", { name: "Zrobione" }).first().click();

  await expect(page.getByText("dzien domkniety")).toBeVisible();
});

test("user can review a card in SRS", async ({ page }) => {
  await page.goto("/study/srs");

  await expect(page.getByRole("heading", { name: "Kolejka review" })).toBeVisible();
  await page.getByRole("button", { name: "Pokaz odpowiedz" }).click();
  await page.getByRole("button", { name: "4" }).click();

  await expect(page.getByText("Review dzis")).toBeVisible();
});
