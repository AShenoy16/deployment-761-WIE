import { Box, Button, Stack } from "@mui/material";
import { useGetQuestions } from "../hooks/useGetQuestions";
import { useQuizNavigation } from "../hooks/useQuizNavigation";
import { RankingQuizQuestion } from "../components/quiz/RankingQuizQuestion";
import { useRankingQuestionStore } from "../stores/RankingQuizQuestionStore";
import { Question } from "../types/QuestionTypes";
import { SliderQuizQuestion } from "../components/quiz/SliderQuizQuestion";

const renderQuestionComponent = (question: Question) => {
  switch (question.type) {
    case "mcq":
      return null; // TODO: Return the actual MCQ Question component when implemented
    case "ranking":
      return <RankingQuizQuestion question={question} />;
    case "slider":
      return <SliderQuizQuestion question={question} />;
    default:
      throw new Error("Invalid question type");
  }
};

const QuizPage: React.FC = () => {
  const { questions, isLoading, isError } = useGetQuestions();
  const { currentQuestionIndex, nextQuestion, prevQuestion } =
    useQuizNavigation(questions);
  const currentQuestion = questions[currentQuestionIndex];

  const isRankingQuestionAnsweredMap = useRankingQuestionStore(
    (state) => state.isQuestionAnsweredMap
  );

  // There might be cases where the questions array is empty, leading to currentQuestion being undefined so we need '?'.
  const isRankingQuestionAnswered =
    currentQuestion?.type !== "ranking" ||
    (currentQuestion?.type === "ranking" &&
      isRankingQuestionAnsweredMap[currentQuestion.questionNumber]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading questions</div>;
  }

  return (
    <Stack width="100%" maxWidth={800} margin="auto" gap={2}>
      {renderQuestionComponent(currentQuestion)}
      <Box display="flex" justifyContent="flex-end" width="100%" gap={1}>
        <Button
          variant="outlined"
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={nextQuestion}
          disabled={
            currentQuestionIndex === questions.length - 1 ||
            !isRankingQuestionAnswered
          }
        >
          Next
        </Button>
      </Box>
    </Stack>
  );
};

export default QuizPage;
