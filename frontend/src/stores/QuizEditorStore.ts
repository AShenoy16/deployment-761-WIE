import { create } from "zustand";
import { IQuestion } from "../types/Question";

type QuizEditorStore = {
  selectedQuestion: IQuestion | null;
  setSelectedQuestion: (question: IQuestion | null) => void;
};

export const useQuizEditorStore = create<QuizEditorStore>((set) => ({
  selectedQuestion: null,
  setSelectedQuestion: (question) => set({ selectedQuestion: question }),
}));
