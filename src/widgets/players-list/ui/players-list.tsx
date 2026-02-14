"use client";

import { useGameStore } from "@/entities/game";
import { PlayerCard } from "@/entities/player";
import { ScoreControls } from "@/features/manage-user-score";

export function PlayersList() {
  const { playersInGame } = useGameStore();
  return (
    <div className="w-full absolute bottom-0">
      <div className="w-full h-30 bg-accent/50 backdrop-blur-xs border border-primary border-b-0 rounded-t-[80px]" />

      <div>
        {playersInGame.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            cardMain={
              <p className="text-xl" style={{ color: player.color }}>
                1
              </p>
            }
            cardBottom={<ScoreControls player={player} />}
          />
        ))}
      </div>
    </div>
  );
}
