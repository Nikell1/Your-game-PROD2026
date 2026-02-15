import { useGameStore } from "@/entities/game";
import { GAME_ROUTES } from "@/shared/config";
import { useRouter } from "next/navigation";

export function useQuestionClick() {
  const { players, setPlayers } = useGameStore();
  const router = useRouter();

  return (id: string) => {
    const newPlayers = players.map((player) => ({
      ...player,
      isActive: false,
    }));

    setPlayers(newPlayers);
    router.push(GAME_ROUTES.QUESTION(id));
  };
}
