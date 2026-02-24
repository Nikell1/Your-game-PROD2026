import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
});

test("main menu navigates to setup game", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Интеллектуальная викторина")).toBeVisible();

  await page.getByRole("link", { name: /Создать игру/i }).click();

  await expect(
    page.getByRole("heading", { name: "Подготовка к игре" }),
  ).toBeVisible();
});

test("game setup validates players and starts first round", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByText("Интеллектуальная викторина")).toBeVisible();
  await page.getByRole("link", { name: /Создать игру/i }).click();
  await expect(
    page.getByRole("heading", { name: "Подготовка к игре" }),
  ).toBeVisible();

  const nameInputs = page.getByPlaceholder("Имя игрока");
  await expect(nameInputs).toHaveCount(2);

  const startButton = page.getByRole("button", { name: "Начать игру" });
  await expect(startButton).toBeDisabled();

  await nameInputs.nth(0).fill("Игрок 1");
  await nameInputs.nth(1).fill("Игрок 2");

  const validationHint = page.getByText("Имена не могут быть пустыми", {
    exact: false,
  });
  await expect(validationHint).toBeHidden();
  await expect(startButton).toBeEnabled();
  await startButton.click();

  await expect(page).toHaveURL(/\/game\/round\/1\/?$/);
  await expect(page.getByRole("heading", { name: "Раунд 1" })).toBeVisible();
});
