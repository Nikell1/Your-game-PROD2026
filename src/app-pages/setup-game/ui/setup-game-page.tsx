"use client";

import {
  PlayerCard,
  validatePlayers,
  MAX_PLAYERS,
  PlayerRemoveBtn,
  MIN_PLAYERS,
  PlayerNameInput,
  PlayerEditBtn,
} from "@/entities/player";
import { Button } from "@/shared/ui";
import { Header } from "@/widgets";
import useSetupGameStore from "../model/setup-game.store";
import { useMemo } from "react";
import { useStartGame } from "../hooks/use-start-game";

export function SetupGamePage() {
  const { players, addPlayer, playersData, updatePlayerName, removePlayer } =
    useSetupGameStore();

  const startGame = useStartGame();

  const isPlayersValid = useMemo(
    () => validatePlayers(playersData),
    [playersData],
  );

  return (
    <div className="flex flex-col items-center">
      <Header title="Подготовка к игре" />

      <div className="flex flex-wrap gap-14 px-8 py-4 max-w-278">
        {playersData.map((player, index) => (
          <PlayerCard
            player={player}
            key={index}
            cardTop={
              <PlayerRemoveBtn
                index={index}
                playerColor={player.color}
                isDisabled={players <= MIN_PLAYERS}
                onPlayerRemove={removePlayer}
              />
            }
            cardMain={
              <PlayerNameInput
                index={index}
                player={player}
                onNameChange={updatePlayerName}
              />
            }
            cardBottom={<PlayerEditBtn playerColor={player.color} />}
          />
        ))}

        {players < MAX_PLAYERS && (
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
        onClick={() => startGame()}
      >
        Начать игру
      </Button>
    </div>
  );
}
