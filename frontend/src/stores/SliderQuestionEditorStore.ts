import { create } from "zustand";
import { ISliderQuestion } from "../types/QuestionTypes";

type SliderQuestionEditorStore = {
  selectedQuestion: ISliderQuestion | null;
  setSelectedQuestion: (question: ISliderQuestion | null) => void;
  updateQuestionTitle: (newTitle: string) => void;
  updateSpecName: (oldSpec: string, newSpec: string) => void;
  updateSpecWeightings: (spec: string, newWeightings: number[]) => void;
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

    updateSpecName: (oldSpec, newSpec) =>
      set((state) => {
        if (!state.selectedQuestion) return state;
        const updatedWeightings = {
          ...state.selectedQuestion.sliderRange.weightings,
        };
        if (updatedWeightings[oldSpec]) {
          updatedWeightings[newSpec] = updatedWeightings[oldSpec];
          delete updatedWeightings[oldSpec];
        }
        return {
          selectedQuestion: {
            ...state.selectedQuestion,
            sliderRange: {
              ...state.selectedQuestion.sliderRange,
              weightings: updatedWeightings,
            },
          },
        };
      }),

    updateSpecWeightings: (spec, newWeightings) =>
      set((state) => {
        if (!state.selectedQuestion) return state;
        return {
          selectedQuestion: {
            ...state.selectedQuestion,
            sliderRange: {
              ...state.selectedQuestion.sliderRange,
              weightings: {
                ...state.selectedQuestion.sliderRange.weightings,
                [spec]: newWeightings,
              },
            },
          },
        };
      }),
  })
);
