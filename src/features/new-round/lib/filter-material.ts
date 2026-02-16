import {
  IGameQuestion,
  IQuestion,
  ITheme,
  QUESTIONS_COUNT,
  IThemeWithQuestions,
  TQuestionDifficulty,
} from "@/entities/game";
import { getRandomItems } from "@/shared/lib";

interface Props {
  questions: IQuestion[];
  chosenThemes: ITheme[];
  difficulty: TQuestionDifficulty;
  step: number;
}

export function filterMaterial({
  questions,
  chosenThemes,
  difficulty,
  step,
}: Props): {
  usedQuestionIds: string[];
  chosenMaterial: IThemeWithQuestions[];
} {
  const themeIds = new Set(chosenThemes.map((theme) => theme.id));

  const regularQuestions = questions.filter(
    (q) => themeIds.has(q.themeId) && q.difficulty === difficulty,
  );

  const questionsByTheme = new Map<string, IQuestion[]>();
  regularQuestions.forEach((q) => {
    if (!questionsByTheme.has(q.themeId)) {
      questionsByTheme.set(q.themeId, []);
    }
    questionsByTheme.get(q.themeId)!.push(q);
  });

  const result: IThemeWithQuestions[] = [];
  const usedQuestionIds: string[] = [];

  for (const theme of chosenThemes) {
    const themeQuestions = questionsByTheme.get(theme.id) || [];
    const randomQuestions = getRandomItems<IQuestion>(
      themeQuestions,
      QUESTIONS_COUNT,
    );

    const randomQuestionsIds = randomQuestions.map((item) => item.id);

    usedQuestionIds.push(...randomQuestionsIds);

    const gameQuestions: IGameQuestion[] = randomQuestions.map((q, index) => ({
      ...q,
      specials: "default",
      price: (index + 1) * step,
    }));

    result.push({
      theme,
      questions: gameQuestions,
    });
  }

  return { chosenMaterial: result, usedQuestionIds };
}
