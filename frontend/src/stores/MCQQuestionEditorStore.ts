import { create } from "zustand";
import { IMCQQuestion, ISliderQuestion } from "../types/QuestionTypes";

type MCQQuestionEditorStore = {
  selectedQuestion: IMCQQuestion | null;
  setSelectedQuestion: (question: IMCQQuestion | null) => void;
  updateQuestionTitle: (newTitle: string) => void;
};

export const useMCQQuestionEditorStore = create<MCQQuestionEditorStore>(
  (set) => ({
    selectedQuestion: null,
    specError: null,
    weightingErrors: [],

    updateQuestionTitle: (newTitle: string) =>
      set((state) => {
        if (!state.selectedQuestion) return state;
        return {
          selectedQuestion: {
            ...state.selectedQuestion,
            questionText: newTitle,
          },
        };
      }),
    setSelectedQuestion: (question: IMCQQuestion | null) =>
      set({ selectedQuestion: question }),
  })
);
