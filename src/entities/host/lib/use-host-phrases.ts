import { useHostStore } from "../model/host-store";
import { getRandomPhrase, GetRandomPhraseOptions } from "./get-random-phrase";
import { useCallback } from "react";

export function useHostPhrases() {
  const { setCurrentPhrase, currentEvent, currentPhrase } = useHostStore();

  const say = useCallback(
    ({
      eventType,
      playerName,
      excludeLastId,
      price,
      bet,
    }: GetRandomPhraseOptions) => {
      const phrase = getRandomPhrase({
        eventType,
        playerName,
        excludeLastId,
        price,
        bet,
      });
      setCurrentPhrase(phrase?.label || "");
    },
    [setCurrentPhrase],
  );

  return { say, currentEvent, currentPhrase };
}
