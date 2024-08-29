import { create } from "zustand";

type QuizStore = {
  hasStarted: boolean;
  startQuiz: () => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
};

export const useQuizStore = create<QuizStore>((set) => ({
  hasStarted: false,
  startQuiz: () => set({ hasStarted: true }),
  currentQuestionIndex: 0,
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  nextQuestion: () =>
    set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),
  prevQuestion: () =>
    set((state) => ({
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
    })),
}));
