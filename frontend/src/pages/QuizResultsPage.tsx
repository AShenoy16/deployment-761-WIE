import { Box, Button, Stack } from "@mui/material";
import LoadingSpinnerScreen from "../components/LoadingSpinnerScreen";
import { useCalculateQuizResults } from "../hooks/useQuestions";
import { useState, useEffect } from "react";
import { QuizSubmissionRequest } from "../types/Question";
import { useQuizStore } from "../stores/QuizStore";
import { useRankingQuestionStore } from "../stores/RankingQuizQuestionStore";
import { useSliderQuestionStore } from "../stores/SliderQuizQuestionStore";
import { useMCQQuestionStore } from "../stores/MCQQuestionStore";
import { useSearchParams } from "react-router-dom";
import { SpecSummary } from "../types/Specialization";
import LZString from "lz-string";
import ResultsBreakdown from "../components/quiz/ResultsBreakdown";
import QuizTopSpecs from "../components/quiz/QuizTopSpecs";

const resetQuizProgress = () => {
  const resetQuiz = useQuizStore.getState().resetQuiz;
  const resetMCQ = useMCQQuestionStore.getState().resetMcqQuestionProgress;
  const resetRanking =
    useRankingQuestionStore.getState().resetRankingQuestionProgress;
  const resetSlider =
    useSliderQuestionStore.getState().resetSliderQuestionProgress;

  resetQuiz();
  resetMCQ();
  resetRanking();
  resetSlider();
};

const serializeResults = (results: SpecSummary[]) =>
  LZString.compressToEncodedURIComponent(JSON.stringify(results));

const deserializeResults = (queryString: string) =>
  JSON.parse(LZString.decompressFromEncodedURIComponent(queryString));

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

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const existingResults = searchParams.get("results");

  const { quizResults, isLoading, isError } = useCalculateQuizResults(
    quizSubmissionRequest,
    existingResults ? deserializeResults(existingResults) : undefined
  );

  useEffect(() => {
    if (quizResults.length > 0) {
      const serializedResults = serializeResults(quizResults);
      setSearchParams({ results: serializedResults });
      resetQuizProgress();
    }
  }, [quizResults, setSearchParams]);

  if (isLoading) {
    return <LoadingSpinnerScreen />;
  }

  if (isError) {
    return <Box>Error loading quiz results</Box>;
  }

  const pieChartData = quizResults.map((spec) => ({
    name: spec.name,
    score: spec.score,
  }));

  // Handler for navigating between pages
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, 1));

  const pages = [
    <QuizTopSpecs quizResults={quizResults} />,
    <ResultsBreakdown pieChartData={pieChartData} />,
  ];

  return (
    <Stack alignItems="center" margin="auto" gap={1} p={1}>
      {/* Render the current page */}
      {pages[currentPage]}

      {/* Navigation buttons */}
      <Stack direction="row" spacing={2} mt={2}>
        <Button
          variant="contained"
          onClick={handlePrev}
          disabled={currentPage === 0}
        >
          Go Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={currentPage === pages.length - 1}
        >
          See More
        </Button>
      </Stack>
    </Stack>
  );
};

export default QuizResultsPage;
