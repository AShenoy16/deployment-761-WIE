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
          color="secondary"
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

  const onClickAddQuestion = (question: Question) => {
    console.log(question.questionNumber);
  };

  const onClickEditQuestion = (question: Question) => {
    console.log(question.questionNumber);
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
  return <EditQuestionList questions={questions} />;
};

export default QuizEditor;
