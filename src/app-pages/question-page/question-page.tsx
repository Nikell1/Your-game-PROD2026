"use client";

import { useGameStore, getRoundTitle } from "@/entities/game";
import {
  useAnswerInputStore,
  useDisableQuestion,
} from "@/features/answer-question";
import { useKeysClick } from "@/features/keys-click";
import { useSound } from "@/features/sounds";
import { useCustomTimer } from "@/features/timer";
import {
  CurrentQuestionWidget,
  Header,
  HostWidget,
  PlayersList,
} from "@/widgets";
import { useEffect, useRef } from "react";

export function QuestionPage() {
  const { status, activePlayerId, players } = useGameStore();
  const timer = useCustomTimer();
  const { disabledPlayerIds } = useAnswerInputStore();
  const disableQuestion = useDisableQuestion(timer.clear);
  const disabledRef = useRef(false);

  const { handleKeyDown } = useKeysClick(timer.pause);

  const { playLoopSound } = useSound();

  useEffect(() => {
    if (status === "FINAL_ROUND") {
      playLoopSound("finalQuestion");
    } else {
      playLoopSound("general_question");
    }
  }, [status]);

  useEffect(() => {
    if (!activePlayerId && status !== "FINAL_ROUND") {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activePlayerId, handleKeyDown, status]);

  useEffect(() => {
    const shouldDisable =
      players.length > 0 &&
      players.length === disabledPlayerIds.length &&
      !disabledRef.current;

    if (shouldDisable) {
      disabledRef.current = true;
      disableQuestion();
    }

    if (players.length !== disabledPlayerIds.length) {
      disabledRef.current = false;
    }
  }, [disableQuestion, disabledPlayerIds.length, players.length]);

  const headerTitle = getRoundTitle(status);

  return (
    <>
      <Header title={headerTitle} />

      <div className="flex w-full p-8 flex-1">
        <HostWidget seconds={timer.seconds} />
        <div className="flex-1 flex justify-center">
          <CurrentQuestionWidget clear={timer.clear} resume={timer.resume} />
        </div>
      </div>

      <PlayersList />
    </>
  );
}
