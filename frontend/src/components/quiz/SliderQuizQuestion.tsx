import { Typography, Slider } from "@mui/material";
import { useSliderStore } from "../../stores/SliderQuizQuestionStore";

const sliderLabels = [
  "Strongly Disagree", // 1
  "Disagree", // 2
  "Neutral", // 3
  "Agree", // 4
  "Strongly Agree", // 5
];

export const SliderQuizQuestion = () => {
  const { selectedValue, setSelectedValue } = useSliderStore();

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSelectedValue(newValue as number);
  };

  return (
    <div>
      <Typography variant="h6">Your Opinion</Typography>
      <Slider
        value={selectedValue}
        onChange={handleSliderChange}
        aria-labelledby="slider-question"
        step={1}
        marks={sliderLabels.map((label, index) => ({
          value: index + 1,
          label: label,
        }))}
        min={1}
        max={sliderLabels.length}
      />
      <Typography>{sliderLabels[selectedValue - 1]}</Typography>
    </div>
  );
};
