import { create } from "zustand";

type RankingQuizQuestionStore = {
  rankings: { [optionId: string]: number };
  setRanking: (optionId: string, rank: number) => void;
};

export const useRankingStore = create<RankingQuizQuestionStore>((set, get) => ({
  rankings: {},
  setRanking: (optionId: string, rank: number) => {
    const { rankings } = get();
    const currentOptionId = Object.keys(rankings).find(
      (id) => rankings[id] === rank
    );
    set((state) => {
      const newRankings = { ...state.rankings };
      if (currentOptionId) {
        delete newRankings[currentOptionId];
      }
      newRankings[optionId] = rank;

      return { rankings: newRankings };
    });
  },
}));
