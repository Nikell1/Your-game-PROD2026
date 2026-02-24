import { test, expect } from "@playwright/test";
import { createGameWithTwoPlayers } from "../helpers";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
});

test("round table opens a question and enables answer input after buzzer", async ({
  page,
}) => {
  await createGameWithTwoPlayers(page);

  const devSwitch = page.getByRole("switch");
  await devSwitch.click();

  const questionButton = page
    .getByRole("button")
    .filter({ hasText: /\d+/ })
    .first();

  await questionButton.click();

  await expect(page).toHaveURL(/\/game\/[^/]+\/?$/);

  await expect(page.getByText("Тема:")).toBeVisible();
  await expect(page.getByText("Цена:")).toBeVisible();

  await page.keyboard.press("KeyA");

  const answerInput = page.getByRole("textbox");
  await expect(answerInput).toBeEnabled();
});
