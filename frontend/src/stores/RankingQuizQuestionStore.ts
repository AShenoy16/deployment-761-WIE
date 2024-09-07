import { create } from "zustand";

type RankingState = { [optionId: string]: number };

type RankingQuestionStore = {
  questionRankings: { [questionId: string]: RankingState };
  setQuestionRanking: (
    questionId: string,
    optionId: string,
    rank: number
  ) => void;
  isQuestionAnsweredMap: { [questionId: string]: boolean };
  setIsQuestionAnswered: (questionId: string, optionCount: number) => void;
};

export const useRankingQuestionStore = create<RankingQuestionStore>((set) => ({
  questionRankings: {},
  setQuestionRanking: (questionId: string, optionId: string, rank: number) => {
    set((state) => {
      const newRankings = { ...state.questionRankings[questionId] };

      const currentOptionId = Object.keys(newRankings).find(
        (id) => newRankings[id] === rank
      );
      if (currentOptionId) {
        delete newRankings[currentOptionId];
      }
      newRankings[optionId] = rank;

      return {
        questionRankings: {
          ...state.questionRankings,
          [questionId]: newRankings,
        },
      };
    });
  },

  isQuestionAnsweredMap: {},
  setIsQuestionAnswered: (questionId: string, optionCount: number) => {
    set((state) => {
      const rankings = state.questionRankings[questionId] || {};
      const isQuestionAnswered = Object.keys(rankings).length === optionCount;

      return {
        isQuestionAnsweredMap: {
          ...state.isQuestionAnsweredMap,
          [questionId]: isQuestionAnswered,
        },
      };
    });
  },
}));
