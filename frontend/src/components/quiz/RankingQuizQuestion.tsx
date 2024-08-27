import React, { useState } from "react";
import { Box, Avatar, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { mockFetchQuizQuestions } from "../../util/mockQuizData";
import { Question, RankingQuestion } from "../../types/QuestionTypes";

type RankingQuizQuestionProps = {
  question: RankingQuestion;
};

const RankingQuizQuestion: React.FC<RankingQuizQuestionProps> = ({
  question,
}) => {
  const [rankings, setRankings] = useState<{ [optionId: string]: number }>({});

  const handleRankingClick = (optionId: string, rank: number) => {
    setRankings((prevRankings) => ({
      ...prevRankings,
      [optionId]: rank,
    }));
  };

  const rankingCount = question.answerOptions.length;

  return (
    <Stack alignItems="center" gap={1}>
      {/* header */}
      <Stack direction="row" gap={2} width="100%" maxWidth={800} id="huh">
        <Box flexGrow={1}></Box>
        <Box display="flex" gap={1}>
          {Array.from({ length: rankingCount }).map((_, rankIndex) => (
            <Box
              key={rankIndex}
              width="2.0625rem"
              fontSize="0.875rem"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography>{rankIndex + 1}</Typography>
            </Box>
          ))}
        </Box>
      </Stack>

      {/* question rows */}
      {question.answerOptions.map((option) => (
        <Stack
          key={option.optionId}
          direction="row"
          alignItems="center"
          gap={2}
          width="100%"
          maxWidth={800}
        >
          {/* question option */}
          <Box
            borderRadius="50px"
            padding="10px 20px"
            flexGrow={1}
            border="1px solid #ccc"
            justifyContent="flex-start"
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            }}
          >
            <Typography variant="body1" color="textPrimary">
              {option.text}
            </Typography>
          </Box>

          {/* question option rankings */}
          <Box display="flex" gap={1}>
            {Array.from({ length: rankingCount }).map((_, rankIndex) => (
              <Box
                key={rankIndex}
                width="2rem"
                height="2rem"
                border="1px solid #ccc"
                borderRadius="50%"
                fontSize="0.875rem"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  backgroundColor:
                    rankings[option.optionId] === rankIndex + 1
                      ? "#1976d2"
                      : "transparent",
                  color:
                    rankings[option.optionId] === rankIndex + 1
                      ? "#fff"
                      : "text.primary",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleRankingClick(option.optionId, rankIndex + 1)
                }
              />
            ))}
          </Box>
        </Stack>
      ))}
    </Stack>
  );
};

const DummyRankingQuizQuestionContainer: React.FC = () => {
  const {
    data: questions,
    isLoading,
    error,
  } = useQuery<Question[]>({
    queryKey: ["questions"],
    queryFn: mockFetchQuizQuestions,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading questions</div>;
  }

  const rankingQuestions = questions?.filter((q) => q.type === "ranking") || [];

  return (
    <Box>
      {rankingQuestions.map((question) => (
        <RankingQuizQuestion
          key={question.questionNumber}
          question={question}
        />
      ))}
    </Box>
  );
};

export default DummyRankingQuizQuestionContainer;
