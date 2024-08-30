import React from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useGetQuestions } from "../hooks/useGetQuestions";
import { useQuizNavigation } from "../hooks/useQuizNavigation";
import LoadingSpinnerScreen from "../components/LoadingSpinnerScreen";
import { RankingQuizQuestion } from "../components/quiz/RankingQuizQuestion";
import { SliderQuizQuestion } from "../components/quiz/SliderQuizQuestion";
import { useRankingQuestionStore } from "../stores/RankingQuizQuestionStore";
import { useQuizStore } from "../stores/QuizStore";
import { Question } from "../types/QuestionTypes";
import { useNavigate } from "react-router-dom";
import { MCQQuizQuestion } from "../components/quiz/MCQQuizQuestion";
import { useMCQQuestionStore } from "../stores/MCQQuestionStore";
import { MCQQuizQuestion } from "../components/quiz/MCQQuizQuestion";
import { useMCQQuestionStore } from "../stores/MCQQuestionStore";

const renderQuestionComponent = (question: Question) => {
  switch (question.type) {
    case "mcq":
      return <MCQQuizQuestion question={question} />;
    case "ranking":
      return <RankingQuizQuestion question={question} />;
    case "slider":
      return <SliderQuizQuestion question={question} />;
    default:
      throw new Error("Invalid question type");
  }
};

const StartingScreen: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const startQuiz = useQuizStore((state) => state.startQuiz);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={2}
      width="100%"
      height="100%"
    >
      <Typography variant={isSmallScreen ? "h4" : "h2"} textAlign="center">
        Find your spec with this quiz!
      </Typography>
      <Button variant="contained" size="large" onClick={startQuiz}>
        Start
      </Button>
    </Stack>
  );
};

const QuizPage: React.FC = () => {
  const { questions, isLoading, isError } = useGetQuestions();
  const { currentQuestionIndex, nextQuestion, prevQuestion } =
    useQuizNavigation(questions);
  const currentQuestion = questions[currentQuestionIndex];
  const navigate = useNavigate();

  const hasStarted = useQuizStore((state) => state.hasStarted);
  const isFinalQuestion = currentQuestionIndex === questions.length - 1;

  const isRankingQuestionAnsweredMap = useRankingQuestionStore(
    (state) => state.isQuestionAnsweredMap
  );

  const isMCQQuestionAnsweredMap = useMCQQuestionStore(
    (state) => state.isQuestionAnsweredMap
  );

  // There might be cases where the questions array is empty, leading to currentQuestion being undefined so we need '?'.
  const isRankingQuestionAnswered =
    currentQuestion?.type !== "ranking" ||
    (currentQuestion?.type === "ranking" &&
      isRankingQuestionAnsweredMap[currentQuestion.questionNumber]);

  const handleSubmit = () => {
    navigate("/quiz/results");
  };
  const isMCQQuestionAnswered =
    currentQuestion?.type !== "mcq" ||
    (currentQuestion?.type === "mcq" &&
      isMCQQuestionAnsweredMap[currentQuestion.questionNumber]);

  if (isLoading) {
    return <LoadingSpinnerScreen />;
  }
  if (isError) {
    return <div>Error loading questions</div>;
  }

  return (
    <Stack
      width="100%"
      maxWidth={800}
      margin="auto"
      gap={2}
      paddingX={{ xs: 2, sm: 2, md: 0 }}
    >
      {hasStarted ? (
        <>
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
              onClick={isFinalQuestion ? handleSubmit : nextQuestion}
              disabled={!isRankingQuestionAnswered || !isMCQQuestionAnswered}
            >
              {isFinalQuestion ? "Submit" : "Next"}
            </Button>
          </Box>
        </>
      ) : (
        <StartingScreen />
      )}
    </Stack>
  );
};

export default QuizPage;
