import { Box, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import React from "react";
import { useMCQQuestionStore } from "../../stores/MCQQuestionStore";
import { IMCQAnswerOption, IMCQQuestion } from "../../types/Question";

type MCQOptionProps = {
  option: IMCQAnswerOption;
  questionId: string;
};

const MCQOption: React.FC<MCQOptionProps> = ({ option, questionId }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { selectedOptionId, selectOption } = useMCQQuestionStore();

  const isSelected = selectedOptionId[questionId] === option._id;

  return (
    <Box
      role="option"
      display="flex"
      sx={{
        width: isSmallScreen ? "9rem" : "10rem", // Smaller width on mobile
        height: isSmallScreen ? "9rem" : "10rem",
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
      alignItems="center"
      justifyContent="center"
      onClick={() => selectOption(questionId, option._id)}
    >
      <Typography
        textAlign="center"
        fontSize={isSmallScreen ? "0.85rem" : "1rem"}
      >
        {option.text}
      </Typography>
    </Box>
  );
};

type MCQQuizQuestionProps = {
  question: IMCQQuestion;
};

export const MCQQuizQuestion: React.FC<MCQQuizQuestionProps> = ({
  question,
}) => {
  return (
    <Stack gap={4} alignItems="center" width="100%" mb={4}>
      <Typography variant="h6" textAlign="center">
        {question.questionText}
      </Typography>
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={4}
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        {question.answerOptions.map((option) => (
          <MCQOption
            key={option._id}
            option={option}
            questionId={question._id}
          />
        ))}
      </Stack>
    </Stack>
  );
};
