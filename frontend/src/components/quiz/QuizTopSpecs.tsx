import { Box, Link, Stack, Typography, useTheme } from "@mui/material";
import { SpecSummary } from "../../types/Specialization";
import { slugify } from "../../pages/SpecPage";

type QuizTopSpecsProps = {
  quizResults: SpecSummary[];
};

const podiumStyles = {
  first: {
    height: 300,
    width: 200,
    backgroundColor: "#ffd700", // Gold color
  },
  second: {
    height: 250,
    width: 200,
    backgroundColor: "#c0c0c0", // Silver color
  },
  third: {
    height: 210,
    width: 200,
    backgroundColor: "#cd7f32", // Bronze color
  },
};

const QuizTopSpecs: React.FC<QuizTopSpecsProps> = ({ quizResults }) => {
  const theme = useTheme();
  const podiumOrder = [quizResults[1], quizResults[0], quizResults[2]];
  return (
    <>
      <Box textAlign="center" mb={2}>
        <Typography variant="h2">Here's Your Top 3</Typography>
        <Typography variant="body1">
          Click to find out more about your top specializations!
        </Typography>
      </Box>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
        gap={2}
      >
        {/* Podium style display */}
        {podiumOrder.slice(0, 3).map((spec, index) => {
          const style =
            index === 1
              ? podiumStyles.first
              : index === 0
                ? podiumStyles.second
                : podiumStyles.third;

          return (
            <Stack alignItems="center">
              <Typography
                variant="h6"
                fontWeight="bold"
                mb={1}
                width={150}
                textAlign="center"
                sx={{
                  whiteSpace: "normal", // Allow text to wrap
                  wordWrap: "break-word", // Break long words to avoid overflow
                }}
              >
                {spec.name}
              </Typography>
              <Box
                key={index}
                sx={{
                  ...style,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  borderRadius: "10px",
                  padding: "1rem",
                  color: "white",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" color="black">
                  {getOrdinalSuffix(index)}
                </Typography>
              </Box>
              <Link
                sx={{ color: `${theme.palette.primary.light}` }}
                mt={2}
                href={`/specialisation/${slugify(spec.name)}`}
              >
                Find Out More
              </Link>
            </Stack>
          );
        })}
      </Stack>
    </>
  );
};

const getOrdinalSuffix = (index: number) => {
  switch (index) {
    case 0:
      return "2nd";
    case 1:
      return "1st";
    case 2:
      return "3rd";
    default:
      return `${index}th`;
  }
};

export default QuizTopSpecs;
