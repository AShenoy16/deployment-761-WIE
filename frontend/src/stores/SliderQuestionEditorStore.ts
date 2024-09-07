import { create } from "zustand";
import { ISliderQuestion } from "../types/QuestionTypes";

type SliderQuestionEditorStore = {
  selectedQuestion: ISliderQuestion | null;
  setSelectedQuestion: (question: ISliderQuestion | null) => void;
  updateQuestionTitle: (newTitle: string) => void;
};

export const useSliderQuestionEditorStore = create<SliderQuestionEditorStore>(
  (set) => ({
    selectedQuestion: null,
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
    setSelectedQuestion: (question: ISliderQuestion | null) =>
      set({ selectedQuestion: question }),
  })
);
