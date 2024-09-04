import { create } from "zustand";

type RankingQuestionEditorStore = {
  isWeightingFormOpen: boolean;
  selectedOptionId: string;
  selectedWeightingId: string;
  selectedSpecName: string;
  weightingsForSelectedSpec: { [rank: string]: number };
  errors: { specName: string; weightings: string[] };
  setIsWeightingFormOpen: (isOpen: boolean) => void;
  setSelectedOptionAndWeighting: (
    optionId: string,
    weightingId: string
  ) => void;
  setSelectedSpecName: (specName: string) => void;
  setWeightingsForSelectedSpec: (ranks: { [rank: string]: number }) => void;
  updateRankWeighting: (rank: string, value: number) => void;
  setErrors: (errors: { specName: string; weightings: string[] }) => void;
  reset: () => void;
};

export const useRankingQuestionEditorStore = create<RankingQuestionEditorStore>(
  (set) => ({
    isWeightingFormOpen: false,
    selectedOptionId: "",
    selectedWeightingId: "",
    selectedSpecName: "",
    weightingsForSelectedSpec: {},
    errors: { specName: "", weightings: [] },

    setIsWeightingFormOpen: (isOpen: boolean) =>
      set({ isWeightingFormOpen: isOpen }),

    setSelectedOptionAndWeighting: (optionId: string, weightingId: string) =>
      set({
        selectedOptionId: optionId,
        selectedWeightingId: weightingId,
      }),

    setSelectedSpecName: (specName: string) =>
      set({ selectedSpecName: specName }),

    setWeightingsForSelectedSpec: (ranks: { [rank: string]: number }) =>
      set({ weightingsForSelectedSpec: ranks }),

    updateRankWeighting: (rank: string, value: number) =>
      set((state) => ({
        weightingsForSelectedSpec: {
          ...state.weightingsForSelectedSpec,
          [rank]: value,
        },
      })),

    setErrors: (errors: { specName: string; weightings: string[] }) =>
      set({ errors }),

    reset: () =>
      set({
        isWeightingFormOpen: false,
        selectedSpecName: "",
        weightingsForSelectedSpec: {},
        errors: { specName: "", weightings: [] },
      }),
  })
);
