"use client";

import {
  PlayerSetupCard,
  validatePlayers,
  MAX_PLAYERS,
  PLAYERS_KEYS_LIST,
} from "@/entities/player";
import { Button } from "@/shared/ui";
import { Header } from "@/widgets/header";
import useSetupGameStore from "../model/setup-game.store";
import { useEffect, useState } from "react";
import { useStartGame } from "../hooks/use-start-game";

export function SetupGamePage() {
  const { players, addPlayer, playersData, updatePlayerName, removePlayer } =
    useSetupGameStore();

  const [isPlayersValid, setIsPlayersValid] = useState(false);

  const startGame = useStartGame();

  useEffect(() => {
    setIsPlayersValid(validatePlayers(playersData));
  }, [playersData]);

  return (
    <div className="flex flex-col items-center">
      <Header title="Подготовка к игре" />

      <div className="flex flex-wrap gap-14 px-8 py-4 max-w-278">
        {playersData.map((player, index) => (
          <PlayerSetupCard
            playerKey={PLAYERS_KEYS_LIST[index].label}
            key={index}
            isDisabled={players < 4}
            color={player.color}
            index={index}
            onPlayerRemove={removePlayer}
            onNameChange={updatePlayerName}
            value={playersData[index].name}
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
