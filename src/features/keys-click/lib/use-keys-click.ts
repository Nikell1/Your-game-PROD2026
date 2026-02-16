import { useGameStore } from "@/entities/game";
import { useMemo } from "react";

interface PlayersKey {
  code: string;
  playerId: number;
}

export function useKeysClick() {
  const { players, setActivePlayerId } = useGameStore();

  const playersKeys = useMemo<PlayersKey[]>(() => {
    return players.map((player) => ({
      code: player.key.code,
      playerId: player.id,
    }));
  }, [players]);

  const handleKeyDown = (event: KeyboardEvent) => {
    const currentPlayerId = playersKeys.find(
      (key) => key.code === event.code,
    )?.playerId;

    if (currentPlayerId) {
      setActivePlayerId(currentPlayerId);
    }
  };

  return { handleKeyDown };
}
