import { Stack } from "@mui/material";
import QuizEditor from "../components/quiz/QuizEditor";
import { useQuestions } from "../hooks/useQuestions";
import { useMultiplier } from "../hooks/useMultiplier";
import LoadingSpinnerScreen from "../components/LoadingSpinnerScreen";

const QuizEditingPage = () => {
  const { questions } = useQuestions();
  const { multipliers, isLoading } = useMultiplier();

  return (
    <Stack
      width="100%"
      maxWidth={900}
      margin="auto"
      gap={2}
      paddingX={{ xs: 2, sm: 2, md: 0 }}
    >
      {isLoading || !multipliers ? (
        <LoadingSpinnerScreen />
      ) : (
        <QuizEditor questions={questions} multipliers={multipliers} />
      )}
    </Stack>
  );
};

export default QuizEditingPage;
