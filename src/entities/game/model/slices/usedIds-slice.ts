import { StateCreator } from "zustand";

export interface UsedIdsSlice {
  usedQuestionsIds: string[];
  usedThemesIds: string[];

  setUsedQuestionsIds: (newQuestions: string[]) => void;
  setUsedThemesIds: (newThemes: string[]) => void;
}

export const usedIdsInitialState = {
  usedQuestionsIds: [],
  usedThemesIds: [],
};

export const usedIdsSlice: StateCreator<UsedIdsSlice> = (set) => ({
  ...usedIdsInitialState,

  setUsedThemesIds: (newThemes) =>
    set((state) => ({
      usedThemesIds: [...state.usedThemesIds, ...newThemes],
    })),

  setUsedQuestionsIds: (newQuestions) =>
    set((state) => ({
      usedQuestionsIds: [...state.usedQuestionsIds, ...newQuestions],
    })),
});
