import { create } from "zustand";
import { ISliderQuestion } from "../types/Question";

type SliderQuestionEditorStore = {
  selectedQuestion: ISliderQuestion | null;
  setSelectedQuestion: (question: ISliderQuestion | null) => void;
  updateQuestionTitle: (newTitle: string) => void;
  updateSpecName: (oldSpec: string, newSpec: string) => void;
  updateSpecWeighting: (spec: string, newWeighting: number) => void;
  addNewSpec: (spec: string, weighting: number) => void;
  deleteSpec: (spec: string) => void;
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

        const updatedWeightings: { [key: string]: number } = {};
        // Retain the order by rebuilding the object in the original order
        for (const key in state.selectedQuestion.sliderRange.weightings) {
          if (key === oldSpec) {
            updatedWeightings[newSpec] =
              state.selectedQuestion.sliderRange.weightings[oldSpec];
          } else {
            updatedWeightings[key] =
              state.selectedQuestion.sliderRange.weightings[key];
          }
        }

        return {
          selectedQuestion: {
            ...state.selectedQuestion,
            sliderRange: {
              ...state.selectedQuestion.sliderRange,
              weightings: updatedWeightings, // Maintain order
            },
          },
        };
      }),

    updateSpecWeighting: (spec, newWeighting) =>
      set((state) => {
        if (!state.selectedQuestion) return state;

        const updatedWeightings = {
          ...state.selectedQuestion.sliderRange.weightings,
        };
        updatedWeightings[spec] = newWeighting; // Update only the weighting

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

    addNewSpec: (spec, weighting) =>
      set((state) => {
        if (!state.selectedQuestion) return state;
        return {
          selectedQuestion: {
            ...state.selectedQuestion,
            sliderRange: {
              ...state.selectedQuestion.sliderRange,
              weightings: {
                ...state.selectedQuestion.sliderRange.weightings,
                [spec]: weighting,
              },
            },
          },
        };
      }),

    deleteSpec: (spec) =>
      set((state) => {
        if (!state.selectedQuestion) return state;
        const updatedWeightings = {
          ...state.selectedQuestion.sliderRange.weightings,
        };
        delete updatedWeightings[spec];
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
  })
);
