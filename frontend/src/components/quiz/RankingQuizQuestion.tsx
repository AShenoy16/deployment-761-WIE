import React from "react";
import {
  Box,
  Stack,
  Typography,
  Theme,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  IRankingAnswerOption,
  IRankingQuestion,
} from "../../types/QuestionTypes";
import { useRankingQuestionStore } from "../../stores/RankingQuizQuestionStore";

type RankingOptionHeaderProps = {
  rankingCount: number;
};

const RankingOptionHeader: React.FC<RankingOptionHeaderProps> = ({
  rankingCount,
}) => {
  const theme = useTheme<Theme>();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack direction="row" gap={2} width="100%">
      <Box
        display="flex"
        justifyContent={isSmallScreen ? "center" : "flex-end"}
        width="100%"
        gap={1}
      >
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
  option: IRankingAnswerOption;
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
  const theme = useTheme<Theme>();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      direction={isSmallScreen ? "column-reverse" : "row"}
      alignItems="center"
      width="100%"
      gap={2}
    >
      <Box
        width="80%"
        borderRadius="50px"
        padding="10px 20px"
        flexGrow={1}
        border="1px solid #ccc"
        justifyContent="flex-start"
        bgcolor="rgba(0, 0, 0, 0.04)"
      >
        <Typography variant="body1" color="textPrimary">
          {option.text}
        </Typography>
      </Box>

      <Box display="flex" gap={1}>
        {Array.from({ length: rankingCount }).map((_, rankIndex) => (
          <Box
            key={rankIndex}
            role="ranking-button"
            width="2rem"
            height="2rem"
            border="1px solid #ccc"
            borderRadius="50%"
            fontSize="0.875rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor={
              selectedRank === rankIndex + 1
                ? theme.palette.primary.main
                : "transparent"
            }
            color={
              selectedRank === rankIndex + 1
                ? "#fff"
                : theme.palette.text.primary
            }
            sx={{
              cursor: "pointer",
            }}
            onClick={() => onClick(option._id, rankIndex + 1)}
          />
        ))}
      </Box>
    </Stack>
  );
};

type RankingQuizQuestionProps = {
  question: IRankingQuestion;
};

export const RankingQuizQuestion: React.FC<RankingQuizQuestionProps> = ({
  question,
}) => {
  const setQuestionRanking = useRankingQuestionStore(
    (state) => state.setQuestionRanking
  );
  const setIsQuestionAnswered = useRankingQuestionStore(
    (state) => state.setIsQuestionAnswered
  );
  const rankings = useRankingQuestionStore(
    (state) => state.questionRankings[question._id] || {}
  );

  const handleRankingClick = (optionId: string, rank: number) => {
    const optionCount = question.answerOptions.length;
    setQuestionRanking(question._id, optionId, rank);
    setIsQuestionAnswered(question._id, optionCount);
  };

  const rankingCount = question.answerOptions.length;

  return (
    <Stack alignItems="center" gap={1}>
      <Typography textAlign="center">{question.questionText}</Typography>
      <RankingOptionHeader rankingCount={rankingCount} />
      {question.answerOptions.map((option) => (
        <RankingOption
          key={option._id}
          option={option}
          rankingCount={rankingCount}
          selectedRank={rankings[option._id]}
          onClick={handleRankingClick}
        />
      ))}
    </Stack>
  );
};
