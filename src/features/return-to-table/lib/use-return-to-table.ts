import { useGameStore } from "@/entities/game";
import { useAnswerInputStore } from "@/features/answer-question";
import { GAME_ROUTES } from "@/shared/config";
import { useRouter } from "next/navigation";

export function useReturnToTable() {
  const router = useRouter();
  const { resetAnswerInputStore } = useAnswerInputStore();
  const { status } = useGameStore();
  const path =
    status === "ROUND_1"
      ? GAME_ROUTES.ROUND_1
      : status === "ROUND_2"
        ? GAME_ROUTES.ROUND_2
        : GAME_ROUTES.FINAL_ROUND;

  return () => {
    resetAnswerInputStore();
    router.replace(path);
  };
}
