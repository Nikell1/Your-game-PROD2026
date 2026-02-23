import { useGameStore } from "@/entities/game";
import { useModalStore } from "@/shared/model";
import { useAuctionStore } from "../model/auction-store";
import { IAuctionPlayer } from "../auction-types";
import { useSound } from "@/features/sounds";

export function useAuctionModal() {
  const { resetModalStore, setModalState } = useModalStore();
  const { setSpecials, players, currentQuestion } = useGameStore();
  const { setPlayers, setMinBet } = useAuctionStore();
  const { playLoopSound } = useSound();

  function showAuctionModal() {
    resetModalStore();
    setModalState("auction");

    setTimeout(() => {
      const auctionPlayers: IAuctionPlayer[] = players.map((player) => ({
        id: player.id,
        isPassed: false,
        name: player.name,
        score: player.score,
        bet: 0,
      }));

      setPlayers(auctionPlayers);
      setMinBet(currentQuestion ? currentQuestion.price : 100);

      setModalState("closed");
      setSpecials("auction");
      playLoopSound("auctionBets");
    }, 3000);
  }

  return { showAuctionModal };
}
