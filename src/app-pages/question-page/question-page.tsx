"use client";

import { useGameStore, getRoundTitle } from "@/entities/game";
import {
  CurrentQuestionWidget,
  Header,
  HostWidget,
  PlayersList,
} from "@/widgets";

export function QuestionPage() {
  const { status } = useGameStore();

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
