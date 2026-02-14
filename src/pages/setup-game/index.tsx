"use client";

import { PlayerSetupCard } from "@/entities/player/player-setup-card";
import { Button } from "@/shared/ui";
import { Header } from "@/widgets/header";
import useSetupGameStore from "./setup-game.store";
import { MAX_PLAYERS } from "@/shared/constants";

export function SetupGamePage() {
  const { addPlayer, playersData, updatePlayerName, removePlayer } =
    useSetupGameStore();

  return (
    <div className="flex flex-col items-center">
      <Header title="Подготовка к игре" />

      <div className="flex flex-wrap gap-14 px-8 py-4 max-w-278">
        {playersData.map((player, index) => (
          <PlayerSetupCard
            key={index}
            isDisabled={playersData.length < 4}
            color={player.color}
            index={index}
            onPlayerRemove={removePlayer}
            onNameChange={updatePlayerName}
            value={playersData[index].name}
          />
        ))}

        {playersData.length < MAX_PLAYERS && (
          <Button
            className="border text-8xl size-25 relative mx-13 my-18"
            onClick={() => addPlayer()}
          >
            <span className="absolute -top-2 left-4">+</span>
          </Button>
        )}
      </div>

      <Button size="xl" className="text-2xl px-20 py-6 mt-6">
        Начать игру
      </Button>
    </div>
  );
}
