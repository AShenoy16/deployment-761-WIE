import {
  Box,
  Link,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { SpecSummary } from "../../types/Specialization";
import { slugify } from "../../pages/SpecPage";
import AnimatedContainer from "../AnimatedContainer";

type QuizTopSpecsProps = {
  quizResults: SpecSummary[];
};

const basePodiumStyles = {
  first: { height: 300, width: 200, backgroundColor: "#ffd700" }, // Gold
  second: { height: 250, width: 200, backgroundColor: "#c0c0c0" }, // Silver
  third: { height: 210, width: 200, backgroundColor: "#cd7f32" }, // Bronze
};

const smallPodiumStyles = {
  first: { height: 200, width: 100, backgroundColor: "#ffd700" },
  second: { height: 170, width: 100, backgroundColor: "#c0c0c0" },
  third: { height: 140, width: 100, backgroundColor: "#cd7f32" },
};

// Function to get the appropriate podium styles based on the index and screen size
const getPodiumStyles = (index: number, isSmallScreen: boolean) => {
  switch (index) {
    case 1:
      return isSmallScreen ? smallPodiumStyles.first : basePodiumStyles.first;
    case 0:
      return isSmallScreen ? smallPodiumStyles.second : basePodiumStyles.second;
    case 2:
      return isSmallScreen ? smallPodiumStyles.third : basePodiumStyles.third;
    default:
      return {};
  }
};

const QuizTopSpecs: React.FC<QuizTopSpecsProps> = ({ quizResults }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const podiumOrder = [quizResults[1], quizResults[0], quizResults[2]];

  return (
    <>
      <AnimatedContainer delay={0.25} animationType="fade">
        <Box textAlign="center" mb={2}>
          <Typography variant={isSmallScreen ? "h4" : "h2"}>
            Here's Your Top 3
          </Typography>
          <Typography variant={isSmallScreen ? "body2" : "body1"}>
            Click to find out more about your top specializations!
          </Typography>
        </Box>
      </AnimatedContainer>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
        gap={isSmallScreen ? 1 : 2}
      >
        {podiumOrder.slice(0, 3).map((spec, index) => {
          const podiumStyle = getPodiumStyles(index, isSmallScreen); // Get the podium style based on index and screen size

          return (
            <AnimatedContainer
              key={index}
              delay={0.5 * index}
              animationType="fade"
            >
              <Stack key={index} alignItems="center">
                <Typography
                  variant={isSmallScreen ? "body2" : "h6"}
                  fontWeight="bold"
                  mb={1}
                  width={isSmallScreen ? 100 : 150}
                  textAlign="center"
                  sx={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                  }}
                >
                  {spec.name}
                </Typography>
                <Box
                  sx={{
                    ...podiumStyle,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    borderRadius: "10px",
                    padding: "1rem",
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
                  mt={1}
                  href={`/specialisation/${slugify(spec.name)}`}
                  textAlign="center"
                  width={isSmallScreen ? 100 : 150}
                >
                  Find Out More
                </Link>
              </Stack>
            </AnimatedContainer>
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
