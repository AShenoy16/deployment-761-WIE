import { Box, Stack, Typography } from "@mui/material";
import LoadingSpinnerScreen from "../components/LoadingSpinnerScreen";
import SpecCard from "../components/quiz/SpecCard";
import { useCalculateQuizResults } from "../hooks/useQuestions";
import { useState } from "react";
import { QuizSubmissionRequest } from "../types/Question";
import { useRankingQuestionStore } from "../stores/RankingQuizQuestionStore";
import { useSliderQuestionStore } from "../stores/SliderQuizQuestionStore";
import { useMCQQuestionStore } from "../stores/MCQQuestionStore";

const buildQuizSubmissionObj = (): QuizSubmissionRequest => {
  const rankingQuestionState = useRankingQuestionStore.getState();
  const rankingAnswers = Object.entries(
    rankingQuestionState.questionRankings
  ).reduce(
    (acc, [questionId, rankings]) => {
      acc[questionId] = { rankings };
      return acc;
    },
    {} as { [questionId: string]: { rankings: { [optionId: string]: number } } }
  );

  const sliderQuestionState = useSliderQuestionStore.getState();
  const sliderAnswers = sliderQuestionState.selectedValue;

  const mcqQuestionState = useMCQQuestionStore.getState();
  const mcqAnswers = mcqQuestionState.selectedOptionId;

  return {
    mcqAnswers,
    sliderAnswers,
    rankingAnswers,
  };
};

const QuizResultsPage = () => {
  const [quizSubmissionRequest, _] = useState(() => buildQuizSubmissionObj());

  const { quizResults, isLoading, isError } = useCalculateQuizResults(
    quizSubmissionRequest
  );

  console.log(quizResults);

  if (isLoading) {
    return <LoadingSpinnerScreen />;
  }

  if (isError) {
    return <Box>Error loading quiz results</Box>;
  }

  return (
    <Stack alignItems="center" margin="auto" gap={2}>
      <Box>
        <Typography variant="h2">Here's Your Top 3</Typography>
        <Typography variant="body1" textAlign="center">
          Click to find out more!
        </Typography>
      </Box>

      <Stack direction="row" gap={2}>
        {quizResults.map((spec, index) => (
          <SpecCard key={index} {...spec} />
        ))}
      </Stack>

      {
        // todo: implement download functionality & error and success alerts
      }
      <Typography variant="h5">Download Results</Typography>
    </Stack>
  );
};

export default QuizResultsPage;
