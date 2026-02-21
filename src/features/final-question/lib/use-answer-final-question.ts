import { useGameStore } from "@/entities/game";
import { useReturnToTable } from "@/features/return-to-table";

export function useAnswerFinalQuestion(clear: () => void) {
  const { finalQuestion, setFinalAnswers, activePlayerId, setIsTimerActive } =
    useGameStore();

  const returnToTable = useReturnToTable();

  return (answer: string) => {
    if (activePlayerId) {
      setIsTimerActive(false);
      if (
        finalQuestion.correctAnswer.toLowerCase().replace(/\s/g, "") ===
        answer.toLowerCase().replace(/\s/g, "")
      ) {
        setFinalAnswers(true);
      } else {
        setFinalAnswers(false);
      }

      clear();

      returnToTable();
    }
  };
}
