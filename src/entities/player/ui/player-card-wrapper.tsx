import React from "react";
import { ISetupPlayer } from "../player.types";
import { cn } from "@/shared/lib";

interface PlayerCardProps {
  player: ISetupPlayer;
  children: React.ReactNode;
  className?: string;
}

export function PlayerCardWrapper({
  player,
  children,
  className,
}: PlayerCardProps) {
  return (
    <div
      className={cn(
        "p-4 backdrop-blur-xs border w-55 h-76 flex flex-col gap-4 items-center justify-between rounded-lg",
        className,
      )}
      style={{
        backgroundColor: `${player.color}10`,
        borderColor: player.color,
      }}
    >
      <div
        className="rounded-full size-25 bg-white/70 border"
        style={{ borderColor: player.color }}
      ></div>

      {children}
    </div>
  );
}
