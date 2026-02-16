import {
  IGameQuestion,
  IQuestion,
  ITheme,
  TQuestionDifficulty,
} from "@/entities/game";
import { getRandomItems } from "@/shared/lib";

interface GenerateCatInBagProps {
  allQuestions: IQuestion[];
  allThemes: ITheme[];
  usedThemeIds: string[];
  difficulty: TQuestionDifficulty;
}

export function generateCatInBagQuestion({
  allQuestions,
  allThemes,
  usedThemeIds,
  difficulty,
}: GenerateCatInBagProps): {
  question: IGameQuestion;
  originalTheme: ITheme;
} | null {
  const availableThemes = allThemes.filter(
    (theme) => !usedThemeIds.includes(theme.id),
  );

  const randomTheme = getRandomItems(availableThemes, 1)[0];

  const themeQuestions = allQuestions.filter(
    (q) => q.themeId === randomTheme.id && q.difficulty === difficulty,
  );

  const randomQuestion = getRandomItems(themeQuestions, 1)[0];

  const catQuestion: IGameQuestion = {
    ...randomQuestion,
    price: -1,
    specials: "cat_in_bag",
  };

  return {
    question: catQuestion,
    originalTheme: randomTheme,
  };
}
