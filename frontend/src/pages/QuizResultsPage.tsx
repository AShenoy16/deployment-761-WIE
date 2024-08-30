import { Box, Stack, Typography } from "@mui/material";
import { useGetQuizResults } from "../hooks/useGetQuizResults";
import LoadingSpinnerScreen from "../components/LoadingSpinnerScreen";
import SpecCard from "../components/quiz/SpecCard";

const QuizResultsPage = () => {
  const { quizResults, isLoading, isError } = useGetQuizResults();

  if (isLoading) {
    return <LoadingSpinnerScreen />;
  }

  if (isError) {
    return <div>Error loading quiz results</div>;
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
