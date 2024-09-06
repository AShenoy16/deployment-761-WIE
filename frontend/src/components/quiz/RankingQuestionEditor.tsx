import React, { useEffect, useState } from "react";
import {
  alpha,
  Autocomplete,
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useRankingQuestionEditorStore } from "../../stores/RankingQuestionEditorStore";
import {
  IRankingAnswerOption,
  IRankingWeight,
} from "../../types/QuestionTypes";

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

type EditWeightingFormProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (
    specializationName: string,
    newWeights: { [rank: string]: number }
  ) => void;
  title: string;
  weightings: IRankingAnswerOption["weightings"];
};

const EditWeightingForm: React.FC<EditWeightingFormProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  weightings,
}) => {
  const {
    selectedQuestion,
    selectedOptionId,
    selectedWeightingId,
    errors,
    setErrors,
  } = useRankingQuestionEditorStore((state) => ({
    selectedQuestion: state.selectedQuestion,
    selectedOptionId: state.selectedOptionId,
    selectedWeightingId: state.selectedWeightingId,
    errors: state.errors,
    setErrors: state.setErrors,
  }));

  const optionToEdit = selectedQuestion?.answerOptions.find(
    (o) => o._id === selectedOptionId
  );
  const weightingToEdit = optionToEdit?.weightings.find(
    (w) => w._id === selectedWeightingId
  );

  const [localSpecializationName, setLocalSpecializationName] = useState(
    weightingToEdit?.specializationName || ""
  );
  const [localWeights, setLocalWeights] = useState(
    weightingToEdit?.weights || { "1": 0, "2": 0, "3": 0 }
  );

  useEffect(() => {
    if (weightingToEdit) {
      setLocalSpecializationName(weightingToEdit.specializationName);
      setLocalWeights(weightingToEdit.weights);
    }
  }, [weightingToEdit]);

  const existingSpecs = weightings.map((w) => w.specializationName);
  const availableSpecs = possibleSpecs.filter(
    (s) => !existingSpecs.includes(s)
  );

  const isInvalidSpec = !possibleSpecs.includes(localSpecializationName);

  const handleWeightChange = (rank: string, value: number) => {
    const newErrors = { ...errors };
    if (value < 1 || value > 10) {
      newErrors[rank] = "Value must be between 1 and 10";
      setErrors(newErrors);
    } else if (isNaN(value)) {
      newErrors[rank] = "Please enter a number";
      setErrors(newErrors);
    } else {
      const { [rank]: _, ...rest } = errors;
      setErrors(rest);
    }
    setLocalWeights((prev) => ({ ...prev, [rank]: value }));
  };

  const onConfirmClick = () => {
    onConfirm(localSpecializationName!, localWeights!);
  };

  return (
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
        <Typography variant="h6" component="h2" marginBottom={2}>
          {title}
        </Typography>
        <Stack spacing={2}>
          <Autocomplete
            options={availableSpecs}
            value={localSpecializationName}
            onChange={(_, newValue) => setLocalSpecializationName(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Spec Name"
                error={isInvalidSpec}
                helperText={
                  isInvalidSpec ? "Please choose a specialization" : ""
                }
                fullWidth
              />
            )}
            fullWidth
            disableClearable
          />
          {Object.entries(localWeights).map(([rank, weight]) => (
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
              helperText={errors[rank]}
              fullWidth
            />
          ))}
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onConfirmClick}
            >
              Confirm
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

type SpecWeightingProps = {
  option: IRankingAnswerOption;
  weighting: IRankingWeight;
};

const SpecWeighting: React.FC<SpecWeightingProps> = ({ option, weighting }) => {
  const { specializationName, weights } = weighting;
  const {
    selectedOptionId,
    setSelectedOptionId,
    selectedWeightingId,
    setSelectedWeightingId,
    isWeightingFormOpen,
    setIsWeightingFormOpen,
    errors,
    setErrors,
    updateWeightingSpecialization,
    updateWeightingRanks,
    deleteWeighting,
  } = useRankingQuestionEditorStore((state) => ({
    selectedOptionId: state.selectedOptionId,
    setSelectedOptionId: state.setSelectedOptionId,
    selectedWeightingId: state.selectedWeightingId,
    setSelectedWeightingId: state.setSelectedWeightingId,
    isWeightingFormOpen: state.isWeightingFormOpen,
    setIsWeightingFormOpen: state.setIsWeightingFormOpen,
    errors: state.errors,
    setErrors: state.setErrors,
    updateWeightingSpecialization: state.updateWeightingSpecialization,
    updateWeightingRanks: state.updateWeightingRanks,
    deleteWeighting: state.deleteWeighting,
  }));

  const handleOpenWeightingForm = () => {
    setSelectedOptionId(option._id);
    setSelectedWeightingId(weighting._id);
    setIsWeightingFormOpen(true);
  };

  const handleCloseWeightingForm = () => {
    setSelectedOptionId("");
    setSelectedWeightingId("");
    setErrors({});
    setIsWeightingFormOpen(false);
  };

  const handleConfirmSpecWeightChanges = (
    specializationName: string,
    newWeights: { [rank: string]: number }
  ) => {
    const hasErrors = Object.keys(errors).length > 0;
    if (!hasErrors) {
      updateWeightingSpecialization(
        selectedOptionId,
        selectedWeightingId,
        specializationName
      );
      updateWeightingRanks(selectedOptionId, selectedWeightingId, newWeights);
      handleCloseWeightingForm();
    }
  };

  const handleDeleteWeighting = () => {
    deleteWeighting(option._id, weighting._id);
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
            <IconButton
              color="error"
              sx={{ padding: "0.25rem" }}
              onClick={handleDeleteWeighting}
            >
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
      {selectedOptionId === option._id &&
        selectedWeightingId === weighting._id && (
          <EditWeightingForm
            open={isWeightingFormOpen}
            onClose={handleCloseWeightingForm}
            onConfirm={handleConfirmSpecWeightChanges}
            title={"Edit Spec Weighting"}
            weightings={option.weightings}
          />
        )}
    </>
  );
};

type EditableRankingOption = {
  option: IRankingAnswerOption;
};

const EditableRankingOption: React.FC<EditableRankingOption> = ({ option }) => {
  const { updateOptionTitle, addWeighting } = useRankingQuestionEditorStore(
    (state) => ({
      updateOptionTitle: state.updateOptionTitle,
      addWeighting: state.addWeighting,
    })
  );

  const handleOptionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateOptionTitle(option._id, e.target.value);
  };

  const handleAddSpec = () => {
    addWeighting(option._id);
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
          <TextField
            label="Option Text"
            value={option.text}
            onChange={handleOptionTextChange}
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            inputProps={{
              style: {
                padding: 5,
              },
            }}
          />
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

const RankingQuestionEditor: React.FC = () => {
  const theme = useTheme();
  const { selectedQuestion, updateQuestionTitle } =
    useRankingQuestionEditorStore((state) => ({
      selectedQuestion: state.selectedQuestion,
      updateQuestionTitle: state.updateQuestionTitle,
    }));

  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuestionTitle(e.target.value);
  };

  return (
    <Stack
      maxHeight={500}
      overflow="auto"
      padding={2}
      bgcolor={alpha(theme.palette.secondary.main, 0.17)}
      borderRadius={theme.shape.borderRadius}
      sx={{ scrollbarWidth: "thin" }}
    >
      <TextField
        label="Question Text"
        value={selectedQuestion?.questionText}
        onChange={handleQuestionTextChange}
        sx={{
          margin: "auto",
          maxWidth: "500px",
          width: "100%",
        }}
        inputProps={{
          style: {
            padding: 10,
          },
        }}
      />

      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
        paddingX={2}
      >
        <Typography>Ranks:</Typography>
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
        {selectedQuestion?.answerOptions.map((option, index) => (
          <EditableRankingOption key={index} option={option} />
        ))}
      </Stack>
    </Stack>
  );
};

export default RankingQuestionEditor;
