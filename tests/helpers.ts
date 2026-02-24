import { expect, Page } from "@playwright/test";

export async function createGameWithTwoPlayers(page: Page) {
  await page.goto("/");
  await page.getByRole("link", { name: /Создать игру/i }).click();

  const nameInputs = page.getByPlaceholder("Имя игрока");
  await nameInputs.nth(0).fill("Игрок 1");
  await nameInputs.nth(1).fill("Игрок 2");

  await page.getByRole("button", { name: "Начать игру" }).click();
  await expect(page).toHaveURL(/\/game\/round\/1\/?$/);
}
