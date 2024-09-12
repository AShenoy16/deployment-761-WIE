import { create } from "zustand";
import { IMCQQuestion, ISliderQuestion } from "../types/QuestionTypes";

type MCQQuestionEditorStore = {
  selectedQuestion: IMCQQuestion | null;
  setSelectedQuestion: (question: IMCQQuestion | null) => void;
  updateQuestionTitle: (newTitle: string) => void;
  updateOptionTitle: (optionId: string, newTitle: string) => void;
  addSpec: (optionId: string) => void;
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

    updateOptionTitle: (optionId: string, newTitle: string) =>
      set((state) => {
        if (!state.selectedQuestion) return state;
        const updatedOptions = state.selectedQuestion.answerOptions.map(
          (option) =>
            option._id === optionId ? { ...option, text: newTitle } : option
        );
        return {
          selectedQuestion: {
            ...state.selectedQuestion,
            answerOptions: updatedOptions,
          },
        };
      }),

    addSpec: (optionId: string) =>
      set((state) => {
        if (!state.selectedQuestion) return state;
        const updatedOptions = state.selectedQuestion.answerOptions.map(
          (option) => {
            if (option._id === optionId) {
              const newWeighting: { [specializationName: string]: number } = {
                [`New Spec ${Object.keys(option.weightings).length + 1}`]: 0,
              };

              return {
                ...option,
                weightings: { ...option.weightings, ...newWeighting },
              };
            }
            return option;
          }
        );
        return {
          selectedQuestion: {
            ...state.selectedQuestion,
            answerOptions: updatedOptions,
          },
        };
      }),
  })
);
