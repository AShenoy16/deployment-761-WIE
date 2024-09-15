import { create } from "zustand";
import { IRankingQuestion } from "../types/Question";

type RankingQuestionEditorStore = {
  selectedQuestion: IRankingQuestion | null;
  setSelectedQuestion: (question: IRankingQuestion | null) => void;
  updateQuestionTitle: (newTitle: string) => void;
  updateOptionTitle: (optionId: string, newTitle: string) => void;
  addSpecWeighting: (optionId: string) => void;
  deleteSpecWeighting: (optionId: string, spec: string) => void;
  updateSpecWeightingName: (
    optionId: string,
    oldSpec: string,
    newSpec: string
  ) => void;
  updateSpecWeightingValue: (
    optionId: string,
    spec: string,
    newWeight: number
  ) => void;
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

    addSpecWeighting: (optionId: string) =>
      set((state) => {
        if (!state.selectedQuestion) return state;
        const updatedOptions = state.selectedQuestion.answerOptions.map(
          (option) => {
            if (option._id === optionId) {
              const newWeighting: { [specializationName: string]: number } = {
                [`New Spec ${Object.keys(option.weightings).length + 1}`]: 0,
              };
              return {
                ...option,
                weightings: { ...option.weightings, ...newWeighting },
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

    deleteSpecWeighting: (optionId: string, spec: string) =>
      set((state) => {
        if (!state.selectedQuestion) return state;
        const updatedOptions = state.selectedQuestion.answerOptions.map(
          (option) => {
            if (option._id === optionId) {
              const updatedWeightings = {
                ...option.weightings,
              };
              delete updatedWeightings[spec];
              return {
                ...option,
                weightings: updatedWeightings,
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

    updateSpecWeightingName: (
      optionId: string,
      oldSpec: string,
      newSpec: string
    ) =>
      set((state) => {
        if (!state.selectedQuestion) return state;
        const updatedOptions = state.selectedQuestion.answerOptions.map(
          (option) => {
            if (option._id === optionId) {
              const { [oldSpec]: oldWeight, ...remainingWeightings } =
                option.weightings;

              const updatedWeightings = {
                ...remainingWeightings,
                [newSpec]: oldWeight,
              };
              return {
                ...option,
                weightings: updatedWeightings,
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

    updateSpecWeightingValue: (
      optionId: string,
      spec: string,
      newWeight: number
    ) =>
      set((state) => {
        if (!state.selectedQuestion) return state;
        const updatedOptions = state.selectedQuestion.answerOptions.map(
          (option) => {
            if (option._id === optionId) {
              const updatedWeightings = {
                ...option.weightings,
              };
              updatedWeightings[spec] = newWeight;
              return {
                ...option,
                weightings: updatedWeightings,
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
  })
);
