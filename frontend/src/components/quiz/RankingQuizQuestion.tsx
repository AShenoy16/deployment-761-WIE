import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { RankingQuestion } from "../../types/QuestionTypes";
import { useRankingStore } from "../../stores/RankingQuizQuestionStore";

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
            width="2.125rem"
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

export const RankingQuizQuestion: React.FC<RankingQuizQuestionProps> = ({
  question,
}) => {
  const { rankings, setRanking } = useRankingStore();

  const handleRankingClick = (optionId: string, rank: number) => {
    setRanking(optionId, rank);
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
