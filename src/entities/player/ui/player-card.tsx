import React from "react";
import { ISetupPlayer } from "../player.types";

interface PlayerCardProps {
  player: ISetupPlayer;
  cardTop?: React.ReactNode;
  cardMain: React.ReactNode;
  cardBottom: React.ReactNode;
}

export function PlayerCard({
  player,
  cardTop,
  cardMain,
  cardBottom,
}: PlayerCardProps) {
  return (
    <div
      className="p-4 backdrop-blur-xs border w-55 h-75 flex flex-col gap-4 items-center rounded-sm"
      style={{
        backgroundColor: `${player.color}10`,
        borderColor: player.color,
      }}
    >
      <div
        className="rounded-full size-25 bg-white/70 border"
        style={{ borderColor: player.color }}
      ></div>

      {cardTop}

      {cardMain}

      <p className="text-3xl">{player.key}</p>

      {cardBottom}
    </div>
  );
}
