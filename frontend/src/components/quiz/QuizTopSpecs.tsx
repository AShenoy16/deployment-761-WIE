import { Box, Stack, Typography } from "@mui/material";
import SpecCard from "./SpecCard";
import { SpecSummary } from "../../types/Specialization";

type QuizTopSpecsProps = {
  quizResults: SpecSummary[];
};

const QuizTopSpecs: React.FC<QuizTopSpecsProps> = ({ quizResults }) => {
  return (
    <>
      <Box>
        <Typography variant="h2">Here's Your Top 3</Typography>
        <Typography variant="body1" textAlign="center">
          Click to find out more!
        </Typography>
      </Box>

      <Stack direction="row" gap={1}>
        {quizResults.map((spec, index) => (
          <SpecCard key={index} {...spec} rank={index + 1} />
        ))}
      </Stack>
    </>
  );
};

export default QuizTopSpecs;
