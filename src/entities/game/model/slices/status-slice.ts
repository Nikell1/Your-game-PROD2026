import { StateCreator } from "zustand";
import { TGameStatus } from "../../game-types";

export interface GameStatusSlice {
  status: TGameStatus;
  setStatus: (status: TGameStatus) => void;
}

export const gameStatusInitialState = {
  status: "NOT_STARTED" as TGameStatus,
};

export const gameStatusSlice: StateCreator<GameStatusSlice> = (set) => ({
  ...gameStatusInitialState,

  setStatus: (status) => set({ status: status }),
});
