import { Stack } from "@mui/material";
import QuizEditor from "../components/quiz/QuizEditor";
import { useQuestions } from "../hooks/useQuestions";
import { useMultiplier } from "../hooks/useMultiplier";

const QuizEditingPage = () => {
  const { questions } = useQuestions();
  const { multipliers } = useMultiplier();

  console.log(multipliers);
  return (
    <Stack
      width="100%"
      maxWidth={900}
      margin="auto"
      gap={2}
      paddingX={{ xs: 2, sm: 2, md: 0 }}
    >
      <QuizEditor questions={questions} multipliers={multipliers} />
    </Stack>
  );
};

export default QuizEditingPage;
