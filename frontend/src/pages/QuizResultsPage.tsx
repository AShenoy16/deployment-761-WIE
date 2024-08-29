import { Stack, Typography } from "@mui/material";

const QuizResultsPage = () => {
  return (
    <Stack>
      <Typography variant="h2">Here's Your Top 3</Typography>
      <Typography variant="body1">Click to find out more!</Typography>

      {
        // cards of top 3 recommended specs go here
      }

      {
        // todo: implement download functionality
      }
      <Typography>Download Results</Typography>
    </Stack>
  );
};

export default QuizResultsPage;
