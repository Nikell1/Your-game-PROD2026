import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
});

test("game ending page shows winners header and can return home", async ({
  page,
}) => {
  await page.goto("/game/ending");

  await expect(page.getByRole("heading", { name: "Победители" })).toBeVisible();

  const homeLink = page.getByRole("link", { name: "На главную" });
  await expect(homeLink).toBeVisible();

  await homeLink.click();
  await expect(page).toHaveURL("/");
});
