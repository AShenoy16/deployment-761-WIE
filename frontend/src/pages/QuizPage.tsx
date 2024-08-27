import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { RankingQuizQuestion } from "../components/quiz/RankingQuizQuestion";
import { Question } from "../types/QuestionTypes";
import { mockFetchQuizQuestions } from "../util/mockQuizData";
import { SliderQuizQuestion } from "../components/quiz/SliderQuizQuestion";

const QuizPage: React.FC = () => {
  const {
    data: questions,
    isLoading,
    error,
  } = useQuery<Question[]>({
    queryKey: ["questions"],
    queryFn: mockFetchQuizQuestions,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading questions</div>;
  }

  const rankingQuestions = questions?.filter((q) => q.type === "ranking") || [];

  return (
    <Box>
      {rankingQuestions.map((question) => (
        <RankingQuizQuestion
          key={question.questionNumber}
          question={question}
        />
      ))}
    </Box>
  );
};

export default QuizPage;
