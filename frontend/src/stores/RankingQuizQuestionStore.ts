import { create } from "zustand";

type RankingState = { [optionId: string]: number };

type RankingQuestionStore = {
  questionRankings: { [questionNumber: number]: RankingState };
  setQuestionRanking: (
    questionNumber: number,
    optionId: string,
    rank: number
  ) => void;
  isQuestionAnsweredMap: { [questionNumber: number]: boolean };
  setIsQuestionAnswered: (questionNumber: number, optionCount: number) => void;
};

export const useRankingQuestionStore = create<RankingQuestionStore>((set) => ({
  questionRankings: {},
  setQuestionRanking: (
    questionNumber: number,
    optionId: string,
    rank: number
  ) => {
    set((state) => {
      const newRankings = { ...state.questionRankings[questionNumber] };

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
          [questionNumber]: newRankings,
        },
      };
    });
  },

  isQuestionAnsweredMap: {},
  setIsQuestionAnswered: (questionNumber: number, optionCount: number) => {
    set((state) => {
      const rankings = state.questionRankings[questionNumber] || {};
      const isQuestionAnswered = Object.keys(rankings).length === optionCount;

      return {
        isQuestionAnsweredMap: {
          ...state.isQuestionAnsweredMap,
          [questionNumber]: isQuestionAnswered,
        },
      };
    });
  },
}));
