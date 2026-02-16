import { useGameStore } from "@/entities/game";
import { useManageScore } from "@/features/manage-user-score";
import { useState } from "react";

type IsCorrect = boolean | null;

export function useAnswerQuestion() {
  const { currentQuestionId, questions, activePlayerId } = useGameStore();
  const { increaseScore, decreaseScore } = useManageScore();
  const [isCorrect, setIsCorrect] = useState<IsCorrect>(null);

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  function answerHandler(answer: string) {
    if (currentQuestion && activePlayerId) {
      if (currentQuestion.correctAnswer === answer) {
        setIsCorrect(true);
        increaseScore(activePlayerId, currentQuestion.price);
      } else {
        setIsCorrect(false);
        decreaseScore(activePlayerId, currentQuestion.price);
      }
    } else {
      setIsCorrect(null);
    }
  }
  return { answerHandler, isCorrect };
}
