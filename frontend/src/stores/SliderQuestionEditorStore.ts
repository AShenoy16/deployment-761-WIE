import { create } from "zustand";
import { ISliderQuestion } from "../types/QuestionTypes";

type SliderQuestionEditorStore = {
  selectedQuestion: ISliderQuestion | null;
  setSelectedQuestion: (question: ISliderQuestion | null) => void;
};

export const useSliderQuestionEditorStore = create<SliderQuestionEditorStore>(
  (set) => ({
    selectedQuestion: null,

    setSelectedQuestion: (question: ISliderQuestion | null) =>
      set({ selectedQuestion: question }),
  })
);
