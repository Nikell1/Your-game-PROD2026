import { useGameStore } from "@/entities/game";
import useSetupGameStore from "../model/setup-game.store";
import { GAME_ROUTES } from "@/shared/config";
import { useRouter } from "next/navigation";

export function useStartGame() {
  const router = useRouter();

  return () => {
    const { playersData, resetSetupGameStore } = useSetupGameStore.getState();
    const { newGame } = useGameStore.getState();

    newGame(playersData);

    router.push(GAME_ROUTES.ROUND_1);

    resetSetupGameStore();
  };
}
