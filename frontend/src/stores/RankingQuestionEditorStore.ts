import { create } from "zustand";

type RankingQuestionEditorStore = {
  isWeightingFormOpen: boolean;
  selectedSpecName: string;
  ranksForSelectedSpec: { [rank: number]: number };
  errors: { specName: string; ranks: string[] };
  setIsWeightingFormOpen: (isOpen: boolean) => void;
  setSelectedSpecName: (specName: string) => void;
  setRanksForSelectedSpec: (ranks: { [rank: number]: number }) => void;
  updateRank: (rank: number, value: number) => void;
  setErrors: (errors: { specName: string; ranks: string[] }) => void;
  reset: () => void;
};

export const useRankingQuestionEditorStore = create<RankingQuestionEditorStore>(
  (set) => ({
    isWeightingFormOpen: false,
    selectedSpecName: "",
    ranksForSelectedSpec: {},
    errors: { specName: "", ranks: [] },

    setIsWeightingFormOpen: (isOpen: boolean) =>
      set({ isWeightingFormOpen: isOpen }),

    setSelectedSpecName: (specName: string) =>
      set({ selectedSpecName: specName }),

    setRanksForSelectedSpec: (ranks: { [rank: number]: number }) =>
      set({ ranksForSelectedSpec: ranks }),

    updateRank: (rank: number, value: number) =>
      set((state) => ({
        ranksForSelectedSpec: {
          ...state.ranksForSelectedSpec,
          [rank]: value,
        },
      })),

    setErrors: (errors: { specName: string; ranks: string[] }) =>
      set({ errors }),

    reset: () =>
      set({
        isWeightingFormOpen: false,
        selectedSpecName: "",
        ranksForSelectedSpec: {},
        errors: { specName: "", ranks: [] },
      }),
  })
);
