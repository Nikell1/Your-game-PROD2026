import { useGameStore } from "@/entities/game";
import { useCallback } from "react";

export function useEndFinal() {
  const { finalBets, answeredPlayersIds } = useGameStore();

  return useCallback(() => {
    console.log("🏆 Завершение финала с данными:", {
      answeredPlayersIds,
      finalBets,
    });

    const state = useGameStore.getState();
    const currentPlayers = [...state.players];

    const updatedPlayers = currentPlayers.map((player) => {
      const answer = answeredPlayersIds.find((a) => a.id === player.id);
      const bet = finalBets.find((b) => b.playerId === player.id);

      if (!answer || !bet) return player;

      const scoreChange = answer.isCorrect ? bet.bet : -bet.bet;

      return {
        ...player,
        score: player.score + scoreChange,
      };
    });

    useGameStore.setState({
      players: updatedPlayers,
      status: "ENDING",
    });
  }, [finalBets, answeredPlayersIds]);
}
