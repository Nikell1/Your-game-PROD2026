import { useGameStore } from "@/entities/game";
import { useHostPhrases } from "@/entities/host";
import { useReturnToTable } from "@/features/return-to-table";

export function useTimeoutReturn() {
  const {
    currentQuestion,
    answeredQuestionsIds,
    setCurrentQuestion,
    setAnsweredQuestionsIds,
    setSpecials,
  } = useGameStore();
  const returnToTable = useReturnToTable();
  const { say } = useHostPhrases();

  return () => {
    if (currentQuestion) {
      setTimeout(() => {
        const newAnswered = [currentQuestion.id, ...answeredQuestionsIds];

        setCurrentQuestion(null);
        setAnsweredQuestionsIds(newAnswered);

        setSpecials("default");

        returnToTable();

        say({
          eventType: "question_table_open",
        });
      }, 3000);
    }
  };
}
