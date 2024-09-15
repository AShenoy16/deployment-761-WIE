import React, { useEffect, useRef, useState } from "react";
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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

const AddQuestionResultAlert = ({
  isSuccess,
  isError,
  onClose,
}: {
  isSuccess: boolean;
  isError: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      <Snackbar open={isSuccess} autoHideDuration={5000} onClose={onClose}>
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          Question successfully added!
        </Alert>
      </Snackbar>
      <Snackbar open={isError} autoHideDuration={5000} onClose={onClose}>
        <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
          Failed to add question. Please try again.
        </Alert>
      </Snackbar>
    </>
  );
};

const AddQuestionModal = ({
  open,
  onClose,
  onAdd,
  isLoading,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (questionType: IQuestion["questionType"]) => void;
  isLoading: boolean;
}) => {
  const [selectedQuestionType, setSelectedQuestionType] =
    useState<IQuestion["questionType"]>("MCQ");

  const handleAdd = () => {
    onAdd(selectedQuestionType);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "400px",
          height: "250px",
        },
      }}
    >
      <DialogTitle>Add New Question</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel id="question-type-label">Question Type</InputLabel>
          <Select
            labelId="question-type-label"
            value={selectedQuestionType}
            onChange={(e) =>
              setSelectedQuestionType(
                e.target.value as IQuestion["questionType"]
              )
            }
            label="Question Type"
          >
            <MenuItem value="MCQ">MCQ</MenuItem>
            <MenuItem value="Ranking">Ranking</MenuItem>
            <MenuItem value="Slider">Slider</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleAdd}
          color="primary"
          disabled={isLoading}
          startIcon={
            isLoading ? <CircularProgress size={18} sx={{ mr: 0.25 }} /> : null
          }
        >
          {isLoading ? "Adding..." : "Add Question"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteQuestionResultAlert = ({
  isSuccess,
  isError,
  onClose,
}: {
  isSuccess: boolean;
  isError: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      <Snackbar open={isSuccess} autoHideDuration={5000} onClose={onClose}>
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          Question successfully deleted!
        </Alert>
      </Snackbar>
      <Snackbar open={isError} autoHideDuration={5000} onClose={onClose}>
        <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
          Failed to delete question. Please try again.
        </Alert>
      </Snackbar>
    </>
  );
};

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
  isHighlighted,
}: {
  question: IQuestion;
  questionNumber: number;
  onClickEditQuestion: (question: IQuestion) => void;
  onClickDeleteQuestion: (question: IQuestion) => void;
  isHighlighted: boolean;
}) => {
  return (
    <Paper
      sx={(theme) => ({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        animation: isHighlighted ? "glow 1s ease-in-out infinite" : "none",
        "@keyframes glow": {
          "0%": {
            boxShadow: `0 0 5px ${theme.palette.primary.main}`,
          },
          "50%": {
            boxShadow: `0 0 25px ${theme.palette.primary.light}`,
          },
          "100%": {
            boxShadow: `0 0 5px ${theme.palette.primary.main}`,
          },
        },
      })}
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
  const questionListRef = useRef<HTMLDivElement | null>(null);

  const {
    setSelectedQuestionToEdit,
    setSelectedQuestionToDelete,
    setIsAddQuestionModalOpen,
    isNewQuestionAdded,
    setIsNewQuestionAdded,
    highlightedQuestionId,
    setHighlightedQuestionId,
  } = useQuizEditorStore((state) => ({
    setSelectedQuestionToEdit: state.setSelectedQuestionToEdit,
    setSelectedQuestionToDelete: state.setSelectedQuestionToDelete,
    setIsAddQuestionModalOpen: state.setIsAddQuestionModalOpen,
    isNewQuestionAdded: state.isNewQuestionAdded,
    setIsNewQuestionAdded: state.setIsNewQuestionAdded,
    highlightedQuestionId: state.highlightedQuestionId,
    setHighlightedQuestionId: state.setHighlightedQuestionId,
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

  const onClickAddQuestion = () => {
    setIsAddQuestionModalOpen(true);
  };

  const onClickDeleteQuestion = (question: IQuestion) => {
    setSelectedQuestionToDelete(question);
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

  useEffect(() => {
    if (isNewQuestionAdded && questionListRef.current) {
      setTimeout(() => {
        const lastQuestion = questionListRef.current?.lastElementChild;
        if (lastQuestion) {
          lastQuestion.scrollIntoView({ behavior: "smooth", block: "start" });
          setIsNewQuestionAdded(false);

          const lastQuestionId = questions[questions.length - 1]._id;
          setHighlightedQuestionId(lastQuestionId);
          setTimeout(() => setHighlightedQuestionId(""), 3000);
        }
      }, 200);
    }
  }, [isNewQuestionAdded, questions]);

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
          onClick={onClickAddQuestion}
        >
          <Typography>Question</Typography>
        </Button>
      </Stack>

      <Stack
        ref={questionListRef}
        spacing={2}
        maxHeight={450}
        overflow="auto"
        sx={{ scrollbarWidth: "thin" }}
        padding={1}
      >
        {questions.map((question, index) => (
          <EditableQuestion
            key={question._id}
            question={question}
            questionNumber={index + 1}
            onClickEditQuestion={onClickEditQuestion}
            onClickDeleteQuestion={onClickDeleteQuestion}
            isHighlighted={highlightedQuestionId === question._id}
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
    isAddQuestionModalOpen,
    setIsAddQuestionModalOpen,
    setIsNewQuestionAdded,
  } = useQuizEditorStore((state) => ({
    selectedQuestionToEdit: state.selectedQuestionToEdit,
    setSelectedQuestionToEdit: state.setSelectedQuestionToEdit,
    selectedQuestionToDelete: state.selectedQuestionToDelete,
    setSelectedQuestionToDelete: state.setSelectedQuestionToDelete,
    isAddQuestionModalOpen: state.isAddQuestionModalOpen,
    setIsAddQuestionModalOpen: state.setIsAddQuestionModalOpen,
    setIsNewQuestionAdded: state.setIsNewQuestionAdded,
  }));

  const { deleteMutation, addMutation } = useQuestions();

  const handleCancelEdit = () => {
    setSelectedQuestionToEdit(null);
  };

  const handleSaveEdit = () => {
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

  const handleAddQuestion = async (questionType: IQuestion["questionType"]) => {
    try {
      await addMutation.mutateAsync(questionType);
      setIsAddQuestionModalOpen(false);
      setIsNewQuestionAdded(true);
    } catch (error) {
      console.error("Error adding new question: ", error);
    }
  };

  return (
    <>
      {selectedQuestionToEdit ? (
        <QuestionEditorLayout
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
        >
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

      <AddQuestionModal
        open={isAddQuestionModalOpen}
        onClose={() => setIsAddQuestionModalOpen(false)}
        onAdd={(questionType) => handleAddQuestion(questionType)}
        isLoading={addMutation.isPending}
      />
      <ConfirmDeleteQuestionModal
        selectedQuestionToDelete={selectedQuestionToDelete}
        onClose={() => setSelectedQuestionToDelete(null)}
        handleConfirmDelete={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
      />

      <AddQuestionResultAlert
        isSuccess={addMutation.isSuccess}
        isError={addMutation.isError}
        onClose={() => addMutation.reset()}
      />
      <DeleteQuestionResultAlert
        isSuccess={deleteMutation.isSuccess}
        isError={deleteMutation.isError}
        onClose={() => deleteMutation.reset()}
      />
    </>
  );
};

export default QuizEditor;
