"use client";

import { useGameStore } from "@/entities/game";
import { Button, Frame } from "@/shared/ui";

export function QuestionsTable() {
  const { themes } = useGameStore();

  return (
    <Frame className="rounded-xl max-h-120 gap-6 px-8! py-6!">
      {themes.map((theme) => (
        <div key={theme.id} className="flex gap-6">
          <Frame className="w-70 p-2! text-xl rounded-lg">{theme.label}</Frame>
          <Button className="text-2xl w-18 h-full rounded-xl">100</Button>
          <Button className="text-2xl w-18 h-full rounded-xl">100</Button>
          <Button className="text-2xl w-18 h-full rounded-xl">100</Button>
          <Button className="text-2xl w-18 h-full rounded-xl">100</Button>
          <Button className="text-2xl w-18 h-full rounded-xl">100</Button>
        </div>
      ))}
    </Frame>
  );
}
