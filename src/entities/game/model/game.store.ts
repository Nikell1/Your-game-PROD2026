import {
  IActivePlayer,
  ISetupPlayer,
  PLAYERS_KEYS_LIST,
} from "@/entities/player";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameStatus } from "../game.types";

interface GameStoreState {
  status: GameStatus;
  players: IActivePlayer[];
}

interface GameStoreActions {
  newGame: (players: ISetupPlayer[]) => void;
  setPlayers: (players: IActivePlayer[]) => void;
}

const initialState: GameStoreState = {
  status: "NOT_STARTED",
  players: [],
};

interface IGameStore extends GameStoreState, GameStoreActions {}

const useGameStore = create<IGameStore>()(
  persist(
    (set) => ({
      ...initialState,

      newGame: (players) => {
        const activePlayers: IActivePlayer[] = players.map((player, index) => ({
          ...player,
          id: index,
          key: PLAYERS_KEYS_LIST[index].label,
          score: 0,
          isActive: index === 0,
        }));

        set({
          status: "ROUND_1",
          players: activePlayers,
        });
      },

      setPlayers: (players) => set({ players: players }),
    }),
    {
      name: "game-storage",
    },
  ),
);

export default useGameStore;
