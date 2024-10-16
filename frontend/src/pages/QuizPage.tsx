import React, { useState } from "react";
import {
  Box,
  Button,
  Fade,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useQuestions } from "../hooks/useQuestions";
import { useQuizNavigation } from "../hooks/useQuizNavigation";
import LoadingSpinnerScreen from "../components/LoadingSpinnerScreen";
import { RankingQuizQuestion } from "../components/quiz/RankingQuizQuestion";
import { SliderQuizQuestion } from "../components/quiz/SliderQuizQuestion";
import { useRankingQuestionStore } from "../stores/RankingQuizQuestionStore";
import { useQuizStore } from "../stores/QuizStore";
import { IQuestion } from "../types/Question";
import { useNavigate } from "react-router-dom";
import { MCQQuizQuestion } from "../components/quiz/MCQQuizQuestion";
import { useMCQQuestionStore } from "../stores/MCQQuestionStore";
import { useAuthStore } from "../stores/AuthenticationStore";

const FADE_ANIMATION_INTERVAL = 200;

const renderQuestionComponent = (question: IQuestion) => {
  switch (question.questionType) {
    case "MCQ":
      return <MCQQuizQuestion question={question} />;
    case "Ranking":
      return <RankingQuizQuestion question={question} />;
    case "Slider":
      return <SliderQuizQuestion question={question} />;
    default:
      throw new Error("Invalid question type");
  }
};

const StartingScreen: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const startQuiz = useQuizStore((state) => state.startQuiz);
  const isAdminLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const onClickEdit = () => {
    navigate("/quiz/edit");
  };

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
      <Stack direction="row" gap={2}>
        <Button
          variant="contained"
          size="large"
          onClick={startQuiz}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
            },
          }}
        >
          Start
        </Button>
        {isAdminLoggedIn && (
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: theme.palette.secondary.main,
              color: theme.palette.secondary.main,
              "&:hover": {
                borderColor: theme.palette.secondary.dark,
                color: theme.palette.secondary.dark,
              },
            }}
            onClick={onClickEdit}
          >
            Edit
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

const QuizPage: React.FC = () => {
  const { questions, isLoading, isError } = useQuestions();
  const { currentQuestionIndex, exitQuiz, nextQuestion, prevQuestion } =
    useQuizNavigation(questions);
  const currentQuestion = questions[currentQuestionIndex];

  const hasStarted = currentQuestionIndex >= 0;
  const isFinalQuestion = currentQuestionIndex === questions.length - 1;

  const isRankingQuestionAnsweredMap = useRankingQuestionStore(
    (state) => state.isQuestionAnsweredMap
  );

  const isMCQQuestionAnsweredMap = useMCQQuestionStore(
    (state) => state.isQuestionAnsweredMap
  );

  // There might be cases where the questions array is empty, leading to currentQuestion being undefined so we need '?'.
  const isRankingQuestionAnswered =
    currentQuestion?.questionType !== "Ranking" ||
    (currentQuestion?.questionType === "Ranking" &&
      isRankingQuestionAnsweredMap[currentQuestion._id]);

  const isMCQQuestionAnswered =
    currentQuestion?.questionType !== "MCQ" ||
    (currentQuestion?.questionType === "MCQ" &&
      isMCQQuestionAnsweredMap[currentQuestion._id]);

  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(true);

  const handleSubmit = () => {
    navigate("/quiz/results");
  };

  const fadeInNewQuestion = (questionChangeCb: () => void) => {
    setFadeIn(false);
    setTimeout(() => {
      questionChangeCb();
      setFadeIn(true);
    }, FADE_ANIMATION_INTERVAL);
  };

  const handleNextQuestion = () => {
    fadeInNewQuestion(nextQuestion);
  };

  const handlePrevQuestion = () => {
    fadeInNewQuestion(prevQuestion);
  };

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
          <Fade in={fadeIn} timeout={FADE_ANIMATION_INTERVAL}>
            <Box width="100%">{renderQuestionComponent(currentQuestion)}</Box>
          </Fade>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button variant="outlined" onClick={exitQuiz}>
              Exit Quiz
            </Button>

            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>

              <Button
                variant="contained"
                onClick={isFinalQuestion ? handleSubmit : handleNextQuestion}
                disabled={!isRankingQuestionAnswered || !isMCQQuestionAnswered}
              >
                {isFinalQuestion ? "Submit" : "Next"}
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <StartingScreen />
      )}
    </Stack>
  );
};

export default QuizPage;
