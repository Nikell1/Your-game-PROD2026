"use client";

import { useGameStore, getRoundTitle } from "@/entities/game";
import { useAnswerTimeout } from "@/features/answer-question";
import { useFinalQuestionTimeout } from "@/features/final-question";
import { useKeysClick } from "@/features/keys-click";
import {
  CurrentQuestionWidget,
  Header,
  HostWidget,
  PlayersList,
} from "@/widgets";
import { useTimer } from "@siberiacancode/reactuse";
import { useEffect } from "react";

export function QuestionPage() {
  const {
    status,
    activePlayerId,
    isTimerActive,
    timerSeconds,
    setTimerSeconds,
  } = useGameStore();
  const timer = useTimer(timerSeconds, {
    immediately: isTimerActive,
  });

  const questionTimeOut = useAnswerTimeout();
  const finalTimeout = useFinalQuestionTimeout(timer.clear);

  const { handleKeyDown } = useKeysClick(timer.pause);

  const timeoutHandler =
    status === "FINAL_ROUND" ? finalTimeout : questionTimeOut;

  useEffect(() => {
    if (timer.seconds === 0 && isTimerActive) {
      timeoutHandler();
    }
  }, [timer.seconds, isTimerActive, questionTimeOut, timeoutHandler]);

  useEffect(() => {
    if (timerSeconds !== timer.seconds && isTimerActive) {
      setTimerSeconds(timer.seconds);
    }
  }, [timer.seconds]);

  useEffect(() => {
    if (!activePlayerId && status !== "FINAL_ROUND") {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activePlayerId, handleKeyDown, status]);

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
