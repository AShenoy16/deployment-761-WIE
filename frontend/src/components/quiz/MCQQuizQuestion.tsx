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

type MCQOptionProps = {
  option: MCQAnswerOption;
};

const MCQOption: React.FC<MCQOptionProps> = (option) => {
  const theme = useTheme<Theme>();

  return (
    <Box
      display="flex"
      sx={{ width: "10rem", height: "10rem", border: 1, borderRadius: "16px" }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography>{option.option.text}</Typography>
    </Box>
  );
};

type MCQQuestionProps = {
  question: MCQQuestion;
};

export const MCQQuizQuestion: React.FC<MCQQuestionProps> = ({ question }) => {
  const theme = useTheme();

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
          <MCQOption option={option} />
        ))}
      </Stack>
    </Stack>
  );
};
