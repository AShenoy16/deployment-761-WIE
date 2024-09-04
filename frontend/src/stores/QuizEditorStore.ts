import { create } from "zustand";
import { RankingQuestion, Question } from "../types/QuestionTypes";

type QuizEditorStore = {
  selectedQuestion: Question | null;
  setSelectedQuestion: (question: Question | null) => void;
  addNewSpecToRankingAnswerOption: (
    updatedAnswerOptions: RankingQuestion["answerOptions"]
  ) => void;
};

function isRankingQuestion(
  question: Question | null
): question is RankingQuestion {
  return question?.type === "ranking";
}

export const useQuizEditorStore = create<QuizEditorStore>((set) => ({
  selectedQuestion: null,

  setSelectedQuestion: (question) => set({ selectedQuestion: question }),

  addNewSpecToRankingAnswerOption: (updatedAnswerOptions) =>
    set((state) => {
      if (isRankingQuestion(state.selectedQuestion)) {
        return {
          selectedQuestion: {
            ...state.selectedQuestion,
            answerOptions: updatedAnswerOptions,
          },
        };
      }
      return state;
    }),
}));
