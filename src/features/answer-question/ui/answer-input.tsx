"use client";

import { Button, Input } from "@/shared/ui";
import { Send } from "lucide-react";
import { useAnswerQuestion } from "../lib/use-answer-question";
import { useEffect, useRef } from "react";
import { cn, createEnterListener } from "@/shared/lib";
import { useAnswerInputStore } from "../model/answer-input-store";
import { useGameStore } from "@/entities/game";
import { useAnswerFinalQuestion } from "@/features/final-question";

export function AnswerInput({
  clear,
  resume,
}: {
  clear: () => void;
  resume: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { answerHandler, currentQuestion, isOnDev, activePlayerId } =
    useAnswerQuestion(clear, resume);
  const finalAnswerHandler = useAnswerFinalQuestion(clear);
  const { isTimerActive, status, finalQuestion, isShowTimer } = useGameStore();
  const { isCorrect, inputValue, setInputValue } = useAnswerInputStore();

  const handler = status === "FINAL_ROUND" ? finalAnswerHandler : answerHandler;
  const question = status === "FINAL_ROUND" ? finalQuestion : currentQuestion;

  const isDisabled = !activePlayerId || !isShowTimer;

  useEffect(() => {
    if (!isDisabled) {
      const cleanup = createEnterListener(() => handler(inputValue));
      if (!isTimerActive) {
        inputRef.current?.focus();
      }

      return cleanup;
    }
  }, [handler, inputValue, isTimerActive, isDisabled]);

  return (
    <div className="relative">
      {isOnDev && (
        <p className="mb-3 text-foreground/50">
          Правильный ответ: {question?.correctAnswer}
        </p>
      )}
      <Input
        disabled={isDisabled}
        ref={inputRef}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className={cn(
          "text-xl! bg-primary/25 border rounded-lg border-primary",
          isCorrect === true && "border-green-500",
          isCorrect === false && "border-red-500",
        )}
      />
      <Button
        disabled={isDisabled}
        onClick={() => handler(inputValue)}
        variant="ghost"
        className="absolute right-0 bottom-0"
      >
        <Send size={30} />
      </Button>
    </div>
  );
}
