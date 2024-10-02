import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import PieChart from "./PieChart";
import React from "react";
import { usePDF } from "react-to-pdf";

type ResultsBreakdownProps = {
  pieChartData: { name: string; score: number }[];
};

const ResultsBreakdown: React.FC<ResultsBreakdownProps> = ({
  pieChartData,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Detect small screens

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  return (
    <Box textAlign="center">
      <Typography variant={isSmallScreen ? "h4" : "h2"} mb={2}>
        Results Breakdown
      </Typography>
      <Box ref={targetRef}>
        <PieChart data={pieChartData} />
      </Box>
      <Box>
        <Button onClick={() => toPDF()}>Download Results</Button>
      </Box>
    </Box>
  );
};

export default ResultsBreakdown;
