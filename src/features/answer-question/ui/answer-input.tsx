"use client";

import { Button, Input } from "@/shared/ui";
import { Send } from "lucide-react";
import { useAnswerQuestion } from "../lib/use-answer-question";
import { useState } from "react";
import { cn } from "@/shared/lib";

export function AnswerInput() {
  const { answerHandler, isCorrect } = useAnswerQuestion();
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          "text-xl! bg-primary/25 border rounded-lg border-primary",
          isCorrect === true && "border-green-500",
          isCorrect === false && "border-red-500",
        )}
      />
      <Button
        onClick={() => answerHandler(value)}
        variant="ghost"
        className="absolute right-0 top-0"
      >
        <Send size={30} />
      </Button>
    </div>
  );
}
