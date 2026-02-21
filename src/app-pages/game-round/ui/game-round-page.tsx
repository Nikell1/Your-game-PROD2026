"use client";

import {
  useGameStore,
  getRoundTitle,
  QUESTIONS_COUNT,
  THEMES_COUNT,
} from "@/entities/game";
import { useHostPhrases } from "@/entities/host";
import { useFindPlayerInPlayers } from "@/entities/player";
import { useModalStore } from "@/shared/model";
import { Header, HostWidget, QuestionsTable, PlayersList } from "@/widgets";
import { AuctionWidget } from "@/widgets/auction/ui/auction-widget";
import { ModalWidget } from "@/widgets/modal";

import { useEffect } from "react";

export function GameRoundPage() {
  const { status, specials, answeredQuestionsIds, activePlayerId, players } =
    useGameStore();
  const { setModalState } = useModalStore();
  const { say, currentEvent } = useHostPhrases();
  const findPlayer = useFindPlayerInPlayers();

  const headerTitle = getRoundTitle(status);

  useEffect(() => {
    if (answeredQuestionsIds.length === QUESTIONS_COUNT * THEMES_COUNT) {
      setModalState("round_results");
    }
    // if (answeredQuestionsIds.length === 1) {
    //   setModalState("round_results");
    // }
  }, [answeredQuestionsIds, setModalState]);

  useEffect(() => {
    if (
      (currentEvent === "game_started" || currentEvent === "round_2_start") &&
      activePlayerId
    ) {
      setTimeout(() => {
        const activePlayer = findPlayer(activePlayerId);
        say({
          eventType: "question_table_open",
          playerName: activePlayer?.name || null,
        });
      }, 5000);
    }
  });

  return (
    <>
      <Header title={headerTitle} />

      <div className="flex w-full p-8 flex-1">
        <HostWidget />
        <div className="flex-1 flex justify-center">
          {specials === "cat_in_bag" && <></>}
          {specials === "auction" && <AuctionWidget />}
          {specials === "default" && <QuestionsTable />}
        </div>
      </div>

      <PlayersList />
      <ModalWidget />
    </>
  );
}
