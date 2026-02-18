import { useGameStore } from "@/entities/game";
import { MAX_SCORE, MIN_SCORE } from "../score-constants";
import { useAuctionStore } from "@/features/auction";

export function useManageScore() {
  const { players: gamePlayers, setPlayers: setGamePlayers } = useGameStore();
  const { players: auctionPlayers, setPlayers: setAuctionPlayers } =
    useAuctionStore();

  function increaseAuctionStore(playerId: number, points: number) {
    if (auctionPlayers) {
      const newAuctionPlayers = auctionPlayers.map((p) =>
        p.id === playerId
          ? { ...p, score: Math.max(p.score + points, MIN_SCORE) }
          : p,
      );

      setAuctionPlayers(newAuctionPlayers);
    }
  }

  function decreaseAuctionStore(playerId: number, points: number) {
    if (auctionPlayers) {
      const newAuctionPlayers = auctionPlayers.map((p) =>
        p.id === playerId
          ? { ...p, score: Math.max(p.score - points, MIN_SCORE) }
          : p,
      );

      setAuctionPlayers(newAuctionPlayers);
    }
  }

  function increaseScore(playerId: number, points: number) {
    const newPlayers = gamePlayers.map((p) =>
      p.id === playerId
        ? { ...p, score: Math.min(p.score + points, MAX_SCORE) }
        : p,
    );
    increaseAuctionStore(playerId, points);
    setGamePlayers(newPlayers);
  }

  function decreaseScore(playerId: number, points: number) {
    const newPlayers = gamePlayers.map((p) =>
      p.id === playerId
        ? { ...p, score: Math.max(p.score - points, MIN_SCORE) }
        : p,
    );

    decreaseAuctionStore(playerId, points);
    setGamePlayers(newPlayers);
  }

  return { increaseScore, decreaseScore };
}
