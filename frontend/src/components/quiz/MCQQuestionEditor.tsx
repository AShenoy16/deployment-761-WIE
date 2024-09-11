import { alpha, Stack, TextField, Typography, useTheme } from "@mui/material";
import { IMCQQuestion } from "../../types/QuestionTypes";
import { useMCQQuestionEditorStore } from "../../stores/MCQQuestionEditorStore";

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

const MCQQuestionEditor: React.FC = () => {
  const theme = useTheme();
  const { selectedQuestion } = useMCQQuestionEditorStore((state) => ({
    selectedQuestion: state.selectedQuestion,
  }));
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
    </Stack>
  );
};

export default MCQQuestionEditor;
