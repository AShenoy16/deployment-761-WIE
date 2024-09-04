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
import { Question } from "../../types/QuestionTypes";
import { useQuizEditorStore } from "../../stores/QuizEditorStore";
import RankingQuestionEditor from "./RankingQuestionEditor";
import QuestionEditorLayout from "../../layouts/QuestionEditorLayout";

const getQuestionTypeLabel = (type: Question["type"]) => {
  switch (type) {
    case "mcq":
      return "MCQ";
    case "ranking":
      return "Ranking";
    case "slider":
      return "Slider";
    default:
      return "";
  }
};

const EditableQuestion = ({
  question,
  onClickEditQuestion,
  onClickDeleteQuestion,
}: {
  question: Question;
  onClickEditQuestion: (question: Question) => void;
  onClickDeleteQuestion: (question: Question) => void;
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
        {`Question ${question.questionNumber} `}
        <Typography variant="body1" component="span" color="grey">
          {`~ ${getQuestionTypeLabel(question.type)}`}
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

const EditQuestionList = ({ questions }: { questions: Question[] }) => {
  const theme = useTheme();
  const setSelectedQuestion = useQuizEditorStore(
    (state) => state.setSelectedQuestion
  );

  const onClickAddQuestion = (question: Question) => {
    console.log(question.questionNumber);
  };

  const onClickEditQuestion = (question: Question) => {
    setSelectedQuestion(question);
  };

  const onClickDeleteQuestion = (question: Question) => {
    console.log(question.questionNumber);
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
        {questions.map((question) => (
          <EditableQuestion
            question={question}
            onClickEditQuestion={onClickEditQuestion}
            onClickDeleteQuestion={onClickDeleteQuestion}
            key={question.questionNumber}
          />
        ))}
      </Stack>
    </Stack>
  );
};

type QuizEditorProps = {
  questions: Question[];
};

const QuizEditor: React.FC<QuizEditorProps> = ({ questions }) => {
  const { selectedQuestion, setSelectedQuestion } = useQuizEditorStore(
    (state) => ({
      selectedQuestion: state.selectedQuestion,
      setSelectedQuestion: state.setSelectedQuestion,
    })
  );

  const handleOnCancel = () => {
    setSelectedQuestion(null);
  };

  const handleOnSave = () => {
    console.log(selectedQuestion);
  };

  if (selectedQuestion) {
    switch (selectedQuestion.type) {
      case "mcq":
        return <div>Implement</div>;
      case "ranking":
        return (
          <QuestionEditorLayout onCancel={handleOnCancel} onSave={handleOnSave}>
            <RankingQuestionEditor question={selectedQuestion} />;
          </QuestionEditorLayout>
        );
      case "slider":
        return <div>Implement</div>;
      default:
        throw new Error("Invalid question type");
    }
  }

  return <EditQuestionList questions={questions} />;
};

export default QuizEditor;
