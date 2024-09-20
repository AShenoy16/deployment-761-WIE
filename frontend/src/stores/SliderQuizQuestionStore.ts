import { create } from "zustand";

type SliderQuizQuestionStore = {
  selectedValue: { [questionId: string]: number };
  setSelectedValue: (questionId: string, value: number) => void;
  resetSliderQuestionProgress: () => void;
};

export const useSliderQuestionStore = create<SliderQuizQuestionStore>(
  (set) => ({
    selectedValue: {}, // default value of neutral
    setSelectedValue: (questionId: string, value: number) =>
      set((state) => ({
        selectedValue: { ...state.selectedValue, [questionId]: value },
      })),
    resetSliderQuestionProgress: () =>
      set({
        selectedValue: {},
      }),
  })
);
