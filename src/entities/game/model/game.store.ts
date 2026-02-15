import { IActivePlayer } from "@/entities/player";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameStatus, ITheme } from "../game.types";

interface GameStoreState {
  status: GameStatus;
  players: IActivePlayer[];
  themes: ITheme[];
}

interface GameStoreActions {
  setPlayers: (players: IActivePlayer[]) => void;
  setStatus: (status: GameStatus) => void;
  setThemes: (themes: ITheme[]) => void;
}

const initialState: GameStoreState = {
  status: "NOT_STARTED",
  players: [],
  themes: [],
};

interface IGameStore extends GameStoreState, GameStoreActions {}

const useGameStore = create<IGameStore>()(
  persist(
    (set) => ({
      ...initialState,

      setPlayers: (players) => set({ players: players }),

      setStatus: (status) => set({ status: status }),

      setThemes: (themes) => set({ themes: themes }),
    }),
    {
      name: "game-storage",
    },
  ),
);

export default useGameStore;
