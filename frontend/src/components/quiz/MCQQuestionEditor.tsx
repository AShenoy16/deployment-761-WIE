import {
  alpha,
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
import { IMCQAnswerOption, IMCQQuestion } from "../../types/QuestionTypes";
import { useMCQQuestionEditorStore } from "../../stores/MCQQuestionEditorStore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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

type EditableMCQOption = {
  option: IMCQAnswerOption;
};

const EditableMCQOption: React.FC<EditableMCQOption> = ({ option }) => {
  const { updateOptionTitle } = useMCQQuestionEditorStore((state) => ({
    updateOptionTitle: state.updateOptionTitle,
  }));

  const handleOptionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateOptionTitle(option._id, e.target.value);
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
          <Button startIcon={<AddIcon />} sx={{ flexShrink: 0 }}>
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
          {Object.entries(option.weightings).map((weighting, index) => (
            // <Typography>
            //   <strong>{weighting}</strong>
            // </Typography>
            <SpecWeighting key={index} weighting={weighting} />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

type SpecWeightingProps = {
  weighting: [string, number];
};

const SpecWeighting: React.FC<SpecWeightingProps> = ({ weighting }) => {
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
            <IconButton color="primary" sx={{ padding: "0.25rem" }}>
              <EditIcon />
            </IconButton>
          </Stack>
          <Typography>{weighting[0]}</Typography>
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
            <strong>{weighting[1]}</strong>
          </Typography>
        </Box>
      </Stack>
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
          <EditableMCQOption key={index} option={option} />
        ))}
      </Stack>
    </Stack>
  );
};

export default MCQQuestionEditor;
