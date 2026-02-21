import { DEFAULT_FINAL_TIMER_SECONDS, useGameStore } from "@/entities/game";
import { GAME_ROUTES } from "@/shared/config";
import { useRouter } from "next/navigation";

export function useFinalQuestionClick() {
  const { setIsTimerActive, setTimerSeconds, finalQuestion } = useGameStore();
  const router = useRouter();

  return () => {
    setIsTimerActive(true);
    setTimerSeconds(DEFAULT_FINAL_TIMER_SECONDS);
    router.replace(GAME_ROUTES.QUESTION(finalQuestion.id));
  };
}
