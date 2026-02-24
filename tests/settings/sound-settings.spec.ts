import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
});

test("should save volume settings", async ({ page }) => {
  await page.goto("/game/setup");

  await page.locator("header button").last().click();

  const slider = page.getByRole("slider");
  await slider.focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");

  await page.getByRole("button", { name: "Подтвердить" }).click();

  const updatedStorage = await page.evaluate(() =>
    window.localStorage.getItem("sound-storage"),
  );

  expect(updatedStorage).not.toBeNull();

  const parsed = updatedStorage ? JSON.parse(updatedStorage) : null;
  expect(parsed?.state?.volume).toBeGreaterThan(0);
});
