import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
import { useMCQQuestionEditorStore } from "../../stores/MCQQuestionEditorStore";
import { IMCQAnswerOption } from "../../types/Question";
import { useState } from "react";
import {
  possibleSpecs,
  reverseSpecAbbreviationMap,
  specAbbreviationMap,
} from "../../util/common";

type EditSpecWeightingProps = {
  open: boolean;
  onClose: () => void;
  spec: string;
  option: IMCQAnswerOption;
};

const EditSpecWeighting: React.FC<EditSpecWeightingProps> = ({
  open,
  onClose,
  spec,
  option,
}) => {
  // Extract actions from the store
  const { updateSpecName, updateSpecWeight } = useMCQQuestionEditorStore(
    (state) => ({
      updateSpecName: state.updateSpecName,
      updateSpecWeight: state.updateSpecWeight,
    })
  );

  const [editedSpec, setEditedSpec] = useState<string>(spec);
  const [editedWeighting, setEditedWeighting] = useState(
    option.weightings[spec]
  );
  const [weightError, setWeightError] = useState<string>("");

  const existingSpecs = Object.keys(option.weightings);
  // Filter available specs, ensuring no duplicates in the options
  const availableSpecs = possibleSpecs.filter(
    (specName) => specName === spec || !existingSpecs.includes(specName)
  );
  const availableSpecFullNames = availableSpecs.map(
    (specAbbreviation) => specAbbreviationMap[specAbbreviation]
  );
  const isInvalidSpec = !possibleSpecs.includes(editedSpec);

  // Handle weight change and validate input
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

  // Handle confirm action
  const handleOnConfirm = () => {
    if (!isInvalidSpec && !weightError) {
      updateSpecName(option._id, spec, editedSpec);
      updateSpecWeight(option._id, editedSpec, editedWeighting);
      onClose();
    }
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
          {spec}
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
              onClick={handleOnConfirm}
            >
              Confirm
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

type EditableMCQOptionProps = {
  option: IMCQAnswerOption;
};

const EditableMCQOption: React.FC<EditableMCQOptionProps> = ({ option }) => {
  // Store actions for updating the MCQ option
  const { updateOptionTitle, addSpec } = useMCQQuestionEditorStore((state) => ({
    updateOptionTitle: state.updateOptionTitle,
    addSpec: state.addSpec,
  }));

  // Handle text change for option
  const handleOptionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateOptionTitle(option._id, e.target.value);
  };

  const handleAddSpec = () => {
    addSpec(option._id);
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
          {/* Add spec button */}
          <Button
            startIcon={<AddIcon />}
            sx={{ flexShrink: 0 }}
            onClick={handleAddSpec}
          >
            Spec
          </Button>
          {/* Editable option text */}
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
          <Typography>Weighting</Typography>
        </Stack>
        {/* List of spec weightings */}
        <Stack width="100%" spacing={1}>
          {Object.entries(option.weightings)
            .sort(([, weightA], [, weightB]) => weightB - weightA)
            .map(([specializationName, weight], index) => (
              <SpecWeighting
                key={specializationName || index}
                option={option}
                specializationName={specializationName}
                weight={weight}
              />
            ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

type SpecWeightingProps = {
  option: IMCQAnswerOption;
  specializationName: string;
  weight: number;
};

const SpecWeighting: React.FC<SpecWeightingProps> = ({
  option,
  specializationName,
  weight,
}) => {
  const { deleteSpec } = useMCQQuestionEditorStore((state) => ({
    deleteSpec: state.deleteSpec,
  }));

  const [isEditSpecWeightingOpen, setIsEditSpecWeightingOpen] = useState(false);

  const handleOpenEditSpecWeighting = () => {
    setIsEditSpecWeightingOpen(true);
  };

  const handleCloseEditSpecWeighting = () => {
    setIsEditSpecWeightingOpen(false);
  };

  const handleDeleteSpec = () => {
    deleteSpec(option._id, specializationName);
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
            {/* Delete and edit buttons for spec */}
            <IconButton
              color="error"
              sx={{ padding: "0.25rem" }}
              onClick={handleDeleteSpec}
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
          <Typography>{specAbbreviationMap[specializationName]}</Typography>
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
          <Typography>
            <strong>{weight}</strong>
          </Typography>
        </Box>
      </Stack>
      {/* Edit Spec Weighting Modal */}
      <EditSpecWeighting
        open={isEditSpecWeightingOpen}
        onClose={handleCloseEditSpecWeighting}
        spec={specializationName}
        option={option}
      />
    </>
  );
};

const MCQQuestionEditor: React.FC = () => {
  const theme = useTheme();
  const { selectedQuestion, updateQuestionTitle } = useMCQQuestionEditorStore(
    (state) => ({
      selectedQuestion: state.selectedQuestion,
      updateQuestionTitle: state.updateQuestionTitle,
    })
  );

  // Handle question text change
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
      {/* Question Text Input */}
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

      <Stack spacing={2} mt={2}>
        {/* Editable options for MCQ */}
        {selectedQuestion?.answerOptions.map((option, index) => (
          <EditableMCQOption key={index} option={option} />
        ))}
      </Stack>
    </Stack>
  );
};

export default MCQQuestionEditor;
