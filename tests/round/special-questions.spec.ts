import { test, expect } from "@playwright/test";
import { createGameWithTwoPlayers } from "../helpers";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
});

test("should open cat in bag modal", async ({ page }) => {
  await createGameWithTwoPlayers(page);

  const devSwitch = page.getByRole("switch");
  await devSwitch.click();

  const catQuestionButton = page
    .locator('button:has(path[d^="M78.4648 27.6563"])')
    .first();

  await expect(catQuestionButton).toBeVisible();
  await catQuestionButton.click({ force: true });

  await expect(page.getByRole("heading", { name: "Кот в мешке!" })).toBeVisible(
    { timeout: 10000 },
  );
});

test("should place bets in auction", async ({ page }) => {
  await createGameWithTwoPlayers(page);

  const devSwitch = page.getByRole("switch");
  await devSwitch.click();

  const auctionQuestionButton = page
    .locator('button:has(path[d^="M4.81954 55.9964"])')
    .first();

  await expect(auctionQuestionButton).toBeVisible();
  await auctionQuestionButton.click({ force: true });

  await page.waitForTimeout(4000);
});
