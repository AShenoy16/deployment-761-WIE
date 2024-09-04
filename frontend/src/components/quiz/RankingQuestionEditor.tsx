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
  IRankingWeights,
} from "../../types/QuestionTypes";
import { rankingWeightingsFormSchema } from "../../util/FormSchema";
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
    setSelectedSpecName,
    updateRank,
    errors,
  } = useRankingQuestionEditorStore((state) => ({
    selectedSpecName: state.selectedSpecName,
    weightingsForSelectedSpec: state.weightingsForSelectedSpec,
    setSelectedSpecName: state.setSelectedSpecName,
    updateRank: state.updateRankWeighting,
    errors: state.errors,
  }));

  const existingSpecs = weightings.map((w) => w.specializationName);
  const availableSpecs = possibleSpecs.filter(
    (s) => !existingSpecs.includes(s)
  );

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
          onChange={(e) => updateRank(rank, parseInt(e.target.value))}
          error={!!errors.weightings[parseInt(rank) - 1]}
          helperText={
            isNaN(weight)
              ? "Please enter a number"
              : errors.weightings[parseInt(rank) - 1]
          }
          fullWidth
        />
      ))}
    </Stack>
  );
};

type SpecWeightingProps = {
  option: IRankingAnswerOption;
  weighting: IRankingWeights;
};

const SpecWeighting: React.FC<SpecWeightingProps> = ({ option, weighting }) => {
  const { specializationName: specName, weights } = weighting;
  const {
    isWeightingFormOpen,
    selectedOptionId,
    selectedWeightingId,
    selectedSpecName,
    weightingsForSelectedSpec,
    setIsWeightingFormOpen,
    setSelectedOptionAndWeighting,
    setSelectedSpecName,
    setWeightingsForSelectedSpec,
    reset,
    setErrors,
  } = useRankingQuestionEditorStore((state) => ({
    isWeightingFormOpen: state.isWeightingFormOpen,
    selectedOptionId: state.selectedOptionId,
    selectedWeightingId: state.selectedWeightingId,
    selectedSpecName: state.selectedSpecName,
    weightingsForSelectedSpec: state.weightingsForSelectedSpec,
    setIsWeightingFormOpen: state.setIsWeightingFormOpen,
    setSelectedOptionAndWeighting: state.setSelectedOptionAndWeighting,
    setSelectedSpecName: state.setSelectedSpecName,
    setWeightingsForSelectedSpec: state.setWeightingsForSelectedSpec,
    reset: state.reset,
    setErrors: state.setErrors,
  }));

  const handleOpenWeightingForm = () => {
    setSelectedSpecName(specName);
    setWeightingsForSelectedSpec(weights);
    setSelectedOptionAndWeighting(option._id, weighting._id);
    setIsWeightingFormOpen(true);
  };

  const handleCloseWeightingForm = () => {
    reset();
  };

  const handleConfirmWeightingChanges = () => {
    const validation = rankingWeightingsFormSchema.safeParse({
      specName: selectedSpecName,
      weighting: weightingsForSelectedSpec,
    });

    if (validation.success) {
      reset();
    } else {
      const fieldErrors: { specName: string; weightings: string[] } = {
        specName: "",
        weightings: [],
      };
      validation.error.errors.forEach((err) => {
        if (err.path[0] === "specName") {
          fieldErrors.specName = err.message;
        } else if (err.path[0] === "weightings") {
          fieldErrors.weightings = [...fieldErrors.weightings, err.message];
        }
      });
      setErrors(fieldErrors);
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
          <Typography>{specName}</Typography>
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
