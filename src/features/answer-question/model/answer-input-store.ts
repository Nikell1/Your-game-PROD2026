import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AnswerInputState {
  inputValue: string;
  isCorrect: boolean | null;
  disabledPlayerIds: number[];
}

interface AnswerInputActions {
  setIsCorrect: (n: boolean | null) => void;
  setInputValue: (value: string) => void;
  resetAnswerInputStore: () => void;
  pushDisabledPlayerIds: (id: number) => void;
}

const initialState: AnswerInputState = {
  inputValue: "",
  disabledPlayerIds: [],
  isCorrect: null,
};

interface IAnswerInputStore extends AnswerInputState, AnswerInputActions {}

export const useAnswerInputStore = create<IAnswerInputStore>()(
  persist(
    (set) => ({
      ...initialState,

      pushDisabledPlayerIds: (id) =>
        set((state) => ({
          disabledPlayerIds: [...state.disabledPlayerIds, id],
        })),

      setIsCorrect: (n) => set({ isCorrect: n }),

      setInputValue: (value) => set({ inputValue: value }),

      resetAnswerInputStore: () => set({ ...initialState }),
    }),
    {
      name: "answer-input-storage",
    },
  ),
);
