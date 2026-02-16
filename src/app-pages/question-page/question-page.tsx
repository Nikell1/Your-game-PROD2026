"use client";

import { useGameStore, getRoundTitle } from "@/entities/game";
import { useKeysClick } from "@/features/keys-click";
import {
  CurrentQuestionWidget,
  Header,
  HostWidget,
  PlayersList,
} from "@/widgets";
import { useEffect } from "react";

export function QuestionPage() {
  const { status, activePlayerId } = useGameStore();
  const { handleKeyDown } = useKeysClick();

  useEffect(() => {
    if (!activePlayerId) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activePlayerId, handleKeyDown]);

  const headerTitle = getRoundTitle(status);

  return (
    <>
      <Header title={headerTitle} />

      <div className="flex w-full p-8 flex-1">
        <HostWidget />
        <div className="flex-1 flex justify-center">
          <CurrentQuestionWidget />
        </div>
      </div>

      <PlayersList />
    </>
  );
}
