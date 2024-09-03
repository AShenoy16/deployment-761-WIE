import { create } from "zustand";
import { Question } from "../types/QuestionTypes";

type QuizEditorStore = {
  selectedQuestion: Question | null;
  selectedTab: "mcq" | "ranking" | "slider";
  setSelectedQuestion: (question: Question) => void;
  clearSelection: () => void;
  setSelectedTab: (tab: "mcq" | "ranking" | "slider") => void;
};

export const useQuizEditorStore = create<QuizEditorStore>((set) => ({
  selectedQuestion: null,
  selectedTab: "mcq",
  setSelectedQuestion: (question: Question) =>
    set({ selectedQuestion: { ...question }, selectedTab: question.type }),
  clearSelection: () => set({ selectedQuestion: null, selectedTab: "mcq" }),
  setSelectedTab: (tab: "mcq" | "ranking" | "slider") =>
    set({ selectedTab: tab }),
}));
