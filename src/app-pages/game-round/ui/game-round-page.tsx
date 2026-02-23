"use client";

import {
  useGameStore,
  getRoundTitle,
  QUESTIONS_COUNT,
  THEMES_COUNT,
} from "@/entities/game";
import { useSound } from "@/features/sounds";
import { useModalStore } from "@/shared/model";
import { Header, HostWidget, QuestionsTable, PlayersList } from "@/widgets";
import { AuctionWidget } from "@/widgets/auction/ui/auction-widget";
import { ModalWidget } from "@/widgets/modal";

import { useEffect } from "react";

export function GameRoundPage() {
  const { status, specials, answeredQuestionsIds } = useGameStore();
  const { setModalState, modalState } = useModalStore();

  const headerTitle = getRoundTitle(status);

  const { playLoopSound, stopLoopSound, playSound } = useSound();
  useEffect(() => {
    // if (answeredQuestionsIds.length === QUESTIONS_COUNT * THEMES_COUNT) {
    //   setModalState("round_results");
    //   stopLoopSound();
    //   playSound("roundEnd");
    // }
    if (answeredQuestionsIds.length === 1) {
      setModalState("round_results");
      stopLoopSound();
      playSound("roundEnd");
    }
  }, [answeredQuestionsIds, setModalState]);

  useEffect(() => {
    if (modalState !== "round_results") {
      playLoopSound("categories");
    }
  }, [modalState]);

  return (
    <>
      <Header title={headerTitle} />

      <div className="flex w-full p-8 flex-1">
        <HostWidget />
        <div className="flex-1 flex justify-center">
          {specials === "cat_in_bag" && <QuestionsTable />}
          {specials === "auction" && <AuctionWidget />}
          {specials === "default" && <QuestionsTable />}
        </div>
      </div>

      <PlayersList />
      <ModalWidget />
    </>
  );
}
