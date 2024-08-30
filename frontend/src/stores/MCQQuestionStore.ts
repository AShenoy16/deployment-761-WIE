import { create } from "zustand";

type MCQState = {
  selectedOptionId: { [questionId: number]: string | null };
  isQuestionAnsweredMap: { [questionNumber: number]: boolean };
  selectOption: (questionId: number, optionId: string) => void;
};

export const useMCQQuestionStore = create<MCQState>((set) => ({
  selectedOptionId: {},
  isQuestionAnsweredMap: {},
  selectOption: (questionId: number, optionId: string) =>
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
}));
