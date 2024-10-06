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
  Modal,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IQuestion,
  IMCQQuestion,
  IRankingQuestion,
  ISliderQuestion,
  IMultiplierData,
} from "../../types/Question";
import { useQuizEditorStore } from "../../stores/QuizEditorStore";
import RankingQuestionEditor from "./RankingQuestionEditor";
import QuestionEditorLayout from "../../layouts/QuestionEditorLayout";
import { useRankingQuestionEditorStore } from "../../stores/RankingQuestionEditorStore";
import { useSliderQuestionEditorStore } from "../../stores/SliderQuestionEditorStore";
import SliderQuestionEditor from "./SliderQuestionEditor";
import MCQQuestionEditor from "./MCQQuestionEditor";
import { useMCQQuestionEditorStore } from "../../stores/MCQQuestionEditorStore";
import { useQuestions } from "../../hooks/useQuestions";
import { useMultiplier } from "../../hooks/useMultiplier";

const UpdateQuestionResultAlert = ({
  isSuccess,
  isError,
  errorMessage,
  onClose,
}: {
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  onClose: () => void;
}) => {
  return (
    <>
      <Snackbar open={isSuccess} autoHideDuration={5000} onClose={onClose}>
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          Question updated successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={isError} autoHideDuration={5000} onClose={onClose}>
        <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage || "Failed to update question. Please try again."}
        </Alert>
      </Snackbar>
    </>
  );
};

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

const MultiplierSaveResultAlert = ({
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
          Multipliers successfully saved!
        </Alert>
      </Snackbar>
      <Snackbar open={isError} autoHideDuration={5000} onClose={onClose}>
        <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
          Failed to save multipliers. Please try again.
        </Alert>
      </Snackbar>
    </>
  );
};

type EditMultiplerDataModalProps = {
  open: boolean;
  onClose: () => void;
  multipliers: IMultiplierData;
};
const EditMultiplierDataModal: React.FC<EditMultiplerDataModalProps> = ({
  open,
  onClose,
  multipliers,
}) => {
  const { updateMultiplierMutation } = useMultiplier();

  const [localMultipliers, setLocalMultipliers] =
    useState<IMultiplierData>(multipliers);

  const [errors, setErrors] = useState<{
    [key in keyof IMultiplierData]?: string;
  }>({});

  const [isSaveSuccess, setIsSaveSuccess] = useState(false);
  const [isSaveError, setIsSaveError] = useState(false);

  useEffect(() => {
    // Reset local state when the modal opens
    if (open) {
      setLocalMultipliers(multipliers);
      setErrors({});
    }
  }, [open, multipliers]);

  // Function to handle changes in text fields
  const handleChange =
    (field: keyof IMultiplierData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);

      // Validate the input for errors
      if (value <= 0) {
        setErrors((prev) => ({
          ...prev,
          [field]: "Value must be greater than 0",
        }));
      } else if (isNaN(value)) {
        setErrors((prev) => ({
          ...prev,
          [field]: "Please enter a  number",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }

      setLocalMultipliers((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSave = async () => {
    try {
      await updateMultiplierMutation.mutateAsync(localMultipliers);
      setIsSaveSuccess(true);
      onClose();
    } catch (error) {
      setIsSaveError(true);
      console.error("Error saving multipliers:", error);
    }
  };

  const fields = [
    {
      label: "Ranking Question Rank 2 Divison Factor",
      value: localMultipliers.rank2Multiplier,
      field: "rank2Multiplier" as keyof IMultiplierData,
    },
    {
      label: "Ranking Question Rank 3 Divison Factor",
      value: localMultipliers.rank3Multiplier,
      field: "rank3Multiplier" as keyof IMultiplierData,
    },
    {
      label: "Slider Question Division Factor",
      value: localMultipliers.sliderFactor,
      field: "sliderFactor" as keyof IMultiplierData,
    },
  ];

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 500,
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "0.5rem",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack spacing={4}>
            <Typography variant="h5">Edit Question Division Factors</Typography>

            {fields.map((field) => (
              <TextField
                key={field.field}
                label={field.label}
                value={field.value}
                onChange={handleChange(field.field)}
                fullWidth
                type="number"
                error={!!errors[field.field]} // Check if there's an error for this field
                helperText={errors[field.field]}
              />
            ))}

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={Object.values(errors).some((error) => !!error)}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
      <MultiplierSaveResultAlert
        isSuccess={isSaveSuccess}
        isError={isSaveError}
        onClose={() => {
          setIsSaveSuccess(false);
          setIsSaveError(false);
        }}
      />
    </>
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
      <Box maxWidth="85%">
        <Typography
          variant="body1"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {`Question ${questionNumber} - ${question.questionText}`}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.25}>
          {question.questionType === "MCQ"
            ? "Multi-Choice"
            : question.questionType}
        </Typography>
      </Box>
      <Box
        display="flex"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
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

const EditQuestionList = ({
  questions,
  multipliers,
}: {
  questions: IQuestion[];
  multipliers: IMultiplierData;
}) => {
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

  const [openMultiplierModal, setOpenMultiplierModal] = useState(false);

  const handleOpenMultiplierModal = () => {
    setOpenMultiplierModal(true);
  };

  const handleMultiplierModalClose = () => {
    setOpenMultiplierModal(false);
  };

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
      case "Slider":
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
        <Stack direction="row" spacing={4}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleOpenMultiplierModal}
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
            <Typography>Division Factors</Typography>
          </Button>
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
      <EditMultiplierDataModal
        open={openMultiplierModal}
        onClose={handleMultiplierModalClose}
        multipliers={multipliers}
      />
    </Stack>
  );
};

type QuizEditorProps = {
  questions: IQuestion[];
  multipliers: IMultiplierData;
};

const QuizEditor: React.FC<QuizEditorProps> = ({ questions, multipliers }) => {
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

  const { selectedMCQQuestionToEdit } = useMCQQuestionEditorStore((state) => ({
    selectedMCQQuestionToEdit: state.selectedQuestion,
  }));
  const { selectedRankingQuestionToEdit } = useRankingQuestionEditorStore(
    (state) => ({
      selectedRankingQuestionToEdit: state.selectedQuestion,
    })
  );
  const { selectedSliderQuestionToEdit } = useSliderQuestionEditorStore(
    (state) => ({
      selectedSliderQuestionToEdit: state.selectedQuestion,
    })
  );

  const { deleteMutation, addMutation, updateMutation } = useQuestions();

  const [updateError, setUpdateError] = useState("");

  const handleCancelEdit = () => {
    setSelectedQuestionToEdit(null);
  };

  const handleSaveEdit = async () => {
    if (selectedQuestionToEdit) {
      try {
        switch (selectedQuestionToEdit.questionType) {
          case "MCQ":
            await updateMutation.mutateAsync(
              selectedMCQQuestionToEdit as IMCQQuestion
            );
            break;
          case "Ranking":
            await updateMutation.mutateAsync(
              selectedRankingQuestionToEdit as IRankingQuestion
            );
            break;
          case "Slider":
            await updateMutation.mutateAsync(
              selectedSliderQuestionToEdit as ISliderQuestion
            );
            break;
        }
        setSelectedQuestionToEdit(null);
        setUpdateError("");
      } catch (error) {
        setUpdateError((error as any)?.response?.data?.message || "");
        console.error("Error updating the question: ", error);
      }
    }
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
          isLoading={updateMutation.isPending}
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
        <EditQuestionList questions={questions} multipliers={multipliers} />
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
      <UpdateQuestionResultAlert
        isSuccess={updateMutation.isSuccess}
        isError={updateMutation.isError}
        errorMessage={updateError}
        onClose={() => updateMutation.reset()}
      />
    </>
  );
};

export default QuizEditor;
