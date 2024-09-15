import { create } from "zustand";
import { IQuestion } from "../types/Question";

type QuizEditorStore = {
  selectedQuestionToEdit: IQuestion | null;
  setSelectedQuestionToEdit: (question: IQuestion | null) => void;
  selectedQuestionToDelete: IQuestion | null;
  setSelectedQuestionToDelete: (question: IQuestion | null) => void;
  isAddQuestionModalOpen: boolean;
  setIsAddQuestionModalOpen: (isOpen: boolean) => void;
  isNewQuestionAdded: boolean;
  setIsNewQuestionAdded: (isAdded: boolean) => void;
};

export const useQuizEditorStore = create<QuizEditorStore>((set) => ({
  selectedQuestionToEdit: null,
  setSelectedQuestionToEdit: (question) =>
    set({ selectedQuestionToEdit: question }),
  selectedQuestionToDelete: null,
  setSelectedQuestionToDelete: (question) =>
    set({ selectedQuestionToDelete: question }),
  isAddQuestionModalOpen: false,
  setIsAddQuestionModalOpen: (isOpen) =>
    set({ isAddQuestionModalOpen: isOpen }),
  isNewQuestionAdded: false,
  setIsNewQuestionAdded: (isAdded: boolean) =>
    set({ isNewQuestionAdded: isAdded }),
}));
