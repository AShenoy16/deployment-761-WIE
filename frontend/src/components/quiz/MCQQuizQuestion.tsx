import {
  Box,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { MCQQuestion } from "../../types/QuestionTypes";
import { MCQAnswerOption } from "../../types/QuestionTypes";
import { useMCQQuestionStore } from "../../stores/MCQQuestionStore";

type MCQOptionProps = {
  option: MCQAnswerOption;
};

const MCQOption: React.FC<MCQOptionProps> = ({ option }) => {
  const theme = useTheme();
  const { selectedOptionId, selectOption } = useMCQQuestionStore();

  const isSelected = selectedOptionId === option.optionId;

  return (
    <Box
      display="flex"
      sx={{
        width: "10rem",
        height: "10rem",
        border: 1,
        borderRadius: "16px",
        cursor: "pointer",
        backgroundColor: isSelected
          ? theme.palette.primary.main
          : "transparent",
        color: isSelected ? theme.palette.primary.contrastText : "inherit",
        borderColor: isSelected ? theme.palette.primary.main : "inherit",
        transition: "all 0.3s ease",
      }}
      alignItems={"center"}
      justifyContent={"center"}
      onClick={() => selectOption(option.optionId)}
    >
      <Typography textAlign={"center"}>{option.text}</Typography>
    </Box>
  );
};

type MCQQuestionProps = {
  question: MCQQuestion;
};

export const MCQQuizQuestion: React.FC<MCQQuestionProps> = ({ question }) => {
  return (
    <Stack gap={4} alignItems="center" width="100%" mb={4}>
      <Typography>{question.questionText}</Typography>
      <Stack
        direction={"row"}
        gap={4}
        alignItems="center"
        justifyContent="center"
        width="100%"
        mb={4}
      >
        {question.answerOptions.map((option) => (
          <MCQOption key={option.optionId} option={option} />
        ))}
      </Stack>
    </Stack>
  );
};
