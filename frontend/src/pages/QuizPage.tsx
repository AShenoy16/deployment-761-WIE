import { Box, Button, Stack } from "@mui/material";
import { useGetQuestions } from "../hooks/useGetQuestions";
import { useQuizNavigation } from "../hooks/useQuizNavigation";
import { RankingQuizQuestion } from "../components/quiz/RankingQuizQuestion";
import { Question } from "../types/QuestionTypes";

const renderQuestionComponent = (question: Question) => {
  switch (question.type) {
    case "mcq":
      return null; // TODO: Return the actual MCQ Question component when implemented
    case "ranking":
      return <RankingQuizQuestion question={question} />;
    case "slider":
      return null; // TODO: Return the actual Slider Question component when implemented
    default:
      throw new Error("Invalid question type");
  }
};

const QuizPage: React.FC = () => {
  const { questions, isLoading, isError } = useGetQuestions();
  const { currentQuestionIndex, nextQuestion, prevQuestion } =
    useQuizNavigation(questions);
  const currentQuestion = questions[currentQuestionIndex];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading questions</div>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="flex-start"
      width="100%"
      maxWidth={800}
      margin="auto"
      padding={2}
      height="100%"
    >
      <Box flexGrow={1} width="100%">
        {renderQuestionComponent(currentQuestion)}
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        width="100%"
        gap={1}
        marginTop="auto"
      >
        <Button onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
          Previous
        </Button>
        <Button
          onClick={nextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default QuizPage;
