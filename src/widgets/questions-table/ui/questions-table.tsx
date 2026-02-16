"use client";

import {
  IGameQuestion,
  QUESTIONS_COUNT,
  ROUND_1_PRICE_STEP,
  useGameStore,
} from "@/entities/game";
import { useQuestionClick } from "@/features/question-click";
import { Button, Frame } from "@/shared/ui";
import { useCallback, useMemo } from "react";

export function QuestionsTable() {
  const { themes, questions } = useGameStore();
  const questionClick = useQuestionClick();

  const prices = Array.from(
    { length: QUESTIONS_COUNT },
    (_, i) => ROUND_1_PRICE_STEP * (i + 1),
  );

  const questionsByThemeAndPrice = useMemo(() => {
    const map = new Map<string, IGameQuestion>();
    questions.forEach((q) => {
      map.set(`${q.themeId}-${q.price}`, q);
    });
    return map;
  }, [questions]);

  const getQuestionByThemeAndPrice = useCallback(
    (themeId: string, price: number) =>
      questionsByThemeAndPrice.get(`${themeId}-${price}`),
    [questionsByThemeAndPrice],
  );

  return (
    <Frame className="rounded-xl max-h-120 gap-6 px-8! py-6!">
      {themes.map((theme) => (
        <div key={theme.id} className="flex gap-6">
          <Frame className="w-70 p-2! text-xl rounded-lg">{theme.label}</Frame>
          {prices.map((price) => {
            const question = getQuestionByThemeAndPrice(theme.id, price);

            if (question) {
              return (
                <Button
                  key={`${theme.id}-${price}`}
                  className="text-2xl w-18 h-full rounded-xl"
                  onClick={() => questionClick(question.id)}
                >
                  {price}
                </Button>
              );
            } else
              return (
                <Button
                  key={`${theme.id} - ${price}`}
                  className="w-18 h-full rounded-xl"
                  disabled
                />
              );
          })}
        </div>
      ))}
    </Frame>
  );
}
