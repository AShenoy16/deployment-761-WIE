import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import PieChart from "./PieChart";

type ResultsBreakdownProps = {
  pieChartData: { name: string; score: number }[];
};

const ResultsBreakdown: React.FC<ResultsBreakdownProps> = ({
  pieChartData,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Detect small screens

  return (
    <Box textAlign="center">
      <Typography variant={isSmallScreen ? "h4" : "h2"} mb={2}>
        Results Breakdown
      </Typography>
      <PieChart data={pieChartData} />
      <Typography variant={isSmallScreen ? "body1" : "h6"} mt={2}>
        Download Results
      </Typography>
    </Box>
  );
};

export default ResultsBreakdown;
