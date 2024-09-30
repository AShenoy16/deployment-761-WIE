import { Typography } from "@mui/material";
import PieChart from "./PieChart";

type QuizResultsProps = {
  pieChartData: { name: string; score: number }[];
};

const QuizCharts: React.FC<QuizResultsProps> = ({ pieChartData }) => {
  return (
    <>
      <Typography variant="h2">Results Breakdown</Typography>
      <PieChart data={pieChartData} />
      {/* Implement download functionality */}
      <Typography variant="h6">Download Results</Typography>
    </>
  );
};

export default QuizCharts;
