import { useHostPhrases } from "@/entities/host";
import { useTimeoutReturn } from "./use-timeout-return";
import { useGameStore } from "@/entities/game";
import { useSound } from "@/features/sounds";

export function useDisableQuestion(clear: () => void) {
  const timeoutReturn = useTimeoutReturn();
  const { say } = useHostPhrases();
  const { currentQuestion, setShowCorrectAnswer } = useGameStore();
  const { playSound, stopLoopSound } = useSound();

  return () => {
    clear();
    say({
      eventType: "all_players_incorrect",
      correctAnswer: currentQuestion?.correctAnswer,
    });
    setShowCorrectAnswer(true);
    setTimeout(() => {
      stopLoopSound();
      playSound("no_answer");
    }, 1000);
    timeoutReturn();
  };
}
