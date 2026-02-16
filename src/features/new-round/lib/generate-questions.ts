import {
  ITheme,
  IThemeWithQuestions,
  ROUND_1_PRICE_STEP,
  THEMES_COUNT,
  TQuestionDifficulty,
} from "@/entities/game";
import { getRandomItems } from "@/shared/lib";
import { filterMaterial } from "./filter-material";
import { generateCats } from "./generate-cats";

interface Props {
  setMaterial: (material: IThemeWithQuestions[]) => void;
  difficulty: TQuestionDifficulty;
  step: number;
}

export async function generateQuestions({
  difficulty,
  step,
  setMaterial,
}: Props) {
  const responseThemes = await fetch("/data/themes.json");
  const themes = await responseThemes.json();

  const chosenThemes = getRandomItems<ITheme>(themes, THEMES_COUNT);
  const chosenThemesIds = chosenThemes.map((theme) => theme.id);

  const responseQuestions = await fetch("/data/questions.json");
  const questions = await responseQuestions.json();

  const { chosenMaterial, usedQuestionIds } = filterMaterial({
    questions,
    difficulty,
    chosenThemes,
    step,
  });

  const { extraMaterial } = generateCats({
    step: ROUND_1_PRICE_STEP,
    chosenMaterial,
    allQuestions: questions,
    allThemes: themes,
    difficulty,
    usedThemesIds: chosenThemesIds,
    usedQuestionIds,
  });

  setMaterial(extraMaterial);
}
