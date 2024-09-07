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
import React, { useState } from "react";
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
};

type SpecialisationOptionProps = {
  spec: string;
  weightings: number[];
};

const EditSpecWeighting: React.FC<EditSpecWeightingProps> = ({
  open,
  onClose,
}) => {
  //todo: implement saving
  const handleSave = () => {
    console.log("saved changes");
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
            options={possibleSpecs}
            value="Spec"
            renderInput={(params) => (
              <TextField {...params} label="Spec Name" fullWidth />
            )}
            fullWidth
            disableClearable
          />
          <TextField
            label={`Strongly Disagree`}
            type="number"
            value={5}
            fullWidth
          />
          <TextField
            label={`Strongly Disagree`}
            type="number"
            value={5}
            fullWidth
          />
          <TextField
            label={`Strongly Disagree`}
            type="number"
            value={5}
            fullWidth
          />
          <TextField
            label={`Strongly Disagree`}
            type="number"
            value={5}
            fullWidth
          />
          <TextField
            label={`Strongly Disagree`}
            type="number"
            value={5}
            fullWidth
          />
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Confirm
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

const SpecialisationOption: React.FC<SpecialisationOptionProps> = ({
  spec,
  weightings,
}) => {
  const [isEditSpecWeightingOpen, setIsEditSpecWeightingOpen] = useState(false);

  //todo: add dynamic showing of current spec being edited
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
