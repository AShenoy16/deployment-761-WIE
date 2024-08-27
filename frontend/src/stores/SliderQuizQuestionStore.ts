import { create } from "zustand";

type SliderQuizQuestionStore = {
  selectedValue: number;
  setSelectedValue: (value: number) => void;
};

export const useSliderStore = create<SliderQuizQuestionStore>((set) => ({
  selectedValue: 3, // default value of neutral
  setSelectedValue: (value: number) => set({ selectedValue: value }),
}));
