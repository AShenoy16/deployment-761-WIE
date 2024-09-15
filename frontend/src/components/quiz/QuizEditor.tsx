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
import { useQuestions } from "../../hooks/useQuestions";

const ConfirmDeleteQuestionModal = ({
  onClose,
  selectedQuestionToDelete,
  handleConfirmDelete,
}: {
  onClose: () => void;
  selectedQuestionToDelete: IQuestion | null;
  handleConfirmDelete: () => Promise<void>;
}) => {
  return (
    <Dialog open={!!selectedQuestionToDelete} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete the question "
        {selectedQuestionToDelete?.questionText}"?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirmDelete} color="error">
          Confirm
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
        </QuestionEditorLayout>
      ) : (
        <EditQuestionList questions={questions} />
      )}

      <ConfirmDeleteQuestionModal
        onClose={() => setSelectedQuestionToDelete(null)}
        selectedQuestionToDelete={selectedQuestionToDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
      <Snackbar
        open={deleteMutation.isSuccess}
        autoHideDuration={5000}
        onClose={() => deleteMutation.reset()}
        message="Question successfully deleted!"
      />
      <Snackbar
        open={deleteMutation.isError}
        autoHideDuration={5000}
        onClose={() => deleteMutation.reset()}
        message="Failed to delete question."
      />
    </>
  );
};

export default QuizEditor;
