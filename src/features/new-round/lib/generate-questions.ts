import {
  ITheme,
  IThemeWithQuestions,
  THEMES_COUNT,
  TQuestionDifficulty,
} from "@/entities/game";
import { getRandomItems } from "@/shared/lib";
import { filterMaterial } from "./filter-material";

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

  const responseQuestions = await fetch("/data/questions.json");
  const questions = await responseQuestions.json();

  const chosenMaterial = filterMaterial({
    questions,
    difficulty,
    chosenThemes,
    step,
  });

  setMaterial(chosenMaterial);
}
