import { useGameStore } from "@/entities/game";
import { useManageScore } from "@/features/manage-user-score";
import { useAnswerInputStore } from "../model/answer-input-store";
import { useReturnToTable } from "@/features/return-to-table";
import { useHostPhrases } from "@/entities/host";
import { useFindPlayerInPlayers } from "@/entities/player";

export function useAnswerQuestion(clear: () => void, resume: () => void) {
  const {
    activePlayerId,
    setActivePlayerId,
    isOnDev,
    setAnsweredQuestionsIds,
    answeredQuestionsIds,
    currentQuestion,
    setCurrentQuestion,
    setIsTimerActive,
    setSpecials,
    specials,
  } = useGameStore();

  const { increaseScore, decreaseScore } = useManageScore();
  const { isCorrect, setIsCorrect } = useAnswerInputStore();
  const returnToTable = useReturnToTable();
  const { say } = useHostPhrases();
  const findPlayer = useFindPlayerInPlayers();

  function answerHandler(answer: string) {
    if (currentQuestion && activePlayerId) {
      const activePlayer = findPlayer(activePlayerId);
      if (
        currentQuestion.correctAnswer.toLowerCase().replace(/\s/g, "") ===
        answer.toLowerCase().replace(/\s/g, "")
      ) {
        say({
          eventType: "regular_correct_answer",
          playerName: activePlayer?.name,
          price: currentQuestion.price,
        });

        setIsCorrect(true);
        increaseScore(activePlayerId, currentQuestion.price);

        setTimeout(() => {
          const newAnswered = [currentQuestion.id, ...answeredQuestionsIds];

          setAnsweredQuestionsIds(newAnswered);

          setSpecials("default");

          clear();

          setCurrentQuestion(null);

          returnToTable();
        }, 3000);
      } else {
        decreaseScore(activePlayerId, currentQuestion.price);

        if (specials === "default") {
          setIsCorrect(false);

          resume();

          setIsTimerActive(true);

          setActivePlayerId(null);
        } else if (specials === "auction" || specials === "cat_in_bag") {
          const newAnswered = [currentQuestion.id, ...answeredQuestionsIds];

          setAnsweredQuestionsIds(newAnswered);

          setSpecials("default");

          clear();

          setCurrentQuestion(null);

          returnToTable();
        }
      }
    } else {
      setIsCorrect(null);
    }
  }
  return { answerHandler, isCorrect, currentQuestion, activePlayerId, isOnDev };
}
