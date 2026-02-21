import { StateCreator } from "zustand";

export interface DevModeSlice {
  isOnDev: boolean;
  setIsOnDev: () => void;
}

export const devModeInitialState = {
  isOnDev: false,
};

export const devModeSlice: StateCreator<DevModeSlice> = (set) => ({
  ...devModeInitialState,

  setIsOnDev: () => set((state) => ({ isOnDev: !state.isOnDev })),
});
