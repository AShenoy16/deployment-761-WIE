import React from "react";
import {
  Stack,
  Typography,
  Box,
  Paper,
  Button,
  IconButton,
  TextField,
  alpha,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GeneralModal from "../GeneralModal";
import { useRankingQuestionEditorStore } from "../../stores/RankingQuestionEditorStore";
import {
  RankingAnswerOption,
  RankingQuestion,
} from "../../types/QuestionTypes";
import { rankingWeightingsFormSchema } from "../../util/FormSchema";
import { useQuizEditorStore } from "../../stores/QuizEditorStore";

const RankingWeightingsForm: React.FC = () => {
  const {
    selectedSpecName,
    ranksForSelectedSpec,
    setSelectedSpecName,
    updateRank,
    errors,
  } = useRankingQuestionEditorStore((state) => ({
    selectedSpecName: state.selectedSpecName,
    ranksForSelectedSpec: state.ranksForSelectedSpec,
    setSelectedSpecName: state.setSelectedSpecName,
    updateRank: state.updateRank,
    errors: state.errors,
  }));

  return (
    <Stack spacing={2}>
      <TextField
        label="Spec Name"
        value={selectedSpecName}
        onChange={(e) => setSelectedSpecName(e.target.value)}
        error={!!errors.specName}
        helperText={errors.specName}
        fullWidth
      />
      {Object.entries(ranksForSelectedSpec).map(([rank, value]) => (
        <TextField
          key={rank}
          label={`Rank ${rank}`}
          type="number"
          value={isNaN(value) ? "" : value}
          onChange={(e) => updateRank(parseInt(rank), parseInt(e.target.value))}
          error={!!errors.ranks[parseInt(rank) - 1]}
          helperText={
            isNaN(value)
              ? "Please enter a number"
              : errors.ranks[parseInt(rank) - 1]
          }
          fullWidth
        />
      ))}
    </Stack>
  );
};

type RankingSpecWeightingsProps = {
  specName: string;
  ranks: RankingAnswerOption["weightings"]["specializationName"];
};

const RankingSpecWeightings: React.FC<RankingSpecWeightingsProps> = ({
  specName,
  ranks,
}) => {
  const {
    isWeightingFormOpen,
    setIsWeightingFormOpen,
    selectedSpecName,
    setSelectedSpecName,
    ranksForSelectedSpec,
    setRanksForSelectedSpec,
    reset,
    setErrors,
  } = useRankingQuestionEditorStore((state) => ({
    isWeightingFormOpen: state.isWeightingFormOpen,
    setIsWeightingFormOpen: state.setIsWeightingFormOpen,
    selectedSpecName: state.selectedSpecName,
    setSelectedSpecName: state.setSelectedSpecName,
    ranksForSelectedSpec: state.ranksForSelectedSpec,
    setRanksForSelectedSpec: state.setRanksForSelectedSpec,
    reset: state.reset,
    setErrors: state.setErrors,
  }));

  const handleOpenWeightingForm = () => {
    setSelectedSpecName(specName);
    setRanksForSelectedSpec(ranks);
    setIsWeightingFormOpen(true);
  };

  const handleCloseWeightingForm = () => {
    reset();
  };

  const handleConfirmWeightingChanges = () => {
    const validation = rankingWeightingsFormSchema.safeParse({
      specName: selectedSpecName,
      ranks: ranksForSelectedSpec,
    });

    if (validation.success) {
      reset();
    } else {
      const fieldErrors: { specName: string; ranks: string[] } = {
        specName: "",
        ranks: [],
      };
      validation.error.errors.forEach((err) => {
        if (err.path[0] === "specName") {
          fieldErrors.specName = err.message;
        } else if (err.path[0] === "ranks") {
          fieldErrors.ranks = [...fieldErrors.ranks, err.message];
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
          {Object.entries(ranks).map(([rank, value]) => (
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
        open={isWeightingFormOpen}
        onClose={handleCloseWeightingForm}
        onConfirm={handleConfirmWeightingChanges}
      >
        <RankingWeightingsForm />
      </GeneralModal>
    </>
  );
};

type EditableRankingOption = {
  option: RankingAnswerOption;
};

const EditableRankingOption: React.FC<EditableRankingOption> = ({ option }) => {
  const { selectedQuestion, addNewSpecToRankingAnswerOption } =
    useQuizEditorStore((state) => ({
      selectedQuestion: state.selectedQuestion,
      addNewSpecToRankingAnswerOption: state.addNewSpecToRankingAnswerOption,
    }));

  const handleAddSpec = () => {
    if (selectedQuestion?.type === "ranking") {
      const updatedAnswerOptions = selectedQuestion.answerOptions.map((opt) => {
        if (opt.optionId === option.optionId) {
          return {
            ...opt,
            weightings: {
              ...opt.weightings,
              [`New Spec ${Object.entries(opt.weightings).length + 1}`]: {
                1: 0,
                2: 0,
                3: 0,
              },
            },
          };
        }
        return opt;
      });
      addNewSpecToRankingAnswerOption(updatedAnswerOptions);
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
          {Object.entries(option.weightings).map(([specName, ranks], index) => (
            <RankingSpecWeightings
              key={index}
              specName={specName}
              ranks={ranks}
            />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

type RankingQuestionEditorProps = {
  question: RankingQuestion;
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
