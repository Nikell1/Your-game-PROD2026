import { useGameStore } from "@/entities/game";
import { useHostPhrases } from "@/entities/host";
import { useFindPlayerInPlayers } from "@/entities/player";
import { useAnswerInputStore } from "@/features/answer-question";
import { useMemo } from "react";

interface PlayersKey {
  code: string;
  playerId: number;
}

export function useKeysClick(pause: () => void) {
  const { players, setActivePlayerId, setIsTimerActive, currentQuestion } =
    useGameStore();
  const { setInputValue, setIsCorrect } = useAnswerInputStore();
  const { say } = useHostPhrases();
  const findPlayer = useFindPlayerInPlayers();

  const playersKeys = useMemo<PlayersKey[]>(() => {
    return players.map((player) => ({
      code: player.key.code,
      playerId: player.id,
    }));
  }, [players]);

  const handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();

    const currentPlayerId = playersKeys.find(
      (key) => key.code === event.code,
    )?.playerId;

    if (currentPlayerId) {
      setActivePlayerId(currentPlayerId);
      setInputValue("");
      setIsTimerActive(false);
      pause();
      setIsCorrect(null);
      const activePlayer = findPlayer(currentPlayerId);
      say({
        eventType: "regular_question_answer_start",
        playerName: activePlayer?.name,
        price: currentQuestion?.price,
      });
    }
  };

  return { handleKeyDown };
}
