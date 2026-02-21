import { StateCreator } from "zustand";
import {
  ICurrentQuestion,
  IQuestion,
  IThemeWithQuestions,
  TQuestionDifficulty,
  TQuestionSpecials,
} from "../../game-types";

export interface QuestionSlice {
  currentQuestion: ICurrentQuestion | null;
  answeredQuestionsIds: string[];
  specials: TQuestionSpecials;
  material: IThemeWithQuestions[];
  finalQuestion: IQuestion;

  setCurrentQuestion: (question: ICurrentQuestion | null) => void;
  setAnsweredQuestionsIds: (answeredQuesitons: string[]) => void;
  setSpecials: (special: TQuestionSpecials) => void;
  setMaterial: (material: IThemeWithQuestions[]) => void;
  setFinalQuestion: (question: IQuestion) => void;
}

export const questionInitialState = {
  currentQuestion: null,
  answeredQuestionsIds: [],
  specials: "default" as TQuestionSpecials,
  material: [],
  finalQuestion: {
    id: "",
    themeId: "",
    themeLabel: "",
    correctAnswer: "",
    label: "",
    difficulty: "hard" as TQuestionDifficulty,
  },
};

export const questionSlice: StateCreator<QuestionSlice> = (set) => ({
  ...questionInitialState,

  setMaterial: (material) => set({ material: material }),

  setSpecials: (specials) => set({ specials: specials }),

  setAnsweredQuestionsIds: (answeredQuestions) =>
    set({ answeredQuestionsIds: answeredQuestions }),

  setCurrentQuestion: (question) => set({ currentQuestion: question }),

  setFinalQuestion: (question) => set({ finalQuestion: question }),
});
