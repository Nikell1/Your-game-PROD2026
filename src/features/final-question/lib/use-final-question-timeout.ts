import { useReturnToTable } from "@/features/return-to-table";
import { useGameStore } from "@/entities/game";
import { useHostPhrases } from "@/entities/host";
import { useSound } from "@/features/sounds";

export function useFinalQuestionTimeout(clear: () => void) {
  const { setFinalAnswers } = useGameStore();
  const returnToTable = useReturnToTable();
  const { say } = useHostPhrases();
  const { playSound, stopLoopSound } = useSound();

  return () => {
    setFinalAnswers(false, "");
    clear();

    say({ eventType: "timer_expired" });
    stopLoopSound();
    playSound("timeout");
    setTimeout(() => {
      returnToTable();
    }, 3000);
  };
}
