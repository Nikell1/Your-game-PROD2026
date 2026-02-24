import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
});

test("the button is disabled until all names are valid", async ({ page }) => {
  await page.goto("/game/setup");

  const nameInputs = page.getByPlaceholder("Имя игрока");
  const startButton = page.getByRole("button", { name: "Начать игру" });

  await expect(startButton).toBeDisabled();

  await nameInputs.first().fill("Игрок 1");
  await expect(startButton).toBeDisabled();

  await nameInputs.first().fill("А".repeat(20));
  const firstValue = await nameInputs.first().inputValue();
  expect(firstValue.length).toBe(14);

  await nameInputs.nth(1).fill("Игрок 2");

  await expect(startButton).toBeEnabled();

  await nameInputs.first().fill("");
  await expect(startButton).toBeDisabled();

  await nameInputs.first().fill("Игрок 1");
  await expect(startButton).toBeEnabled();
});

test("should add new player", async ({ page }) => {
  await page.goto("/game/setup");

  const nameInputs = page.getByPlaceholder("Имя игрока");
  const initialCount = await nameInputs.count();

  const addPlayerButton = page.getByRole("button", { name: "+" });
  await addPlayerButton.click();

  await expect(nameInputs).toHaveCount(initialCount + 1);
});
