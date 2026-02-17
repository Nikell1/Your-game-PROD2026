import {
  IGameQuestion,
  IQuestion,
  ITheme,
  TQuestionDifficulty,
} from "@/entities/game";
import { getRandomItems } from "@/shared/lib";

export function generateCat(
  allThemes: ITheme[],
  allQuestions: IQuestion[],
  usedThemesIds: Set<string>,
  usedQuestionsIds: Set<string>,
  difficulty: TQuestionDifficulty,
): { question: IGameQuestion; theme: ITheme } | null {
  const availableThemes = allThemes.filter(
    (theme) => !usedThemesIds.has(theme.id),
  );

  if (availableThemes.length === 0) return null;

  const selectedTheme = getRandomItems(availableThemes, 1)[0];

  const themeQuestions = allQuestions.filter(
    (q) =>
      q.themeId === selectedTheme.id &&
      q.difficulty === difficulty &&
      !usedQuestionsIds.has(q.id),
  );

  if (themeQuestions.length === 0) return null;

  const selectedQuestion = getRandomItems(themeQuestions, 1)[0];
  usedQuestionsIds.add(selectedQuestion.id);

  return {
    question: {
      ...selectedQuestion,
      price: -1,
      specials: "cat_in_bag",
    },
    theme: selectedTheme,
  };
}
