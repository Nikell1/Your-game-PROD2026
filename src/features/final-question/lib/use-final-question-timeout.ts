import { useReturnToTable } from "@/features/return-to-table";
import { useGameStore } from "@/entities/game";

export function useFinalQuestionTimeout(clear: () => void) {
  const { setIsTimerActive, setFinalAnswers } = useGameStore();
  const returnToTable = useReturnToTable();

  return () => {
    setIsTimerActive(false);
    setFinalAnswers(false);
    clear();
    console.log(333);

    returnToTable();
  };
}
