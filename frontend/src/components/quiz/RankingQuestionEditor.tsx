import React from "react";
import {
  Stack,
  Typography,
  Box,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  RankingAnswerOption,
  RankingQuestion,
} from "../../types/QuestionTypes";

const EditableSpecWeightings = ({
  specName,
  ranks,
}: {
  specName: string;
  ranks: RankingAnswerOption["weightings"]["specializationName"];
}) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Stack
        direction="row"
        alignItems="center"
        bgcolor="#f5f5f5"
        borderRadius="0.5rem"
        flexGrow={1}
        spacing={2}
      >
        <IconButton size="small" color="error">
          <DeleteIcon />
        </IconButton>
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
  );
};

const EditableRankingOption = ({ option }: { option: RankingAnswerOption }) => {
  // const firstSpecialization = Object.keys(option.weightings)[0];
  // const ranksForFirstSpecialization = option.weightings[firstSpecialization];
  // const rankCount = Object.keys(ranksForFirstSpecialization).length;

  return (
    <Paper sx={{ padding: 2, borderRadius: "1rem" }}>
      <Stack alignItems="center" spacing={2}>
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button startIcon={<AddIcon />} sx={{ flexShrink: 0 }}>
            Spec
          </Button>
          <Typography sx={{ flexGrow: 1, textAlign: "center" }}>
            {option.text}
          </Typography>

          {/* <Stack direction="row" alignItems="center" spacing={2}>
            <Typography> Ranks: </Typography>
            <Stack direction="row" spacing={1}>
              {Array.from({ length: rankCount }).map((_, index) => (
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
          </Stack> */}
        </Stack>
        <Stack width="100%" spacing={1}>
          {Object.entries(option.weightings).map(([specName, ranks], index) => (
            <EditableSpecWeightings
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
  onClose: () => void;
};

const RankingQuestionEditor: React.FC<RankingQuestionEditorProps> = ({
  question,
  onClose,
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
      <Stack direction="row" spacing={2} justifyContent="center" marginTop={4}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Confirm
        </Button>
      </Stack>
    </Stack>
  );
};

export default RankingQuestionEditor;
