import { create } from "zustand";

type QuizStore = {
  startQuiz: () => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizStore>((set) => ({
  startQuiz: () => set({ currentQuestionIndex: 0 }),
  currentQuestionIndex: -1,
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  nextQuestion: () =>
    set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),
  prevQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
    })),
  resetQuiz: () =>
    set({
      currentQuestionIndex: -1,
    }),
}));
