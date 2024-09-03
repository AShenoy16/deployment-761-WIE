import React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  IconButton,
  alpha,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Question } from "../../types/QuestionTypes";
import { useQuizEditorStore } from "../../stores/QuizEditorStore";
import RankingQuestionEditor from "./RankingQuestionEditor";

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

const QuestionEditor: React.FC = () => {
  const selectedQuestion = useQuizEditorStore(
    (state) => state.selectedQuestion
  );
  const clearSelection = useQuizEditorStore((state) => state.clearSelection);

  const selectedTab = useQuizEditorStore((state) => state.selectedTab);
  const setSelectedTab = useQuizEditorStore((state) => state.setSelectedTab);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue as "mcq" | "ranking" | "slider");
  };

  const renderQuestionTypeEditor = () => {
    switch (selectedTab) {
      case "mcq":
        return selectedQuestion && selectedQuestion.type === "mcq"
          ? null
          : null;
      case "ranking":
        return selectedQuestion && selectedQuestion.type === "ranking" ? (
          <RankingQuestionEditor question={selectedQuestion} />
        ) : null;
      case "slider":
        return selectedQuestion && selectedQuestion.type === "slider"
          ? null
          : null;
      default:
        throw new Error("Invalid question type");
    }
  };

  return (
    <Box>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="MCQ" value="mcq" />
        <Tab label="Ranking" value="ranking" />
        <Tab label="Slider" value="slider" />
      </Tabs>

      <Box maxHeight={450} overflow="auto" padding={2}>
        {renderQuestionTypeEditor()}
      </Box>
      <Stack direction="row" spacing={2} justifyContent="center" marginTop={4}>
        <Button variant="outlined" onClick={clearSelection}>
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Confirm
        </Button>
      </Stack>
    </Box>
  );
};

type QuizEditorProps = {
  questions: Question[];
};

const QuizEditor: React.FC<QuizEditorProps> = ({ questions }) => {
  const selectedQuestion = useQuizEditorStore(
    (state) => state.selectedQuestion
  );

  return (
    <>
      {selectedQuestion ? (
        <QuestionEditor />
      ) : (
        <EditQuestionList questions={questions} />
      )}
    </>
  );
};

export default QuizEditor;
