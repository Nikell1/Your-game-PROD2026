import { useGameStore } from "@/entities/game";

export function useManageScore() {
  const { players, setPlayers } = useGameStore();

  function increaseScore(playerId: number, points: number) {
    const newPlayers = players.map((p) =>
      p.id === playerId ? { ...p, score: p.score + points } : p,
    );

    setPlayers(newPlayers);
  }

  function decreaseScore(playerId: number, points: number) {
    const newPlayers = players.map((p) =>
      p.id === playerId ? { ...p, score: p.score - points } : p,
    );

    setPlayers(newPlayers);
  }

  return { increaseScore, decreaseScore };
}
