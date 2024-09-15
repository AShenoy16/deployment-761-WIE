import React, { useState } from "react";
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
import { IRankingAnswerOption } from "../../types/QuestionTypes";

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
  option: IRankingAnswerOption;
};

const EditSpecWeighting: React.FC<EditSpecWeightingProps> = ({
  open,
  onClose,
  spec,
  option,
}) => {
  const { updateSpecWeightingName, updateSpecWeightingValue } =
    useRankingQuestionEditorStore((state) => ({
      updateSpecWeightingName: state.updateSpecWeightingName,
      updateSpecWeightingValue: state.updateSpecWeightingValue,
    }));

  const handleOnConfirm = () => {
    if (!isInvalidSpec && !weightError) {
      updateSpecWeightingName(option._id, spec, localSpec);
      updateSpecWeightingValue(option._id, localSpec, localWeight);
      onClose();
    }
  };

  const [localSpec, setLocalSpec] = useState(spec);
  const [localWeight, setLocalWeight] = useState(option.weightings[spec]);

  const [weightError, setWeightError] = useState<string>("");

  const existingSpecs = Object.keys(option.weightings);

  const availableSpecs = possibleSpecs.filter(
    (spec) => !existingSpecs.includes(spec)
  );
  const isInvalidSpec = !possibleSpecs.includes(localSpec);

  const handleWeightChange = (value: number) => {
    if (value < 1 || value > 10) {
      setWeightError("Value must be between 1 and 10");
    } else if (isNaN(value)) {
      setWeightError("Please enter a number");
    } else {
      setWeightError("");
    }
    setLocalWeight(value);
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
            options={availableSpecs}
            value={localSpec}
            onChange={(_, newSpec) => setLocalSpec(newSpec)}
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
            label={`Weighting`}
            type="number"
            value={isNaN(localWeight) ? "" : localWeight}
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

type SpecWeightingProps = {
  option: IRankingAnswerOption;
  specializationName: string;
  weight: number;
};

const SpecWeighting: React.FC<SpecWeightingProps> = ({
  option,
  specializationName,
  weight,
}) => {
  const { deleteSpecWeighting } = useRankingQuestionEditorStore((state) => ({
    deleteSpecWeighting: state.deleteSpecWeighting,
  }));

  const [isEditSpecWeightingOpen, setIsEditSpecWeightingOpen] = useState(false);

  const handleOpenEditSpecWeighting = () => {
    setIsEditSpecWeightingOpen(true);
  };

  const handleCloseEditSpecWeighting = () => {
    setIsEditSpecWeightingOpen(false);
  };

  const handleDeleteSpec = () => {
    deleteSpecWeighting(option._id, specializationName);
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
          <Typography>{specializationName}</Typography>
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
          <Typography fontWeight="bold">{weight}</Typography>
        </Box>
      </Stack>
      <EditSpecWeighting
        open={isEditSpecWeightingOpen}
        onClose={handleCloseEditSpecWeighting}
        spec={specializationName}
        option={option}
      />
    </>
  );
};

type EditableRankingOption = {
  option: IRankingAnswerOption;
};

const EditableRankingOption: React.FC<EditableRankingOption> = ({ option }) => {
  const { updateOptionTitle, addSpecWeighting } = useRankingQuestionEditorStore(
    (state) => ({
      updateOptionTitle: state.updateOptionTitle,
      addSpecWeighting: state.addSpecWeighting,
    })
  );

  const handleOptionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateOptionTitle(option._id, e.target.value);
  };

  const handleAddSpec = () => {
    addSpecWeighting(option._id);
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
        <Typography>Weighting</Typography>
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
