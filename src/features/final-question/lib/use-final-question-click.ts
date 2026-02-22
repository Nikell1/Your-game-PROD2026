import { DEFAULT_FINAL_TIMER_SECONDS, useGameStore } from "@/entities/game";
import { useHostPhrases } from "@/entities/host";
import { useFindPlayerInPlayers } from "@/entities/player";
import { useCustomTimer } from "@/features/timer";
import { GAME_ROUTES } from "@/shared/config";
import { useRouter } from "next/navigation";

export function useFinalQuestionClick() {
  const { finalQuestion, activePlayerId } = useGameStore();
  const { start } = useCustomTimer();
  const router = useRouter();
  const { say } = useHostPhrases();
  const findPlayer = useFindPlayerInPlayers();

  return () => {
    if (activePlayerId) {
      const activePlayer = findPlayer(activePlayerId);
      start(DEFAULT_FINAL_TIMER_SECONDS);
      router.replace(GAME_ROUTES.QUESTION(finalQuestion.id));
      say({ eventType: "final_answer_start", playerName: activePlayer?.name });
    }
  };
}
