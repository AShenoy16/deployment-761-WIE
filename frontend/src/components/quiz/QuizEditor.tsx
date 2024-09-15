import React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  IconButton,
  alpha,
  Button,
  DialogContent,
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
  Alert,
  CircularProgress,
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
import { useSliderQuestionEditorStore } from "../../stores/SliderQuestionEditorStore";
import SliderQuestionEditor from "./SliderQuestionEditor";
import MCQQuestionEditor from "./MCQQuestionEditor";
import { useMCQQuestionEditorStore } from "../../stores/MCQQuestionEditorStore";
import { useQuestions } from "../../hooks/useQuestions";

const ConfirmDeleteQuestionModal = ({
  selectedQuestionToDelete,
  onClose,
  handleConfirmDelete,
  isLoading,
}: {
  selectedQuestionToDelete: IQuestion | null;
  onClose: () => void;
  handleConfirmDelete: () => Promise<void>;
  isLoading: boolean;
}) => {
  return (
    <Dialog open={!!selectedQuestionToDelete} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography component="span">
          Are you sure you want to delete the question{" "}
        </Typography>
        <Typography component="span" fontWeight="bold">
          "{selectedQuestionToDelete?.questionText}"
        </Typography>
        <Typography component="span">{" ?"}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirmDelete}
          color="error"
          disabled={isLoading}
          startIcon={
            isLoading ? <CircularProgress size={18} sx={{ mr: 0.25 }} /> : null
          }
        >
          {isLoading ? "Deleting..." : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

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
  const { setSelectedQuestionToEdit, setSelectedQuestionToDelete } =
    useQuizEditorStore((state) => ({
      setSelectedQuestionToEdit: state.setSelectedQuestionToEdit,
      setSelectedQuestionToDelete: state.setSelectedQuestionToDelete,
    }));

  const setSelectedRankingQuestion = useRankingQuestionEditorStore(
    (state) => state.setSelectedQuestion
  );
  const setSelectedSliderQuestion = useSliderQuestionEditorStore(
    (state) => state.setSelectedQuestion
  );

  const setSelectedMCQQuestion = useMCQQuestionEditorStore(
    (state) => state.setSelectedQuestion
  );
  const onClickAddQuestion = (question: IQuestion) => {
    console.log(question._id);
  };

  const onClickEditQuestion = (question: IQuestion) => {
    setSelectedQuestionToEdit(question);
    switch (question.questionType) {
      case "MCQ":
        setSelectedMCQQuestion({ ...question });
        break;
      case "Ranking":
        setSelectedRankingQuestion({ ...question });
        break;
      case "Slider": // Implement
        setSelectedSliderQuestion({ ...question });
        break;
      default:
        throw new Error("Invalid question type");
    }
  };

  const onClickDeleteQuestion = (question: IQuestion) => {
    setSelectedQuestionToDelete(question);
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
  const {
    selectedQuestionToEdit,
    setSelectedQuestionToEdit,
    selectedQuestionToDelete,
    setSelectedQuestionToDelete,
  } = useQuizEditorStore((state) => ({
    selectedQuestionToEdit: state.selectedQuestionToEdit,
    setSelectedQuestionToEdit: state.setSelectedQuestionToEdit,
    selectedQuestionToDelete: state.selectedQuestionToDelete,
    setSelectedQuestionToDelete: state.setSelectedQuestionToDelete,
  }));

  const { deleteMutation } = useQuestions();

  const handleOnCancel = () => {
    setSelectedQuestionToEdit(null);
  };

  const handleOnSave = () => {
    console.log(selectedQuestionToEdit);
  };

  const handleConfirmDelete = async () => {
    if (selectedQuestionToDelete) {
      try {
        await deleteMutation.mutateAsync(selectedQuestionToDelete);
        setSelectedQuestionToDelete(null);
      } catch (error) {
        console.error("Error deleting the question:", error);
      }
    }
  };

  return (
    <>
      {selectedQuestionToEdit ? (
        <QuestionEditorLayout onCancel={handleOnCancel} onSave={handleOnSave}>
          {selectedQuestionToEdit.questionType === "MCQ" && (
            <MCQQuestionEditor />
          )}
          {selectedQuestionToEdit.questionType === "Ranking" && (
            <RankingQuestionEditor />
          )}
          {selectedQuestionToEdit.questionType === "Slider" && (
            <SliderQuestionEditor />
          )}
        </QuestionEditorLayout>
      ) : (
        <EditQuestionList questions={questions} />
      )}

      <ConfirmDeleteQuestionModal
        selectedQuestionToDelete={selectedQuestionToDelete}
        onClose={() => setSelectedQuestionToDelete(null)}
        handleConfirmDelete={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
      />
      <Snackbar
        open={deleteMutation.isSuccess}
        autoHideDuration={5000}
        onClose={() => deleteMutation.reset()}
      >
        <Alert
          onClose={() => deleteMutation.reset()}
          severity="success"
          sx={{ width: "100%" }}
        >
          Question successfully deleted!
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteMutation.isError}
        autoHideDuration={5000}
        onClose={() => deleteMutation.reset()}
      >
        <Alert
          onClose={() => deleteMutation.reset()}
          severity="error"
          sx={{ width: "100%" }}
        >
          Failed to delete question. Please try again.
        </Alert>
      </Snackbar>
    </>
  );
};

export default QuizEditor;
