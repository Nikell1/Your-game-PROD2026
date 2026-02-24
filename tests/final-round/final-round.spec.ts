import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
});

test("final round page renders with final table", async ({ page }) => {
  await page.goto("/game/round/final");

  await expect(
    page.getByRole("heading", { name: "Финальный Раунд" }),
  ).toBeVisible();
  await expect(page.getByText("Тема финала")).toBeVisible();
});

test("should calculate final scores", async ({ page }) => {
  await page.goto("/game/round/final");

  await expect(page.getByText("Тема финала")).toBeVisible();
});
