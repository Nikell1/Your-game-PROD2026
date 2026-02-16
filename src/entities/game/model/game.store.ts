import { IActivePlayer } from "@/entities/player";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TGameStatus, IGameQuestion, ITheme } from "../game.types";

interface GameStoreState {
  status: TGameStatus;
  players: IActivePlayer[];
  themes: ITheme[];
  questions: IGameQuestion[];
  activePlayerId: number | null;
  currentQuestionId: string | null;
}

interface GameStoreActions {
  setPlayers: (players: IActivePlayer[]) => void;
  setStatus: (status: TGameStatus) => void;
  setThemes: (themes: ITheme[]) => void;
  setQuestions: (questions: IGameQuestion[]) => void;
  setActivePlayerId: (id: number | null) => void;
  setCurrentQuestion: (id: string | null) => void;
}

const initialState: GameStoreState = {
  status: "NOT_STARTED",
  players: [],
  themes: [],
  questions: [],
  activePlayerId: null,
  currentQuestionId: null,
};

interface IGameStore extends GameStoreState, GameStoreActions {}

export const useGameStore = create<IGameStore>()(
  persist(
    (set) => ({
      ...initialState,

      setCurrentQuestion: (id) => set({ currentQuestionId: id }),

      setPlayers: (players) => set({ players: players }),

      setActivePlayerId: (id) => set({ activePlayerId: id }),

      setStatus: (status) => set({ status: status }),

      setThemes: (themes) => set({ themes: themes }),

      setQuestions: (questions) => set({ questions: questions }),
    }),
    {
      name: "game-storage",
    },
  ),
);
