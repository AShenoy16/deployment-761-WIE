import { Stack } from "@mui/material";
import QuizEditor from "../components/quiz/QuizEditor";
import { useGetQuestions } from "../hooks/useGetQuestions";

const QuizEditingPage = () => {
  const { questions } = useGetQuestions();

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
