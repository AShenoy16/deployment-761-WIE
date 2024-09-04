import React from "react";
import {
  Stack,
  Typography,
  Box,
  Paper,
  Button,
  IconButton,
  TextField,
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

const RankingWeightingsForm: React.FC = () => {
  const selectedSpecName = useRankingQuestionEditorStore(
    (state) => state.selectedSpecName
  );
  const ranksForSelectedSpec = useRankingQuestionEditorStore(
    (state) => state.ranksForSelectedSpec
  );
  const setSelectedSpecName = useRankingQuestionEditorStore(
    (state) => state.setSelectedSpecName
  );
  const updateRank = useRankingQuestionEditorStore((state) => state.updateRank);

  return (
    <Stack spacing={2}>
      <TextField
        label="Spec Name"
        value={selectedSpecName}
        onChange={(e) => setSelectedSpecName(e.target.value)}
        fullWidth
      />
      {Object.entries(ranksForSelectedSpec).map(([rank, value]) => (
        <TextField
          key={rank}
          label={`Rank ${rank}`}
          type="number"
          value={value}
          onChange={(e) => updateRank(parseInt(rank), parseInt(e.target.value))}
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
  const isWeightingFormOpen = useRankingQuestionEditorStore(
    (state) => state.isWeightingFormOpen
  );
  const setIsWeightingFormOpen = useRankingQuestionEditorStore(
    (state) => state.setIsWeightingFormOpen
  );
  const setSelectedSpecName = useRankingQuestionEditorStore(
    (state) => state.setSelectedSpecName
  );
  const setRanksForSelectedSpec = useRankingQuestionEditorStore(
    (state) => state.setRanksForSelectedSpec
  );

  const handleOpenWeightingForm = () => {
    setSelectedSpecName(specName);
    setRanksForSelectedSpec(ranks);
    setIsWeightingFormOpen(true);
  };

  const handleCloseWeightingForm = () => {
    setIsWeightingFormOpen(false);
  };

  const handleConfirmWeightingChanges = () => {};

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
          <Button startIcon={<AddIcon />} sx={{ flexShrink: 0 }}>
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
  return (
    <Stack padding={2}>
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
