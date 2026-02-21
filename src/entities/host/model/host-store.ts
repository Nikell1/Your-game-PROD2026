import { create } from "zustand";
import { persist } from "zustand/middleware";
import { THostEvents } from "../host-types";

interface HostState {
  currentEvent: THostEvents;
  currentPhrase: string;
  CanLowPriorityPhrase: boolean;
}

interface HostActions {
  setCurrentEvent: (event: THostEvents) => void;
  setCurrentPhrase: (phrase: string) => void;
  setCanLowPriorityPhrase: (bool: boolean) => void;
}

interface HostStoreState extends HostActions, HostState {}

const initialState: HostState = {
  currentEvent: "game_started",
  currentPhrase: "",
  CanLowPriorityPhrase: true,
};

export const useHostStore = create<HostStoreState>()(
  persist(
    (set) => ({
      ...initialState,

      setCurrentPhrase: (phrase) => set({ currentPhrase: phrase }),

      setCurrentEvent: (event) => set({ currentEvent: event }),

      setCanLowPriorityPhrase: (bool) => set({ CanLowPriorityPhrase: bool }),
    }),
    {
      name: "host-storage",
    },
  ),
);
