import { create } from "zustand";

type MCQState = {
  selectedOptionId: { [questionId: string]: string };
  isQuestionAnsweredMap: { [questionId: string]: boolean };
  selectOption: (questionId: string, optionId: string) => void;
  resetMcqQuestionProgress: () => void;
};

export const useMCQQuestionStore = create<MCQState>((set) => ({
  selectedOptionId: {},
  isQuestionAnsweredMap: {},
  selectOption: (questionId: string, optionId: string) =>
    set((state) => ({
      selectedOptionId: {
        ...state.selectedOptionId,
        [questionId]: optionId,
      },
      isQuestionAnsweredMap: {
        ...state.isQuestionAnsweredMap,
        [questionId]: true,
      },
    })),
  resetMcqQuestionProgress: () =>
    set({
      selectedOptionId: {},
      isQuestionAnsweredMap: {},
    }),
}));
