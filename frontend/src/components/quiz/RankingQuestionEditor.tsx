import React from "react";
import {
  alpha,
  Autocomplete,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GeneralModal from "../GeneralModal";
import { useRankingQuestionEditorStore } from "../../stores/RankingQuestionEditorStore";
import {
  IRankingAnswerOption,
  IRankingQuestion,
  IRankingWeight,
} from "../../types/QuestionTypes";
import { useQuizEditorStore } from "../../stores/QuizEditorStore";

const possibleSpecs = [
  "Biomedical",
  "Chemmat",
  "Civil",
  "Compsys",
  "Electrical",
  "Engsci",
  "Mechanical",
  "Mechatronics",
  "Software",
  "Structural",
];

type EditSpecWeightingFormProps = {
  weightings: IRankingAnswerOption["weightings"];
};

const EditSpecWeightingForm: React.FC<EditSpecWeightingFormProps> = ({
  weightings,
}) => {
  const {
    selectedSpecName,
    weightingsForSelectedSpec,
    errors,
    setSelectedSpecName,
    updateRankWeighting,
    setErrors,
  } = useRankingQuestionEditorStore((state) => ({
    selectedSpecName: state.selectedSpecName,
    weightingsForSelectedSpec: state.weightingsForSelectedSpec,
    setSelectedSpecName: state.setSelectedSpecName,
    updateRankWeighting: state.updateRankWeighting,
    errors: state.errors,
    setErrors: state.setErrors,
  }));

  const existingSpecs = weightings.map((w) => w.specializationName);
  const availableSpecs = possibleSpecs.filter(
    (s) => !existingSpecs.includes(s)
  );

  const handleWeightChange = (rank: string, value: number) => {
    if (value < 1 || value > 10) {
      const newErrors = { ...errors };
      newErrors[rank] = "Value must be between 1 and 10";
      setErrors(newErrors);
    } else {
      const { [rank]: _, ...rest } = errors;
      setErrors(rest);
    }
    updateRankWeighting(rank, value);
  };

  return (
    <Stack spacing={2}>
      <Autocomplete
        options={availableSpecs}
        value={selectedSpecName}
        onChange={(_, newValue) => setSelectedSpecName(newValue || "")}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Spec Name"
            error={!!errors.specName}
            helperText={errors.specName}
            fullWidth
          />
        )}
        fullWidth
        disableClearable
      />
      {Object.entries(weightingsForSelectedSpec).map(([rank, weight]) => (
        <TextField
          key={rank}
          label={`Rank ${rank}`}
          type="number"
          value={isNaN(weight) ? "" : weight}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            handleWeightChange(rank, value);
          }}
          error={!!errors[rank]}
          helperText={
            errors[rank] || (isNaN(weight) ? "Please enter a number" : "")
          }
          fullWidth
        />
      ))}
    </Stack>
  );
};

type SpecWeightingProps = {
  option: IRankingAnswerOption;
  weighting: IRankingWeight;
};

const SpecWeighting: React.FC<SpecWeightingProps> = ({ option, weighting }) => {
  const { specializationName, weights } = weighting;
  const {
    isWeightingFormOpen,
    selectedOptionId,
    selectedWeightingId,
    errors,
    setIsWeightingFormOpen,
    setSelectedOptionAndWeighting,
    setSelectedSpecName,
    setWeightingsForSelectedSpec,
    reset,
  } = useRankingQuestionEditorStore((state) => ({
    isWeightingFormOpen: state.isWeightingFormOpen,
    selectedOptionId: state.selectedOptionId,
    selectedWeightingId: state.selectedWeightingId,
    errors: state.errors,
    setIsWeightingFormOpen: state.setIsWeightingFormOpen,
    setSelectedOptionAndWeighting: state.setSelectedOptionAndWeighting,
    setSelectedSpecName: state.setSelectedSpecName,
    setWeightingsForSelectedSpec: state.setWeightingsForSelectedSpec,
    reset: state.reset,
  }));

  const handleOpenWeightingForm = () => {
    setSelectedSpecName(specializationName);
    setWeightingsForSelectedSpec(weights);
    setSelectedOptionAndWeighting(option._id, weighting._id);
    setIsWeightingFormOpen(true);
  };

  const handleCloseWeightingForm = () => {
    reset();
  };

  const handleConfirmWeightingChanges = () => {
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      console.log("Cannot confirm weighting changes due to validation errors.");
    } else {
      console.log("Weighting changes confirmed.");
      reset();
    }
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Stack
          direction="row"
          alignItems="center"
          bgcolor="#f5f5f5"
          padding={0.5}
          borderRadius="0.5rem"
          flexGrow={1}
          spacing={2}
        >
          <Stack direction="row">
            <IconButton color="error" sx={{ padding: "0.25rem" }}>
              <DeleteIcon />
            </IconButton>
            <IconButton
              color="primary"
              sx={{ padding: "0.25rem" }}
              onClick={handleOpenWeightingForm}
            >
              <EditIcon />
            </IconButton>
          </Stack>
          <Typography>{specializationName}</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          {Object.entries(weights).map(([rank, value]) => (
            <Box
              key={rank}
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="2rem"
              height="2rem"
              bgcolor="#f5e1a4"
              borderRadius="50%"
            >
              <Typography>{value}</Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
      <GeneralModal
        title={"Edit Spec Weighting"}
        open={
          isWeightingFormOpen &&
          selectedOptionId === option._id &&
          selectedWeightingId === weighting._id
        }
        onClose={handleCloseWeightingForm}
        onConfirm={handleConfirmWeightingChanges}
      >
        <EditSpecWeightingForm weightings={option.weightings} />
      </GeneralModal>
    </>
  );
};

type EditableRankingOption = {
  option: IRankingAnswerOption;
};

const EditableRankingOption: React.FC<EditableRankingOption> = ({ option }) => {
  const { selectedQuestion, setSelectedQuestion } = useQuizEditorStore(
    (state) => ({
      selectedQuestion: state.selectedQuestion,
      setSelectedQuestion: state.setSelectedQuestion,
    })
  );

  const handleAddSpec = () => {
    if (selectedQuestion?.questionType === "Ranking") {
      const updatedAnswerOptions = selectedQuestion.answerOptions.map((opt) => {
        if (opt._id === option._id) {
          return {
            ...opt,
            weightings: [
              ...opt.weightings,
              {
                _id: `new_weight_${opt.weightings.length + 1}`,
                specializationName: `New Spec ${opt.weightings.length + 1}`,
                weights: {
                  "1": 0,
                  "2": 0,
                  "3": 0,
                },
              },
            ],
          };
        }
        return opt;
      });
      setSelectedQuestion({
        ...selectedQuestion,
        answerOptions: updatedAnswerOptions,
      });
    }
  };

  return (
    <Paper sx={{ padding: 2, borderRadius: "1rem", position: "relative" }}>
      <Stack alignItems="center" spacing={2}>
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          position="relative"
        >
          <Button
            startIcon={<AddIcon />}
            sx={{ flexShrink: 0 }}
            onClick={handleAddSpec}
          >
            Spec
          </Button>
          <Typography
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {option.text}
          </Typography>
        </Stack>
        <Stack width="100%" spacing={1}>
          {option.weightings.map((weighting, index) => (
            <SpecWeighting key={index} option={option} weighting={weighting} />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

type RankingQuestionEditorProps = {
  question: IRankingQuestion;
};

const RankingQuestionEditor: React.FC<RankingQuestionEditorProps> = ({
  question,
}) => {
  const theme = useTheme();
  return (
    <Stack
      maxHeight={450}
      overflow="auto"
      padding={2}
      bgcolor={alpha(theme.palette.secondary.main, 0.17)}
      borderRadius={theme.shape.borderRadius}
    >
      <Typography variant="h5" textAlign="center" marginBottom={2}>
        {question.questionText}
      </Typography>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
        paddingX={2}
      >
        <Typography> Ranks: </Typography>
        <Stack direction="row" spacing={1}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="2rem"
              height="2rem"
            >
              <Typography>{index + 1}</Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
      <Stack spacing={2}>
        {question.answerOptions.map((option, index) => (
          <EditableRankingOption key={index} option={option} />
        ))}
      </Stack>
    </Stack>
  );
};

export default RankingQuestionEditor;
