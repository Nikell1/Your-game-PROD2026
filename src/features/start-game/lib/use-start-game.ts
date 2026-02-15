import { useGameStore } from "@/entities/game";
import { ISetupPlayer } from "@/entities/player";
import { GAME_ROUTES } from "@/shared/config";
import { useRouter } from "next/navigation";
import { setGamePlayers } from "./set-game-players";
import { generateQuestions } from "./generate-questions";

interface Props {
  playersData: ISetupPlayer[];
  resetSetupGameStore: () => void;
}

export function useStartGame() {
  const { setPlayers, setStatus, setThemes } = useGameStore();
  const router = useRouter();

  return ({ playersData, resetSetupGameStore }: Props) => {
    setGamePlayers({ playersData, setPlayers });
    resetSetupGameStore();

    generateQuestions(setThemes);

    setStatus("ROUND_1");

    router.push(GAME_ROUTES.ROUND_1);
  };
}
