import { ITheme, THEMES_COUNT } from "@/entities/game";
import { getRandomItems } from "@/shared/lib";

export async function generateQuestions(setThemes: (themes: ITheme[]) => void) {
  const responseThemes = await fetch("/data/themes.json");
  const themes = await responseThemes.json();

  const chosenThemes = getRandomItems<ITheme>(themes, THEMES_COUNT);
  setThemes(chosenThemes);

  return;
}
