import {
  Stack,
  alpha,
  TextField,
  Typography,
  Box,
  useTheme,
  Button,
  IconButton,
  Modal,
  Autocomplete,
} from "@mui/material";
import { sliderLabels } from "./SliderQuizQuestion";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { useSliderQuestionEditorStore } from "../../stores/SliderQuestionEditorStore";

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

type EditSpecWeightingProps = {
  open: boolean;
  onClose: () => void;
  spec: string;
  weightings: number[];
};

const labels = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree",
];

const EditSpecWeighting: React.FC<EditSpecWeightingProps> = ({
  open,
  onClose,
  spec,
  weightings,
}) => {
  const [editedSpec, setEditedSpec] = useState(spec);
  const [editedWeightings, setEditedWeightings] = useState(weightings);
  const [isValid, setIsValid] = useState(true);

  const {
    selectedQuestion,
    updateSpecName,
    updateSpecWeightings,
    specError,
    weightingErrors,
    validateSpecName,
    validateWeightings,
    setSpecError,
  } = useSliderQuestionEditorStore((state) => ({
    selectedQuestion: state.selectedQuestion,
    updateSpecName: state.updateSpecName,
    updateSpecWeightings: state.updateSpecWeightings,
    specError: state.specError,
    weightingErrors: state.weightingErrors,
    validateSpecName: state.validateSpecName,
    validateWeightings: state.validateWeightings,
    setSpecError: state.setSpecError,
  }));

  const availableSpecs = possibleSpecs.filter(
    (specName) =>
      specName === spec ||
      !Object.keys(selectedQuestion?.sliderRange.weightings || {}).includes(
        specName
      )
  );

  //  Error checking
  useEffect(() => {
    const specIsValid = validateSpecName(editedSpec, availableSpecs);
    const weightingsAreValid = validateWeightings(editedWeightings);
    setIsValid(specIsValid && weightingsAreValid);
  }, [editedSpec, editedWeightings, validateSpecName, validateWeightings]);

  // revert to previously saved values when edit is cancelled
  useEffect(() => {
    setEditedSpec(spec);
    setEditedWeightings(weightings);
  }, [open]);

  const handleSave = () => {
    if (isValid) {
      if (editedSpec !== spec) {
        setSpecError(null);
        updateSpecName(spec, editedSpec);
      }
      updateSpecWeightings(editedSpec, editedWeightings);
      onClose();
    }
  };

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 600,
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: "0.5rem",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" marginBottom={4}>
          Edit Spec Weighting
        </Typography>
        <Stack spacing={2}>
          <Autocomplete
            options={availableSpecs}
            value={editedSpec}
            onChange={(_, newValue) => setEditedSpec(newValue || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Spec Name"
                fullWidth
                error={Boolean(specError)}
                helperText={specError || ""}
              />
            )}
            fullWidth
            disableClearable
          />
          {editedWeightings.map((weight, index) => (
            <TextField
              key={index}
              label={labels[index]}
              type="number"
              value={weight}
              error={Boolean(weightingErrors[index])}
              helperText={weightingErrors[index] || ""}
              onChange={(e) => {
                setEditedWeightings((prev) =>
                  prev.map((w, i) =>
                    i === index ? parseInt(e.target.value) : w
                  )
                );
              }}
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
              onClick={handleSave}
              disabled={!isValid}
            >
              Confirm
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

type SpecialisationOptionProps = {
  spec: string;
  weightings: number[];
};

const SpecialisationOption: React.FC<SpecialisationOptionProps> = ({
  spec,
  weightings,
}) => {
  const [isEditSpecWeightingOpen, setIsEditSpecWeightingOpen] = useState(false);

  const handleOpenEditSpecWeighting = () => {
    setIsEditSpecWeightingOpen(true);
  };

  const handleCloseEditSpecWeighting = () => {
    setIsEditSpecWeightingOpen(false);
  };

  return (
    <>
      <Stack
        direction="row"
        width="100%"
        alignItems="center"
        justifyContent="center"
        gap={10}
      >
        <Stack
          direction="row"
          alignItems="center"
          bgcolor="white"
          borderRadius="2rem"
          width="40%"
          p={0.7}
        >
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleOpenEditSpecWeighting}>
            <EditIcon />
          </IconButton>
          <Typography ml={2}>{spec}</Typography>
        </Stack>

        <Stack
          direction="row"
          bgcolor="white"
          width="50%"
          borderRadius="2rem"
          gap={5}
          justifyContent="center"
          p={0.8}
        >
          {weightings.map((weight, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="2.5rem"
              height="2.5rem"
              bgcolor="#f5e1a4"
              borderRadius="50%"
            >
              <Typography>{weight}</Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
      <EditSpecWeighting
        open={isEditSpecWeightingOpen}
        onClose={handleCloseEditSpecWeighting}
        spec={spec}
        weightings={weightings}
      />
    </>
  );
};

const SliderQuestionEditor: React.FC = () => {
  const theme = useTheme();
  const { selectedQuestion } = useSliderQuestionEditorStore((state) => ({
    selectedQuestion: state.selectedQuestion,
  }));

  const { updateQuestionTitle } = useSliderQuestionEditorStore((state) => ({
    updateQuestionTitle: state.updateQuestionTitle,
  }));

  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuestionTitle(e.target.value);
  };

  return (
    <Stack
      maxHeight={500}
      overflow="auto"
      padding={3}
      bgcolor={alpha(theme.palette.secondary.main, 0.17)}
      borderRadius={theme.shape.borderRadius}
      sx={{ scrollbarWidth: "thin" }}
      alignItems={"center"}
      spacing={2}
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
      />

      <Stack direction="row" width="90%">
        <Button startIcon={<AddIcon />} variant="outlined">
          Spec
        </Button>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
          spacing={5.75}
        >
          {sliderLabels.map((label, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="2rem"
              height="2rem"
            >
              <Typography variant="body2" textAlign="center">
                {label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>

      {Object.entries(selectedQuestion?.sliderRange.weightings || {}).map(
        ([spec, weighting], index) => (
          <SpecialisationOption
            key={index}
            spec={spec}
            weightings={weighting}
          />
        )
      )}
    </Stack>
  );
};

export default SliderQuestionEditor;
