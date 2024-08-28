import { create } from "zustand";

type SliderQuizQuestionStore = {
  selectedValue: { [questionNumber: number]: number };
  setSelectedValue: (questionNumber: number, value: number) => void;
};

export const useSliderQuestionStore = create<SliderQuizQuestionStore>(
  (set) => ({
    selectedValue: {}, // default value of neutral
    setSelectedValue: (questionNumber: number, value: number) =>
      set((state) => ({
        selectedValue: { ...state.selectedValue, [questionNumber]: value },
      })),
  })
);
