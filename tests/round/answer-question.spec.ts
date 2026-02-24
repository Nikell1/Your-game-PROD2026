import { test, expect } from "@playwright/test";
import { createGameWithTwoPlayers } from "../helpers";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
});

test("should handle correct answer", async ({ page }) => {
  await createGameWithTwoPlayers(page);

  const devSwitch = page.getByRole("switch");
  await devSwitch.click();

  const questionButton = page
    .getByRole("button")
    .filter({ hasText: /\d+/ })
    .first();

  await questionButton.click();
  await expect(page).toHaveURL(/\/game\/[^/]+\/?$/);

  await page.keyboard.press("KeyA");

  const devAnswerElement = page.getByText(/Правильный ответ:/);
  await expect(devAnswerElement).toBeVisible({ timeout: 10000 });

  const devAnswerText = await devAnswerElement.textContent();
  const correctAnswer =
    devAnswerText?.split(":").slice(1).join(":").trim() ?? "";

  const answerInput = page.getByRole("textbox");
  await expect(answerInput).toBeEnabled();

  await answerInput.fill(correctAnswer);
  await page.keyboard.press("Enter");

  await expect(answerInput).toHaveClass(/border-green-500/);
});

test("should handle incorrect answer", async ({ page }) => {
  await createGameWithTwoPlayers(page);

  const devSwitchOnRound = page.getByRole("switch");
  await devSwitchOnRound.click();

  const questionButton = page
    .getByRole("button")
    .filter({ hasText: /\d+/ })
    .first();

  await questionButton.click();
  await expect(page).toHaveURL(/\/game\/[^/]+\/?$/);

  await page.keyboard.press("KeyA");

  const devAnswerText = await page.getByText(/Правильный ответ:/).textContent();

  const correctAnswer =
    devAnswerText?.split(":").slice(1).join(":").trim() ?? "";

  const answerInput = page.getByRole("textbox");
  await expect(answerInput).toBeEnabled();

  await answerInput.fill(`${correctAnswer}-incorrect`);
  await page.keyboard.press("Enter");

  await expect(answerInput).toHaveClass(/border-red-500/);
});
