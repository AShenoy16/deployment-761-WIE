import { useQuizStore } from "../stores/QuizStore";
import { IQuestion } from "../types/Question";

export const useQuizNavigation = (questions: IQuestion[]) => {
  const {
    currentQuestionIndex,
    nextQuestion,
    prevQuestion,
    setCurrentQuestionIndex,
  } = useQuizStore();

  const handleExitQuiz = () => {
    setCurrentQuestionIndex(-1);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      prevQuestion();
    }
  };

  return {
    currentQuestionIndex,
    nextQuestion: handleNextQuestion,
    prevQuestion: handlePrevQuestion,
    exitQuiz: handleExitQuiz,
  };
};
