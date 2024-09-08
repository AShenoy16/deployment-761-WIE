import { create } from "zustand";
import { ISliderQuestion } from "../types/QuestionTypes";

type SliderQuestionEditorStore = {
  selectedQuestion: ISliderQuestion | null;
  setSelectedQuestion: (question: ISliderQuestion | null) => void;
  updateQuestionTitle: (newTitle: string) => void;
  updateSpecName: (oldSpec: string, newSpec: string) => void;
  updateSpecWeightings: (spec: string, newWeightings: number[]) => void;
  addNewSpec: (spec: string, weightings: number[]) => void;
  specError: string | null;
  weightingErrors: (string | null)[];
  setSpecError: (error: string | null) => void;
  setWeightingErrors: (errors: (string | null)[]) => void;
  validateSpecName: (spec: string, availableSpecs: string[]) => boolean;
  validateWeightings: (weightings: number[]) => boolean;
};

export const useSliderQuestionEditorStore = create<SliderQuestionEditorStore>(
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

    addNewSpec: (spec, weightings) =>
      set((state) => {
        if (!state.selectedQuestion) return state;
        return {
          selectedQuestion: {
            ...state.selectedQuestion,
            sliderRange: {
              ...state.selectedQuestion.sliderRange,
              weightings: {
                ...state.selectedQuestion.sliderRange.weightings,
                [spec]: weightings,
              },
            },
          },
        };
      }),

    setSpecError: (error) => set({ specError: error }),

    setWeightingErrors: (errors) => set({ weightingErrors: errors }),

    validateSpecName: (spec, availableSpecs) => {
      if (!availableSpecs.includes(spec)) {
        set({ specError: "Invalid spec name" });
        return false;
      }
      set({ specError: null });
      return true;
    },

    validateWeightings: (weightings) => {
      const errors = weightings.map((weight) => {
        if (weight < 1 || weight > 5) {
          return "Weighting must be between 1 and 5";
        }
        return null;
      });

      set({ weightingErrors: errors });
      return errors.every((error) => error === null);
    },
  })
);
