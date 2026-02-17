import {
  IQuestion,
  ITheme,
  IThemeWithQuestions,
  TQuestionDifficulty,
} from "@/entities/game";
import { getSpecialPositions } from "./get-specials-positions";
import { generateCat } from "@/features/cat-in-bag";

interface Props {
  chosenMaterial: IThemeWithQuestions[];
  allThemes: ITheme[];
  allQuestions: IQuestion[];
  usedThemesIds: string[];
  usedQuestionIds: string[];
  difficulty: TQuestionDifficulty;
  step: number;
}

export function generateSpecials({
  chosenMaterial,
  allThemes,
  usedThemesIds,
  usedQuestionIds,
  difficulty,
  allQuestions,
  step,
}: Props): {
  extraMaterial: IThemeWithQuestions[];
  newUsedThemesIds: string[];
  newUsedQuestionsIds: string[];
} {
  const result = chosenMaterial.map((item) => ({
    theme: { ...item.theme },
    questions: [...item.questions],
  }));

  const updatedUsedThemesIds = new Set(usedThemesIds);
  const updatedUsedQuestionsIds = new Set(usedQuestionIds);

  const specialsPositions = getSpecialPositions();

  for (const pos of specialsPositions) {
    const { themeIndex, priceIndex, type } = pos;

    if (!result[themeIndex] || !result[themeIndex].questions[priceIndex]) {
      continue;
    }

    if (type === "cat") {
      const catResult = generateCat(
        allThemes,
        allQuestions,
        updatedUsedThemesIds,
        updatedUsedQuestionsIds,
        difficulty,
      );

      if (catResult) {
        result[themeIndex].questions[priceIndex] = {
          ...catResult.question,
          price: step * (priceIndex + 1),
        };
      }
    }

    if (type === "auction") {
      result[themeIndex].questions[priceIndex] = {
        ...result[themeIndex].questions[priceIndex],
        specials: "auction",
      };
    }
  }

  return {
    extraMaterial: result,
    newUsedThemesIds: Array.from(updatedUsedThemesIds),
    newUsedQuestionsIds: Array.from(updatedUsedQuestionsIds),
  };
}
