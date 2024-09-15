import { Stack } from "@mui/material";
import QuizEditor from "../components/quiz/QuizEditor";
import { useQuestions } from "../hooks/useQuestions";

const QuizEditingPage = () => {
  const { questions } = useQuestions();

  return (
    <Stack
      width="100%"
      maxWidth={900}
      margin="auto"
      gap={2}
      paddingX={{ xs: 2, sm: 2, md: 0 }}
    >
      <QuizEditor questions={questions} />
    </Stack>
  );
};

export default QuizEditingPage;
