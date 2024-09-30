import { Typography } from "@mui/material";
import PieChart from "./PieChart";

type ResultsBreakdownProps = {
  pieChartData: { name: string; score: number }[];
};

const ResultsBreakdown: React.FC<ResultsBreakdownProps> = ({
  pieChartData,
}) => {
  return (
    <>
      <Typography variant="h2">Results Breakdown</Typography>
      <PieChart data={pieChartData} />
      {/* Implement download functionality */}
      <Typography variant="h6">Download Results</Typography>
    </>
  );
};

export default ResultsBreakdown;
