import { useGameStore } from "@/entities/game";
import { useHostPhrases } from "@/entities/host";
import { useManageScore } from "@/features/manage-user-score";
import { useTimeoutReturn } from "./use-timeout-return";
import { useSound } from "@/features/sounds";

export function useAnswerTimeout(clear: () => void) {
  const { currentQuestion, prevActivePlayerId } = useGameStore();
  const { say } = useHostPhrases();
  const timeoutReturn = useTimeoutReturn();
  const { setIsShowTimer, setIsTimerActive, setShowCorrectAnswer } =
    useGameStore();
  const { playSound, stopLoopSound } = useSound();

  const { decreaseScore } = useManageScore();
  return () => {
    if (currentQuestion) {
      setIsTimerActive(false);
      setIsShowTimer(false);
      clear();
      stopLoopSound();
      playSound("timeout");
      setShowCorrectAnswer(true);
      if (
        currentQuestion.specials === "auction" ||
        currentQuestion.specials === "cat_in_bag"
      ) {
        decreaseScore(prevActivePlayerId || -1, currentQuestion.price);
      }
      say({ eventType: "timer_expired" });

      timeoutReturn();
    }
  };
}
