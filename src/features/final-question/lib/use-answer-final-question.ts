import { useGameStore } from "@/entities/game";
import { useReturnToTable } from "@/features/return-to-table";
import { useSound } from "@/features/sounds";

export function useAnswerFinalQuestion(clear: () => void) {
  const { finalQuestion, setFinalAnswers, activePlayerId } = useGameStore();
  const {} = useSound();

  const returnToTable = useReturnToTable();

  return (answer: string) => {
    if (activePlayerId) {
      clear();
      if (
        finalQuestion.correctAnswer.toLowerCase().replace(/\s/g, "") ===
        answer.toLowerCase().replace(/\s/g, "")
      ) {
        setFinalAnswers(true, answer);
      } else {
        setFinalAnswers(false, answer);
      }

      returnToTable();
    }
  };
}
