"use client";

import { Button, Input } from "@/shared/ui";
import { Trash2 } from "lucide-react";
import { MAX_NAME_LENGTH } from "../player.constants";

interface PlayerSetupCardProps {
  color: string;
  value: string;
  index: number;
  isDisabled: boolean;
  playerKey: string;

  onNameChange: (index: number, name: string) => void;
  onPlayerRemove: (index: number) => void;
}

export function PlayerSetupCard({
  color,
  onNameChange,
  index,
  value,
  isDisabled,
  playerKey,
  onPlayerRemove,
}: PlayerSetupCardProps) {
  return (
    <div
      className="p-4 relative backdrop-blur-xs border w-55 h-72 flex flex-col gap-4 items-center rounded-sm"
      style={{ backgroundColor: `${color}10`, borderColor: color }}
    >
      <Button
        variant="ghost"
        disabled={isDisabled}
        className="absolute right-1 top-3"
        onClick={() => onPlayerRemove(index)}
      >
        <Trash2 style={{ color: color }} className="size-6" />
      </Button>

      <div
        className="rounded-full size-25 bg-white/70 border"
        style={{ borderColor: color }}
      ></div>

      <Input
        onChange={(e) => onNameChange(index, e.target.value)}
        value={value}
        placeholder="Имя игрока"
        className="border text-center text-xl!"
        maxLength={MAX_NAME_LENGTH}
        style={{
          color: color,
          borderColor: color,
        }}
      />

      <p className="text-3xl">{playerKey}</p>
      <Button variant="ghost" className=" text-md" style={{ color: color }}>
        Редактировать профиль
      </Button>
    </div>
  );
}
