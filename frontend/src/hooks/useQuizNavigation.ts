import { useQuizStore } from "../stores/QuizStore";
import { Question } from "../types/QuestionTypes";

export const useQuizNavigation = (questions: Question[]) => {
  const {
    currentQuestionIndex,
    nextQuestion,
    prevQuestion,
    setCurrentQuestionIndex,
  } = useQuizStore();

  const goToQuestion = (index: number) => {
    if (questions && index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
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
    questions,
    nextQuestion: handleNextQuestion,
    prevQuestion: handlePrevQuestion,
    goToQuestion,
    currentQuestion: questions ? questions[currentQuestionIndex] : null,
  };
};
