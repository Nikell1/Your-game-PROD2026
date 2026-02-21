"use client";

import { useGameStore } from "@/entities/game";
import { Frame } from "@/shared/ui";
import Image from "next/image";

export function HostWidget({ seconds }: { seconds?: number }) {
  const { currentQuestion, finalQuestion, isTimerActive } = useGameStore();

  const showTimer =
    currentQuestion?.isAnswering || (finalQuestion && isTimerActive);

  return (
    <div className="flex flex-col h-full justify-between items-center relative z-3 shrink-0">
      <div>
        <Frame className="rounded-lg size-60 p-4">
          <p className="text-xl">Олег, выбирайте вопрос!</p>
        </Frame>

        {showTimer && (
          <Frame className="rounded-md mt-4 w-full absolute justify-between p-4">
            <span>Оставшееся время:</span>
            <span>{seconds}</span>
          </Frame>
        )}
      </div>

      <Image
        className="relative bottom-2"
        src="/host-image.png"
        width={213}
        height={359}
        alt="Ведущий"
        loading="eager"
      />
    </div>
  );
}
