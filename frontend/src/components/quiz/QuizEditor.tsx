import React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  IconButton,
  alpha,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IQuestion } from "../../types/Question";
import { useQuizEditorStore } from "../../stores/QuizEditorStore";
import RankingQuestionEditor from "./RankingQuestionEditor";
import QuestionEditorLayout from "../../layouts/QuestionEditorLayout";
import { useRankingQuestionEditorStore } from "../../stores/RankingQuestionEditorStore";
import MCQQuestionEditor from "./MCQQuestionEditor";
import { useMCQQuestionEditorStore } from "../../stores/MCQQuestionEditorStore";

const EditableQuestion = ({
  question,
  questionNumber,
  onClickEditQuestion,
  onClickDeleteQuestion,
}: {
  question: IQuestion;
  questionNumber: number;
  onClickEditQuestion: (question: IQuestion) => void;
  onClickDeleteQuestion: (question: IQuestion) => void;
}) => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
      }}
    >
      <Typography variant="body1">
        {`Question ${questionNumber}`}
        <Typography variant="body1" component="span" color="grey">
          {` ~ ${question.questionType}`}
        </Typography>
      </Typography>
      <Box>
        <IconButton
          color="primary"
          onClick={() => onClickEditQuestion(question)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => onClickDeleteQuestion(question)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

const EditQuestionList = ({ questions }: { questions: IQuestion[] }) => {
  const theme = useTheme();
  const setSelectedQuestion = useQuizEditorStore(
    (state) => state.setSelectedQuestion
  );
  const setSelectedRankingQuestion = useRankingQuestionEditorStore(
    (state) => state.setSelectedQuestion
  );
  const setSelectedMCQQuestion = useMCQQuestionEditorStore(
    (state) => state.setSelectedQuestion
  );
  const onClickAddQuestion = (question: IQuestion) => {
    console.log(question._id);
  };

  const onClickEditQuestion = (question: IQuestion) => {
    setSelectedQuestion(question);
    switch (question.questionType) {
      case "MCQ":
        setSelectedMCQQuestion({ ...question });
        break;
      case "Ranking":
        setSelectedRankingQuestion({ ...question });
        break;
      case "Slider": // Implement
        break;
      default:
        throw new Error("Invalid question type");
    }
  };

  const onClickDeleteQuestion = (question: IQuestion) => {
    console.log(question._id);
  };

  return (
    <Stack
      padding={4}
      spacing={3}
      bgcolor={alpha(theme.palette.secondary.main, 0.17)}
      borderRadius={theme.shape.borderRadius}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Questions</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "white",
            color: "black",
            borderRadius: "1rem",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
        >
          <Typography>Question</Typography>
        </Button>
      </Stack>

      <Stack
        spacing={2}
        maxHeight={450}
        overflow="auto"
        sx={{ scrollbarWidth: "thin" }}
      >
        {questions.map((question, index) => (
          <EditableQuestion
            key={question._id}
            question={question}
            questionNumber={index + 1}
            onClickEditQuestion={onClickEditQuestion}
            onClickDeleteQuestion={onClickDeleteQuestion}
          />
        ))}
      </Stack>
    </Stack>
  );
};

type QuizEditorProps = {
  questions: IQuestion[];
};

const QuizEditor: React.FC<QuizEditorProps> = ({ questions }) => {
  const { selectedQuestion, setSelectedQuestion } = useQuizEditorStore(
    (state) => ({
      selectedQuestion: state.selectedQuestion,
      setSelectedQuestion: state.setSelectedQuestion,
    })
  );
  const setSelectedRankingQuestion = useRankingQuestionEditorStore(
    (state) => state.setSelectedQuestion
  );

  const handleOnCancel = () => {
    setSelectedQuestion(null);
    setSelectedRankingQuestion(null);
  };

  const handleOnSave = () => {
    console.log(selectedQuestion);
  };

  if (selectedQuestion) {
    switch (selectedQuestion.questionType) {
      case "MCQ": // Implement
        return (
          <QuestionEditorLayout onCancel={handleOnCancel} onSave={handleOnSave}>
            <MCQQuestionEditor />
          </QuestionEditorLayout>
        );
      case "Ranking":
        return (
          <QuestionEditorLayout onCancel={handleOnCancel} onSave={handleOnSave}>
            <RankingQuestionEditor />
          </QuestionEditorLayout>
        );
      case "Slider":
        break; // Implement
      default:
        throw new Error("Invalid question type");
    }
  }

  return <EditQuestionList questions={questions} />;
};

export default QuizEditor;
