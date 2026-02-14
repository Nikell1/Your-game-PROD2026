import { DEFAULT_COLORS_LIST } from "@/entities/player/player.constants";
import { IPlayer } from "@/entities/player/player.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SetupGameStoreState {
  playersData: Omit<IPlayer, "id">[];
}

interface SetupGameStoreActions {
  addPlayer: () => void;
  resetStore: () => void;
  removePlayer: (index: number) => void;
  updatePlayerName: (index: number, name: string) => void;
}

interface ISetupGameStore extends SetupGameStoreState, SetupGameStoreActions {}

const initialState: SetupGameStoreState = {
  playersData: [
    { name: "", color: DEFAULT_COLORS_LIST[0] },
    { name: "", color: DEFAULT_COLORS_LIST[1] },
    { name: "", color: DEFAULT_COLORS_LIST[2] },
  ],
};

const useSetupGameStore = create<ISetupGameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addPlayer: () => {
        const { playersData } = get();

        const usedColors = playersData.map((p) => p.color);

        const availableColor = DEFAULT_COLORS_LIST.find(
          (color) => !usedColors.includes(color),
        );

        const newColor = availableColor || DEFAULT_COLORS_LIST[0];

        set((state) => ({
          playersData: [
            ...state.playersData,
            {
              name: "",
              color: newColor,
            },
          ],
        }));
      },

      removePlayer: (index) =>
        set((state) => ({
          playersData: state.playersData.filter((_, i) => i !== index),
        })),

      updatePlayerName: (index, name) =>
        set((state) => ({
          playersData: state.playersData.map((player, i) =>
            i === index ? { ...player, name } : player,
          ),
        })),

      resetStore: () => set({ ...initialState }),
    }),
    { name: "setup-game-storage" },
  ),
);

export default useSetupGameStore;
