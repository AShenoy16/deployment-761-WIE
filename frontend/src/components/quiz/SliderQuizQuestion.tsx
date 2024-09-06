import {
  useMediaQuery,
  Stack,
  Typography,
  Slider,
  useTheme,
} from "@mui/material";
import { useSliderQuestionStore } from "../../stores/SliderQuizQuestionStore";
import { ISliderQuestion } from "../../types/QuestionTypes";

type SliderQuizQuestionProps = {
  question: ISliderQuestion;
};

const sliderLabels = [
  "Strongly Disagree", // 1
  "Disagree", // 2
  "Neutral", // 3
  "Agree", // 4
  "Strongly Agree", // 5
];

export const SliderQuizQuestion: React.FC<SliderQuizQuestionProps> = ({
  question,
}) => {
  const theme = useTheme();
  // Breakpoint for small screens
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { selectedValue, setSelectedValue } = useSliderQuestionStore();

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setSelectedValue(question._id, newValue as number);
  };

  return (
    <Stack gap={4} alignItems="center" width="100%" mb={4}>
      <Typography>{question.questionText}</Typography>
      <Slider
        // Change orientation based on screen size
        orientation={isSmallScreen ? "vertical" : "horizontal"}
        value={selectedValue[question._id] || 3}
        onChange={handleSliderChange}
        aria-labelledby="slider-question"
        step={1}
        marks={sliderLabels.map((label, index) => ({
          value: index + 1,
          label: label,
        }))}
        min={question.sliderRange.min}
        max={question.sliderRange.max}
        sx={{
          width: isSmallScreen ? "5%" : "80%",
          height: isSmallScreen ? 200 : "10%",
        }}
      />
    </Stack>
  );
};
