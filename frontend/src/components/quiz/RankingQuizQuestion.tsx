import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { mockFetchQuizQuestions } from "../../util/mockQuizData";
import { Question, RankingQuestion } from "../../types/QuestionTypes";

type RankingOptionHeaderProps = {
  rankingCount: number;
};

const RankingOptionHeader: React.FC<RankingOptionHeaderProps> = ({
  rankingCount,
}) => {
  return (
    <Stack direction="row" gap={2} width="100%" maxWidth={800}>
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
  );
};

type RankingOptionProps = {
  option: { optionId: string; text: string };
  rankingCount: number;
  selectedRank: number | undefined;
  onClick: (optionId: string, rank: number) => void;
};

const RankingOption: React.FC<RankingOptionProps> = ({
  option,
  rankingCount,
  selectedRank,
  onClick,
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={2}
      width="100%"
      maxWidth={800}
    >
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
                selectedRank === rankIndex + 1 ? "#1976d2" : "transparent",
              color: selectedRank === rankIndex + 1 ? "#fff" : "text.primary",
              cursor: "pointer",
            }}
            onClick={() => onClick(option.optionId, rankIndex + 1)}
          />
        ))}
      </Box>
    </Stack>
  );
};

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
      <RankingOptionHeader rankingCount={rankingCount} />
      {question.answerOptions.map((option) => (
        <RankingOption
          key={option.optionId}
          option={option}
          rankingCount={rankingCount}
          selectedRank={rankings[option.optionId]}
          onClick={handleRankingClick}
        />
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
