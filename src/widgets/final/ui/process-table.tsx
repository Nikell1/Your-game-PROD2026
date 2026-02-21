import { useGameStore } from "@/entities/game";
import { useModalStore } from "@/shared/model";
import { Frame } from "@/shared/ui";
import { PlayersBets } from "./players-bets";
import { PlayerTurn } from "./player-turn";
import { useFinalQuestionClick } from "@/features/final-question";
import { useEffect, useMemo, useRef } from "react";
import { useEndFinal } from "@/features/final-round";

export function ProcessTable() {
  const {
    finalQuestion,
    players,
    finalBets,
    setActivePlayerId,
    activePlayerId,
    answeredPlayersIds,
  } = useGameStore();
  const { setModalState } = useModalStore();
  const finalQuestionClick = useFinalQuestionClick();
  const endFinal = useEndFinal();

  const playersWithoutBet = useMemo(
    () =>
      players.filter(
        (player) => !finalBets.some((bet) => bet.playerId === player.id),
      ),
    [players, finalBets],
  );

  useEffect(() => {
    if (players[0] && playersWithoutBet.length === 0 && !activePlayerId) {
      setActivePlayerId(players[0].id);
    }
  }, [activePlayerId, players, playersWithoutBet, setActivePlayerId]);

  const finalCompletedRef = useRef(false);

  useEffect(() => {
    if (finalCompletedRef.current) return;

    const hasUnansweredPlayers = players.some(
      (player) =>
        !answeredPlayersIds.some((answered) => answered.id === player.id),
    );

    if (!hasUnansweredPlayers && players.length > 0) {
      finalCompletedRef.current = true;
      endFinal();
    }
  }, [players, answeredPlayersIds, endFinal]);

  const answeringPlayer = players.find((p) => p.id === activePlayerId);
  return (
    <Frame className="rounded-xl py-4 px-8 flex-col gap-8 w-240 max-h-120">
      <Frame className="p-2 rounded-lg text-2xl justify-center">
        Тема финала: {finalQuestion.themeLabel}
      </Frame>
      {playersWithoutBet[0] ? (
        <PlayersBets
          playersWithoutBet={playersWithoutBet}
          setModalState={setModalState}
        />
      ) : (
        <PlayerTurn
          answeringPlayer={answeringPlayer}
          finalQuestionClick={finalQuestionClick}
        />
      )}
    </Frame>
  );
}
