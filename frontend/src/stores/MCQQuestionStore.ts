import { create } from "zustand";

type MCQState = {
  selectedOptionId: string | null;
  selectOption: (optionId: string) => void;
};

export const useMCQStore = create<MCQState>((set) => ({
  selectedOptionId: null,
  selectOption: (optionId) => set({ selectedOptionId: optionId }),
}));
