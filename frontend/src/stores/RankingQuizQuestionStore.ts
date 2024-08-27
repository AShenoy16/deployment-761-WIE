import { create } from "zustand";

type RankingState = { [optionId: string]: number };

type RankingQuizQuestionStore = {
  rankingsByQuestion: { [questionNumber: number]: RankingState };
  setRanking: (questionNumber: number, optionId: string, rank: number) => void;
};

export const useRankingStore = create<RankingQuizQuestionStore>((set, get) => ({
  rankingsByQuestion: {},

  setRanking: (questionNumber: number, optionId: string, rank: number) => {
    set((state) => {
      const newRankings = { ...state.rankingsByQuestion[questionNumber] };

      const currentOptionId = Object.keys(newRankings).find(
        (id) => newRankings[id] === rank
      );
      if (currentOptionId) {
        delete newRankings[currentOptionId];
      }
      newRankings[optionId] = rank;

      return {
        rankingsByQuestion: {
          ...state.rankingsByQuestion,
          [questionNumber]: newRankings,
        },
      };
    });
  },
}));
