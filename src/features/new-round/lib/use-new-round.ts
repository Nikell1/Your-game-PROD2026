import { ROUND_1_PRICE_STEP, useGameStore } from "@/entities/game";
import { ISetupPlayer } from "@/entities/player";
import { GAME_ROUTES } from "@/shared/config";
import { useRouter } from "next/navigation";
import { setGamePlayers } from "./set-game-players";
import { generateQuestions } from "./generate-questions";

interface Props {
  playersData: ISetupPlayer[];
  resetSetupGameStore: () => void;
}

export function useNewRound() {
  const {
    setPlayers,
    setStatus,
    setMaterial,
    setActivePlayerId,
    setAnsweredQuestionsIds,
  } = useGameStore();
  const router = useRouter();

  return ({ playersData, resetSetupGameStore }: Props) => {
    setGamePlayers({ playersData, setPlayers });
    setActivePlayerId(1);
    setAnsweredQuestionsIds([]);
    resetSetupGameStore();

    generateQuestions({
      setMaterial,
      difficulty: "easy",
      step: ROUND_1_PRICE_STEP,
    });

    setStatus("ROUND_1");

    router.push(GAME_ROUTES.ROUND_1);
  };
}
