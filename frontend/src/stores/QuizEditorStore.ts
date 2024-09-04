import { create } from "zustand";
import { Question } from "../types/QuestionTypes";

type QuizEditorStore = {
  selectedQuestion: Question | null;
  setSelectedQuestion: (question: Question | null) => void;
};

export const useQuizEditorStore = create<QuizEditorStore>((set) => ({
  selectedQuestion: null,
  setSelectedQuestion: (question: Question | null) =>
    set({ selectedQuestion: question ? { ...question } : null }),
}));
