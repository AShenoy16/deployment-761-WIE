import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { MCQQuestion } from "../../types/QuestionTypes";

type MCQQuestionProps = {
  question: MCQQuestion;
};

export const MCQQuizQuestion: React.FC<MCQQuestionProps> = ({ question }) => {
  const theme = useTheme();

  return (
    <Stack gap={4} alignItems="center" width="100%" mb={4}>
      <Typography>{question.questionText}</Typography>
      {question.answerOptions.map((option) => (
        <div key={option.optionId} style={{ marginBottom: "20px" }}>
          <h3>{option.text}</h3>
          <p>Option ID: {option.optionId}</p>
          <div>
            <strong>Weightings:</strong>
            <ul>
              {Object.entries(option.weightings).map(
                ([specialization, weight]) => (
                  <li key={specialization}>
                    {specialization}: {weight}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      ))}
    </Stack>
  );
};
