import { useGameStore } from "@/entities/game";
import { GAME_ROUTES } from "@/shared/config";
import { useRouter } from "next/navigation";

export function useQuestionClick() {
  const { setActivePlayerId, setCurrentQuestion } = useGameStore();
  const router = useRouter();

  return (id: string) => {
    setActivePlayerId(null);
    setCurrentQuestion(id);

    router.push(GAME_ROUTES.QUESTION(id));
  };
}
