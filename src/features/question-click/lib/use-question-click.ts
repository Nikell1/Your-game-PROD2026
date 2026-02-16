import { IGameQuestion, useGameStore } from "@/entities/game";
import { GAME_ROUTES } from "@/shared/config";
import { useRouter } from "next/navigation";

export function useQuestionClick() {
  const { setActivePlayerId, setCurrentQuestion } = useGameStore();
  const router = useRouter();

  return (question: IGameQuestion) => {
    setActivePlayerId(null);
    setCurrentQuestion(question);

    router.push(GAME_ROUTES.QUESTION(question.id));
  };
}
