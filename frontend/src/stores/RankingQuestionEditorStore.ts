import { create } from "zustand";

type RankingQuestionEditorStore = {
  isWeightingFormOpen: boolean;
  selectedSpecName: string;
  ranksForSelectedSpec: { [rank: number]: number };
  setIsWeightingFormOpen: (isOpen: boolean) => void;
  setSelectedSpecName: (specName: string) => void;
  setRanksForSelectedSpec: (ranks: { [rank: number]: number }) => void;
  updateRank: (rank: number, value: number) => void;
  reset: () => void;
};

export const useRankingQuestionEditorStore = create<RankingQuestionEditorStore>(
  (set) => ({
    isWeightingFormOpen: false,
    selectedSpecName: "",
    ranksForSelectedSpec: {},

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

    reset: () =>
      set({
        isWeightingFormOpen: false,
        selectedSpecName: "",
        ranksForSelectedSpec: {},
      }),
  })
);
