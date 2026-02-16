"use client";

import { useGameStore } from "@/entities/game";
import { AnswerInput } from "@/features/answer-question";
import { Frame } from "@/shared/ui";
import { useParams } from "next/navigation";

export function CurrentQuestionWidget() {
  const { questionId } = useParams();
  const { questions, themes, activePlayerId } = useGameStore();

  const currentQuestion = questions.find((q) => q.id === questionId);
  const currentTheme = themes.find(
    (theme) => theme.id === currentQuestion?.themeId,
  );

  const elementClass =
    "bg-primary/25 border py-3 px-6 rounded-lg text-2xl border-primary";

  return (
    <Frame className="max-h-120 w-200 rounded-lg gap-4 p-6!">
      <div className="flex justify-between">
        <span className={elementClass}>Тема: {currentTheme?.label}</span>
        <span className={elementClass}>Цена: {currentQuestion?.price}</span>
      </div>
      <p className="text-3xl flex-1">{currentQuestion?.label}</p>
      {activePlayerId && <AnswerInput />}
    </Frame>
  );
}
