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
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { useSliderQuestionEditorStore } from "../../stores/SliderQuestionEditorStore";
import { useQuizEditorStore } from "../../stores/QuizEditorStore";
import {
  possibleSpecs,
  reverseSpecAbbreviationMap,
  specAbbreviationMap,
} from "../../util/common";

type EditSpecWeightingProps = {
  open: boolean;
  onClose: () => void;
  spec: string;
  weighting: number;
};

const EditSpecWeighting: React.FC<EditSpecWeightingProps> = ({
  open,
  onClose,
  spec,
  weighting,
}) => {
  const [editedSpec, setEditedSpec] = useState(spec);
  const [editedWeighting, setEditedWeighting] = useState(weighting);
  const [weightError, setWeightError] = useState<string>("");

  const { selectedQuestion, updateSpecName, updateSpecWeighting } =
    useSliderQuestionEditorStore((state) => ({
      selectedQuestion: state.selectedQuestion,
      updateSpecName: state.updateSpecName,
      updateSpecWeighting: state.updateSpecWeighting,
    }));

  const availableSpecs = possibleSpecs.filter(
    (specName) =>
      specName === spec ||
      !Object.keys(selectedQuestion?.sliderWeights.weightings || {}).includes(
        specName
      )
  );
  const availableSpecFullNames = availableSpecs.map(
    (specAbbreviation) => specAbbreviationMap[specAbbreviation]
  );
  const isInvalidSpec = !possibleSpecs.includes(editedSpec);

  const handleWeightChange = (value: number) => {
    if (value < 1 || value > 10) {
      setWeightError("Value must be between 1 and 10");
    } else if (isNaN(value)) {
      setWeightError("Please enter a number");
    } else {
      setWeightError("");
    }
    setEditedWeighting(value);
  };

  // revert to previously saved values when edit is cancelled
  useEffect(() => {
    setEditedSpec(spec);
    setEditedWeighting(weighting);
    setWeightError("");
  }, [open]);

  const handleSave = () => {
    if (!isInvalidSpec && !weightError) {
      updateSpecName(spec, editedSpec);
      updateSpecWeighting(editedSpec, editedWeighting);
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
            options={availableSpecFullNames}
            value={specAbbreviationMap[editedSpec]}
            onChange={(_, newSpecAsFullName) =>
              setEditedSpec(reverseSpecAbbreviationMap[newSpecAsFullName])
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Spec Name"
                fullWidth
                error={isInvalidSpec}
                helperText={
                  isInvalidSpec ? "Please choose a specialization" : ""
                }
              />
            )}
            fullWidth
            disableClearable
          />
          <TextField
            label="Weighting"
            type="number"
            value={isNaN(editedWeighting) ? "" : editedWeighting}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              handleWeightChange(value);
            }}
            error={!!weightError}
            helperText={weightError}
            fullWidth
          />
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={isInvalidSpec || !!weightError}
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
  weighting: number;
};

const SpecialisationOption: React.FC<SpecialisationOptionProps> = ({
  spec,
  weighting,
}) => {
  const [isEditSpecWeightingOpen, setIsEditSpecWeightingOpen] = useState(false);

  const { deleteSpec } = useSliderQuestionEditorStore((state) => ({
    deleteSpec: state.deleteSpec,
  }));

  const handleOpenEditSpecWeighting = () => {
    setIsEditSpecWeightingOpen(true);
  };

  const handleCloseEditSpecWeighting = () => {
    setIsEditSpecWeightingOpen(false);
  };

  const handleDelete = () => {
    deleteSpec(spec);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={3}>
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
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              color="primary"
              sx={{ padding: "0.25rem" }}
              onClick={handleOpenEditSpecWeighting}
            >
              <EditIcon />
            </IconButton>
          </Stack>
          <Typography>{specAbbreviationMap[spec]}</Typography>
        </Stack>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="5rem"
          height="2rem"
          borderRadius="0.5rem"
          borderColor="#f5f5f5"
          border={1}
        >
          <Typography fontWeight="bold">{weighting}</Typography>
        </Box>
      </Stack>
      <EditSpecWeighting
        open={isEditSpecWeightingOpen}
        onClose={handleCloseEditSpecWeighting}
        spec={spec}
        weighting={weighting}
      />
    </>
  );
};

const SliderQuestionEditor: React.FC = () => {
  const theme = useTheme();
  const { selectedQuestion, addNewSpec } = useSliderQuestionEditorStore(
    (state) => ({
      selectedQuestion: state.selectedQuestion,
      addNewSpec: state.addNewSpec,
    })
  );

  const { setSelectedQuestionToEdit } = useQuizEditorStore((state) => ({
    setSelectedQuestionToEdit: state.setSelectedQuestionToEdit,
  }));

  const { updateQuestionTitle } = useSliderQuestionEditorStore((state) => ({
    updateQuestionTitle: state.updateQuestionTitle,
  }));

  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuestionTitle(e.target.value);
  };

  const handleAddSpec = () => {
    const defaultSpecName = generateUniqueSpecName(
      Object.keys(selectedQuestion?.sliderWeights.weightings || {})
    );
    addNewSpec(defaultSpecName, 5);
  };

  const specOptions = Object.entries(
    selectedQuestion?.sliderWeights.weightings || {}
  );

  useEffect(() => {
    setSelectedQuestionToEdit(selectedQuestion);
  }, [selectedQuestion]);

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
      <Paper sx={{ padding: 2, borderRadius: "1rem", width: "100%" }}>
        <Stack direction="row" justifyContent="space-between">
          <Button
            startIcon={<AddIcon />}
            variant="outlined"
            onClick={handleAddSpec}
          >
            Spec
          </Button>

          <Typography>Weighting</Typography>
        </Stack>

        {/* Render specialisation options or show no specs error */}
        <Stack spacing={2} mt={2}>
          {specOptions.length > 0 ? (
            specOptions.map(([spec, weighting], index) => (
              <SpecialisationOption
                key={index}
                spec={spec}
                weighting={weighting}
              />
            ))
          ) : (
            <Typography textAlign="center" color="error">
              No specs available! Please add at least one spec.
            </Typography>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};

const generateUniqueSpecName = (existingSpecs: string[]): string => {
  let count = 1;
  let newSpecName = "New Spec";
  while (existingSpecs.includes(newSpecName)) {
    newSpecName = `New Spec ${count}`;
    count++;
  }
  return newSpecName;
};

export default SliderQuestionEditor;
