"use client";

import {
  validatePlayers,
  MAX_PLAYERS,
  MIN_PLAYERS,
  PlayerSetupCard,
} from "@/entities/player";
import { Button } from "@/shared/ui";
import { Header } from "@/widgets";
import { useSetupGameStore } from "../model/setup-game.store";
import { useMemo } from "react";
import { useStartGame } from "@/features/start-game";

export function SetupGamePage() {
  const {
    players,
    addPlayer,
    playersData,
    updatePlayerName,
    removePlayer,
    resetSetupGameStore,
  } = useSetupGameStore();

  const startGame = useStartGame();

  const isPlayersValid = useMemo(
    () => validatePlayers(playersData),
    [playersData],
  );

  const isRemoveBtnDisabled = useMemo(() => MIN_PLAYERS >= players, [players]);
  const isAddBtnDisabled = useMemo(() => MAX_PLAYERS > players, [players]);

  return (
    <div className="flex flex-col items-center">
      <Header title="Подготовка к игре" />

      <div className="flex flex-wrap gap-14 px-8 py-4 max-w-278">
        {playersData.map((player, index) => (
          <PlayerSetupCard
            key={index}
            player={player}
            index={index}
            onNameChange={updatePlayerName}
            onPlayerRemove={removePlayer}
            isDisabled={isRemoveBtnDisabled}
          />
        ))}

        {isAddBtnDisabled && (
          <Button
            className="border text-8xl size-25 relative mx-13 my-18"
            onClick={() => addPlayer()}
          >
            <span className="absolute -top-2 left-4">+</span>
          </Button>
        )}
      </div>

      <Button
        size="xl"
        className="text-2xl px-20 py-6 mt-6"
        disabled={!isPlayersValid}
        onClick={() => startGame({ playersData, resetSetupGameStore })}
      >
        Начать игру
      </Button>
    </div>
  );
}
