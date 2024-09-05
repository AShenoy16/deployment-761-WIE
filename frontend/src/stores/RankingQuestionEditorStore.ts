import { create } from "zustand";
import { IRankingQuestion, IRankingWeight } from "../types/QuestionTypes";

type RankingQuestionEditorStore = {
  selectedQuestion: IRankingQuestion | null;
  setSelectedQuestion: (question: IRankingQuestion | null) => void;
  updateQuestionTitle: (newTitle: string) => void;
  updateOptionTitle: (optionId: string, newTitle: string) => void;
  addWeighting: (optionId: string) => void;
  deleteWeighting: (optionId: string, weightingId: string) => void;
  updateWeightingSpecialization: (
    optionId: string,
    weightingId: string,
    updatedSpecializationName: string
  ) => void;
  updateWeightingRanks: (
    optionId: string,
    weightingId: string,
    newWeights: { [rank: string]: number }
  ) => void;
  isWeightingFormOpen: boolean;
  setIsWeightingFormOpen: (isOpen: boolean) => void;
  errors: { [rank: string]: string };
  setErrors: (errors: { [rank: string]: string }) => void;
  selectedOptionId: string;
  setSelectedOptionId: (optionId: string) => void;
  selectedWeightingId: string;
  setSelectedWeightingId: (weightingId: string) => void;
};

export const useRankingQuestionEditorStore = create<RankingQuestionEditorStore>(
  (set) => ({
    selectedQuestion: null,

    setSelectedQuestion: (question: IRankingQuestion | null) =>
      set({ selectedQuestion: question }),

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

    updateOptionTitle: (optionId: string, newTitle: string) =>
      set((state) => {
        if (!state.selectedQuestion) return state;
        const updatedOptions = state.selectedQuestion.answerOptions.map(
          (option) =>
            option._id === optionId ? { ...option, text: newTitle } : option
        );
        return {
          selectedQuestion: {
            ...state.selectedQuestion,
            answerOptions: updatedOptions,
          },
        };
      }),

    addWeighting: (optionId: string) =>
      set((state) => {
        if (!state.selectedQuestion) return state;
        const updatedOptions = state.selectedQuestion.answerOptions.map(
          (option) => {
            if (option._id === optionId) {
              const newWeighting: IRankingWeight = {
                _id: `new_weight_${option.weightings.length + 1}`,
                specializationName: `New Spec ${option.weightings.length + 1}`,
                weights: {
                  "1": 0,
                  "2": 0,
                  "3": 0,
                },
              };
              return {
                ...option,
                weightings: [...option.weightings, newWeighting],
              };
            }
            return option;
          }
        );
        return {
          selectedQuestion: {
            ...state.selectedQuestion,
            answerOptions: updatedOptions,
          },
        };
      }),

    deleteWeighting: (optionId: string, weightingId: string) =>
      set((state) => {
        if (!state.selectedQuestion) return state;
        const updatedOptions = state.selectedQuestion.answerOptions.map(
          (option) => {
            if (option._id === optionId) {
              return {
                ...option,
                weightings: option.weightings.filter(
                  (weighting) => weighting._id !== weightingId
                ),
              };
            }
            return option;
          }
        );
        return {
          selectedQuestion: {
            ...state.selectedQuestion,
            answerOptions: updatedOptions,
          },
        };
      }),

    updateWeightingSpecialization: (
      optionId: string,
      weightingId: string,
      updatedSpecializationName: string
    ) =>
      set((state) => {
        if (!state.selectedQuestion) return state;
        const updatedOptions = state.selectedQuestion.answerOptions.map(
          (option) => {
            if (option._id === optionId) {
              return {
                ...option,
                weightings: option.weightings.map((weighting) =>
                  weighting._id === weightingId
                    ? {
                        ...weighting,
                        specializationName: updatedSpecializationName,
                      }
                    : weighting
                ),
              };
            }
            return option;
          }
        );
        return {
          selectedQuestion: {
            ...state.selectedQuestion,
            answerOptions: updatedOptions,
          },
        };
      }),

    updateWeightingRanks: (
      optionId: string,
      weightingId: string,
      newWeights: { [rank: string]: number }
    ) =>
      set((state) => {
        if (!state.selectedQuestion) return state;
        const updatedOptions = state.selectedQuestion.answerOptions.map(
          (option) => {
            if (option._id === optionId) {
              return {
                ...option,
                weightings: option.weightings.map((weighting) =>
                  weighting._id === weightingId
                    ? {
                        ...weighting,
                        weights: newWeights,
                      }
                    : weighting
                ),
              };
            }
            return option;
          }
        );
        return {
          selectedQuestion: {
            ...state.selectedQuestion,
            answerOptions: updatedOptions,
          },
        };
      }),
    isWeightingFormOpen: false,
    setIsWeightingFormOpen: (isOpen: boolean) =>
      set({ isWeightingFormOpen: isOpen }),

    errors: {},
    setErrors: (errors: { [rank: string]: string }) => set({ errors }),

    selectedOptionId: "",
    setSelectedOptionId: (optionId: string) =>
      set({ selectedOptionId: optionId }),

    selectedWeightingId: "",
    setSelectedWeightingId: (weightingId: string) =>
      set({ selectedWeightingId: weightingId }),
  })
);
