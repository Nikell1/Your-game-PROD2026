import {
  DEFAULT_COLORS_LIST,
  ISetupPlayer,
  PLAYERS_KEYS_LIST,
} from "@/entities/player";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SetupGameStoreState {
  playersData: ISetupPlayer[];
  players: number;
}

interface SetupGameStoreActions {
  addPlayer: () => void;
  resetSetupGameStore: () => void;
  removePlayer: (index: number) => void;
  updatePlayerName: (index: number, name: string) => void;
}

interface ISetupGameStore extends SetupGameStoreState, SetupGameStoreActions {}

const initialState: SetupGameStoreState = {
  players: 3,
  playersData: [
    {
      name: "",
      color: DEFAULT_COLORS_LIST[0],
      key: PLAYERS_KEYS_LIST[0].label,
    },
    {
      name: "",
      color: DEFAULT_COLORS_LIST[1],
      key: PLAYERS_KEYS_LIST[1].label,
    },
    {
      name: "",
      color: DEFAULT_COLORS_LIST[2],
      key: PLAYERS_KEYS_LIST[2].label,
    },
  ],
};

const useSetupGameStore = create<ISetupGameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addPlayer: () => {
        const { playersData } = get();

        const usedColors = playersData.map((p) => p.color);
        const usedKeys = playersData.map((p) => p.key);

        const availableColor = DEFAULT_COLORS_LIST.find(
          (color) => !usedColors.includes(color),
        );

        const availableKey = PLAYERS_KEYS_LIST.find(
          (key) => !usedKeys.includes(key.label),
        );

        const newColor = availableColor || DEFAULT_COLORS_LIST[0];
        const newKey = availableKey?.label || "no key";

        set((state) => ({
          players: state.players + 1,
          playersData: [
            ...state.playersData,
            {
              name: "",
              key: newKey,
              color: newColor,
            },
          ],
        }));
      },

      removePlayer: (index) =>
        set((state) => ({
          players: state.players - 1,
          playersData: state.playersData.filter((_, i) => i !== index),
        })),

      updatePlayerName: (index, name) =>
        set((state) => ({
          playersData: state.playersData.map((player, i) =>
            i === index ? { ...player, name } : player,
          ),
        })),

      resetSetupGameStore: () => set({ ...initialState }),
    }),
    { name: "setup-game-storage" },
  ),
);

export default useSetupGameStore;
